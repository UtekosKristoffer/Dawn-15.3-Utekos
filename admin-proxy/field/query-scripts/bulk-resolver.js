import { GraphQLClient, gql } from 'graphql-request';
import 'dotenv/config';

// --- Konfigurasjon (lik som før) ---
const adminEndpoint = `https://${process.env.SHOPIFY_STORE}/admin/api/2024-04/graphql.json`;
const client = new GraphQLClient(adminEndpoint, {
  headers: { 'X-Shopify-Access-Token': process.env.ADMIN_API_ACCESS_TOKEN },
});
const TARGET_METAFIELD_NAMESPACE = 'custom';
const TARGET_METAFIELD_KEY = 'resolved_data';

/**
 * STEG 1: Finner ID-en til alle produkter som har "vault"-metafeltet.
 */
async function getAllProductIds() {
  const products = [];
  let cursor = null;
  let hasNextPage = true;

  const query = gql`
    query getProductsWithVault($cursor: String) {
      products(first: 50, after: $cursor, query: "metafield:pathfinder.field_vault:*") {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
        }
      }
    }
  `;

  console.log('Steg 1: Finner alle produkter som skal prosesseres...');
  while (hasNextPage) {
    const response = await client.request(query, { cursor });
    products.push(...response.products.nodes);
    hasNextPage = response.products.pageInfo.hasNextPage;
    cursor = response.products.pageInfo.endCursor;
  }

  console.log(`Fant totalt ${products.length} produkter.`);
  return products;
}

/**
 * Funksjon for å kjøre hele prosessen for ETT produkt.
 * (Dette er en kombinasjon av de vellykkede funksjonene fra forrige script)
 */
async function processSingleProduct(productId, productTitle) {
  try {
    // 1. Hent Entry GIDs
    const getIdsQuery = gql`
      query getVaultEntriesValue($id: ID!) {
        product(id: $id) {
          masterVault: metafield(namespace: "pathfinder", key: "field_vault") {
            references(first: 1) {
              nodes {
                ... on Metaobject {
                  entries: field(key: "entries") {
                    value
                  }
                }
              }
            }
          }
        }
      }
    `;
    const idResponse = await client.request(getIdsQuery, { id: productId });
    const vaultNode = idResponse?.product?.masterVault?.references?.nodes[0];
    if (!vaultNode || !vaultNode.entries || !vaultNode.entries.value) {
      console.log(
        `   - Produktet '${productTitle}' har vault, men 'entries'-feltet er tomt. Hopper over.`
      );
      return null;
    }
    const entryIds = JSON.parse(vaultNode.entries.value);
    if (entryIds.length === 0) {
      console.log(`   - Produktet '${productTitle}' har 0 entries. Hopper over.`);
      return null;
    }

    // 2. Hent full data for GIDs
    const fetchDataQuery = gql`
      query getNodeData($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on Metaobject {
            id
            type
            handle
            fields {
              key
              value
            }
          }
        }
      }
    `;
    const hydratedNodes = (await client.request(fetchDataQuery, { ids: entryIds })).nodes.filter(
      Boolean
    );

    // 3. Transformer data
    const cleanData = {};
    for (const node of hydratedNodes) {
      const { type, fields } = node;
      const key = type;
      const entryData = {};
      for (const field of fields) {
        entryData[field.key] = field.value;
      }
      if (cleanData[key]) {
        if (!Array.isArray(cleanData[key])) {
          cleanData[key] = [cleanData[key]];
        }
        cleanData[key].push(entryData);
      } else {
        cleanData[key] = entryData;
      }
    }

    // 4. Lagre data
    const saveDataMutation = gql`
      mutation setMetafield($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
    const saveResult = await client.request(saveDataMutation, {
      metafields: [
        {
          key: TARGET_METAFIELD_KEY,
          namespace: TARGET_METAFIELD_NAMESPACE,
          ownerId: productId,
          type: 'json',
          value: JSON.stringify(cleanData),
        },
      ],
    });

    if (saveResult.metafieldsSet.userErrors.length > 0) {
      throw new Error(JSON.stringify(saveResult.metafieldsSet.userErrors));
    }

    return cleanData; // Returnerer suksess
  } catch (error) {
    console.error(`   - 🚨 FEIL under prosessering av '${productTitle}': ${error.message}`);
    return null; // Returnerer feil
  }
}

/**
 * Hovedfunksjon for bulk-prosessering.
 */
async function main() {
  try {
    const productsToProcess = await getAllProductIds();

    if (productsToProcess.length === 0) {
      console.log("Ingen produkter med 'pathfinder.field_vault' funnet. Avslutter.");
      return;
    }

    console.log(`\nSteg 2: Starter prosessering av ${productsToProcess.length} produkter...`);
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < productsToProcess.length; i++) {
      const product = productsToProcess[i];
      console.log(
        `\n(${i + 1}/${productsToProcess.length}) Prosesserer: ${product.title} (ID: ${product.id})`
      );
      const result = await processSingleProduct(product.id, product.title);
      if (result) {
        successCount++;
      } else {
        errorCount++;
      }
    }

    console.log('\n----------------------------------------');
    console.log('✅ BULK-PROSESSERING FULLFØRT!');
    console.log(`   - Vellykkede: ${successCount}`);
    console.log(`   - Feilet/Hoppet over: ${errorCount}`);
    console.log('----------------------------------------');
  } catch (error) {
    console.error('\n🚨 EN KRITISK FEIL OPPSTOD:', error.message);
  }
}

main();
