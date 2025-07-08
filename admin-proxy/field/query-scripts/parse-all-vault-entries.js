// Laster miljøvariabler fra .env
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const ADMIN_API_ACCESS_TOKEN = process.env.ADMIN_API_ACCESS_TOKEN;

const query = `
  query getProducts($cursor: String) {
    products(first: 100, after: $cursor) {
      edges {
        node {
          id
          title
          handle
          metafield(namespace: "pathfinder", key: "field_vault") {
            id
            type
            references(first: 50) {
              edges {
                node {
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
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

async function run() {
  let allProducts = [];
  let allEntryGids = new Set();
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    console.log(`🔍 Henter produkter — cursor: ${cursor || 'START'}`);

    const res = await axios.post(
      `https://${SHOPIFY_STORE}/admin/api/2024-07/graphql.json`,
      {
        query: query,
        variables: { cursor },
      },
      {
        headers: {
          'X-Shopify-Access-Token': ADMIN_API_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.data.errors) {
      console.error(JSON.stringify(res.data.errors, null, 2));
      throw new Error('Stoppet pga GraphQL-feil.');
    }

    const edges = res.data.data.products.edges;

    edges.forEach((edge) => {
      const product = edge.node;

      if (product.metafield && product.metafield.references.edges.length > 0) {
        product.vaults = product.metafield.references.edges.map((edge) => {
          const vault = edge.node;
          const entriesField = vault.fields.find((f) => f.key === 'entries');
          const entryGids = entriesField ? JSON.parse(entriesField.value) : [];

          // Legg til i global liste for oppslag senere
          entryGids.forEach((gid) => allEntryGids.add(gid));

          return {
            id: vault.id,
            handle: vault.handle,
            entryGids,
          };
        });

        allProducts.push(product);
      }
    });

    console.log(`➕ Hentet ${edges.length} produkter — ${allProducts.length} med Vault så langt.`);

    hasNextPage = res.data.data.products.pageInfo.hasNextPage;
    cursor = res.data.data.products.pageInfo.endCursor;
  }

  // Lagre: Produkter + alle unike Entry-GIDs
  fs.writeFileSync('products-with-vaults-raw.json', JSON.stringify(allProducts, null, 2));
  fs.writeFileSync('entry-gids.json', JSON.stringify(Array.from(allEntryGids), null, 2));

  console.log(
    `✅ Ferdig! Lagret ${allProducts.length} produkter med Vaults og ${allEntryGids.size} unike Entries`
  );
}

run().catch(console.error);
