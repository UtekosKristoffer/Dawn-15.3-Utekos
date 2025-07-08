import { GraphQLClient, gql } from 'graphql-request';
import 'dotenv/config';

// Bruker kun Admin API.
const adminEndpoint = `https://${process.env.SHOPIFY_STORE}/admin/api/2024-04/graphql.json`;
const client = new GraphQLClient(adminEndpoint, {
  headers: { 'X-Shopify-Access-Token': process.env.ADMIN_API_ACCESS_TOKEN },
});

/**
 * STEG 1: Henter ID-ene fra JSON-feltet.
 */
async function getEntryIds(productId) {
  const query = gql`
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
  const response = await client.request(query, { id: productId });
  const vaultNode = response?.product?.masterVault?.references?.nodes[0];
  if (!vaultNode || !vaultNode.entries || !vaultNode.entries.value) {
    throw new Error(`Fant ikke 'entries'-feltet eller det var tomt for produkt ${productId}`);
  }
  return JSON.parse(vaultNode.entries.value);
}

/**
 * STEG 2: Henter data for hver ID, én etter én.
 */
async function fetchNodeData(nodeId) {
  const query = gql`
    query getNodeData($id: ID!) {
      node(id: $id) {
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
  const response = await client.request(query, { id: nodeId });
  return response.node;
}

/**
 * STEG 3: Transformer dataen basert på den nye datastrukturen.
 */
function transformData(hydratedNodes) {
  const cleanData = {};
  if (!hydratedNodes) return {};

  for (const node of hydratedNodes) {
    if (!node) continue;

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
  return cleanData;
}

/**
 * STEG 4: Lagre dataen.
 */
async function saveDataToMetafield(productId, cleanJson, namespace, key) {
  const mutation = gql`
    mutation setMetafield($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
          key
          namespace
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    metafields: [
      { key, namespace, ownerId: productId, type: 'json', value: JSON.stringify(cleanJson) },
    ],
  };
  return client.request(mutation, variables);
}

/**
 * Hovedfunksjon.
 */
async function main() {
  const productIdToProcess = 'gid://shopify/Product/7710040391928';
  const targetMetafieldNamespace = 'custom';
  const targetMetafieldKey = 'resolved_data';

  try {
    console.log(`[1/4] Henter ID-liste fra JSON-felt for produkt: ${productIdToProcess}...`);
    const entryIds = await getEntryIds(productIdToProcess);

    console.log(`[2/4] Fant ${entryIds.length} ID-er. Henter full data for hver ID...`);
    const hydratedNodes = await Promise.all(entryIds.map((id) => fetchNodeData(id)));

    console.log('[3/4] Transformerer rådata til rent JSON-format...');
    const cleanJsonData = transformData(hydratedNodes);

    console.log(
      `[4/4] Lagrer rent JSON til metafeltet ${targetMetafieldNamespace}.${targetMetafieldKey}...`
    );
    const saveResult = await saveDataToMetafield(
      productIdToProcess,
      cleanJsonData,
      targetMetafieldNamespace,
      targetMetafieldKey
    );
    if (saveResult.metafieldsSet.userErrors.length > 0)
      throw new Error(`Feil ved lagring: ${JSON.stringify(saveResult.metafieldsSet.userErrors)}`);

    console.log('\n✅ VI ER I MÅL! Prosessen er fullført.');
    console.log('Resultat som ble lagret:', JSON.stringify(cleanJsonData, null, 2));
  } catch (error) {
    console.error('\n🚨 EN FEIL OPPSTOD:', error.message || JSON.stringify(error, null, 2));
  }
}

main();
