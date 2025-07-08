import { GraphQLClient, gql } from 'graphql-request';
import fs from 'fs';
import 'dotenv/config';

// --- Config ---
const adminEndpoint = `https://${process.env.SHOPIFY_STORE}/admin/api/2024-07/graphql.json`;
const client = new GraphQLClient(adminEndpoint, {
  headers: { 'X-Shopify-Access-Token': process.env.ADMIN_API_ACCESS_TOKEN },
});

// Hent alle produkter som har vault
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
          handle
        }
      }
    }
  `;

  while (hasNextPage) {
    const response = await client.request(query, { cursor });
    products.push(...response.products.nodes);
    hasNextPage = response.products.pageInfo.hasNextPage;
    cursor = response.products.pageInfo.endCursor;
  }
  return products;
}

// Hent entries for ett produkt
async function processProduct(product) {
  console.log(`🔍 Prosesserer: ${product.title}`);

  const vaultQuery = gql`
    query getVault($id: ID!) {
      product(id: $id) {
        metafield(namespace: "pathfinder", key: "field_vault") {
          references(first: 1) {
            nodes {
              ... on Metaobject {
                id
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
  `;

  const vaultRes = await client.request(vaultQuery, { id: product.id });
  const vaultNode = vaultRes?.product?.metafield?.references?.nodes[0];

  if (!vaultNode) {
    console.log(`   ⚠️ Ingen vault funnet, hopper over.`);
    return null;
  }

  const entriesField = vaultNode.fields.find((f) => f.key === 'entries');
  if (!entriesField || !entriesField.value) {
    console.log(`   ⚠️ Vault har ingen entries.`);
    return null;
  }

  const entryIds = JSON.parse(entriesField.value);
  if (entryIds.length === 0) {
    console.log(`   ⚠️ Vault har tom liste.`);
    return null;
  }

  // Hent alle entries
  const fetchEntriesQuery = gql`
    query getNodes($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Metaobject {
          id
          type
          handle
          fields {
            key
            value
            reference {
              ... on MediaImage {
                id
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const entriesRes = await client.request(fetchEntriesQuery, { ids: entryIds });
  const entries = entriesRes.nodes.filter(Boolean);

  // Bygg opp struktur og resolve bilder
  const output = {
    productId: product.id.split('/').pop(),
    handle: product.handle,
    title: product.title,
    vault: {
      id: vaultNode.id.split('/').pop(),
      handle: vaultNode.handle,
      entries: entries.map((node) => {
        const item = { type: node.type, handle: node.handle };
        node.fields.forEach((f) => {
          if (f.reference?.image?.url) {
            item[f.key] = {
              url: f.reference.image.url,
              alt: f.reference.image.altText,
            };
          } else {
            item[f.key] = f.value;
          }
        });
        return item;
      }),
    },
  };

  return output;
}

async function main() {
  const products = await getAllProductIds();
  const allResolved = [];

  for (const product of products) {
    const result = await processProduct(product);
    if (result) {
      allResolved.push(result);
    }
  }

  fs.writeFileSync('resolved-vault-data.json', JSON.stringify(allResolved, null, 2));

  console.log(
    `\n✅ Ferdig! Lagret ${allResolved.length} resolved produkter i resolved-vault-data.json`
  );
}

main();
