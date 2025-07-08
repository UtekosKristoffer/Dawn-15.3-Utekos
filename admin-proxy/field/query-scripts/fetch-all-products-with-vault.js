// Laster miljøvariabler fra .env
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const ADMIN_API_ACCESS_TOKEN = process.env.ADMIN_API_ACCESS_TOKEN;

const productQuery = `
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
                    handle
                    type
                    fields {
                      key
                      value
                      reference {
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
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    console.log(`🔍 Henter produkter — cursor: ${cursor || 'START'}`);

    const res = await axios.post(
      `https://${SHOPIFY_STORE}/admin/api/2024-07/graphql.json`,
      {
        query: productQuery,
        variables: { cursor },
      },
      {
        headers: {
          'X-Shopify-Access-Token': ADMIN_API_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    // Debug
    if (res.data.errors) {
      console.error('🚨 GraphQL errors:', JSON.stringify(res.data.errors, null, 2));
      throw new Error('Stoppet pga GraphQL-feil.');
    }

    const edges = res.data.data.products.edges;

    edges.forEach((edge) => {
      const product = edge.node;
      if (product.metafield) {
        allProducts.push(product);
      }
    });

    console.log(
      `➕ Hentet ${edges.length} produkter — med Vault: ${allProducts.length} funnet så langt`
    );

    hasNextPage = res.data.data.products.pageInfo.hasNextPage;
    cursor = res.data.data.products.pageInfo.endCursor;
  }

  // Lagre til fil
  fs.writeFileSync('products-with-vaults.json', JSON.stringify(allProducts, null, 2));

  console.log(
    `✅ Ferdig! Lagret ${allProducts.length} produkter med Vaults til products-with-vaults.json`
  );
}

run().catch(console.error);
