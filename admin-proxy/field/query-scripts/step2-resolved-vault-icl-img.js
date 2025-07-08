import fs from 'fs';
import { GraphQLClient, gql } from 'graphql-request';
import 'dotenv/config';

const adminEndpoint = `https://${process.env.SHOPIFY_STORE}/admin/api/2024-07/graphql.json`;
const client = new GraphQLClient(adminEndpoint, {
  headers: { 'X-Shopify-Access-Token': process.env.ADMIN_API_ACCESS_TOKEN },
});

// Utility for batching arrays
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const nodesQuery = gql`
  query getNodes($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Metaobject {
        id
        type
        handle
        fields {
          key
          value
          type # ✅ bare STRING, IKKE { name }
          reference {
            ... on MediaImage {
              id
              image {
                url
                altText
              }
            }
          }
          references(first: 20) {
            nodes {
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
  }
`;

// Parse one Metaobject and resolve images
function transformEntry(node) {
  const entry = {
    id: node.id.split('/').pop(),
    type: node.type,
    handle: node.handle,
    fields: {},
  };

  node.fields.forEach((field) => {
    const typeName = field.type; // ✅ KUN DETTE ER ENDRET

    if (typeName === 'file_reference' && field.reference?.image?.url) {
      entry.fields[field.key] = {
        url: field.reference.image.url,
        alt: field.reference.image.altText,
      };
    } else if (typeName === 'list.file_reference' && field.references?.nodes?.length > 0) {
      entry.fields[field.key] = field.references.nodes.map((ref) => ({
        url: ref.image.url,
        alt: ref.image.altText,
      }));
    } else {
      entry.fields[field.key] = field.value;
    }
  });

  return entry;
}

async function run() {
  console.log('Step 2: Starter oppslag for entries og full resolving...');

  // 1️⃣ Hent alle GIDs
  const entryGids = JSON.parse(fs.readFileSync('entry-gids.json', 'utf-8'));

  // 2️⃣ Slå opp i batches
  const entryMap = new Map();
  const batches = chunkArray(entryGids, 100);

  console.log(`   Totalt ${entryGids.length} entries, deles opp i ${batches.length} batches.`);

  for (let i = 0; i < batches.length; i++) {
    console.log(`   🔍 Batch ${i + 1}/${batches.length}...`);

    const res = await client.request(nodesQuery, { ids: batches[i] });
    res.nodes.filter(Boolean).forEach((node) => {
      const transformed = transformEntry(node);
      entryMap.set(node.id, transformed);
    });
  }

  console.log(`   ➕ Totalt entries resolved: ${entryMap.size}`);

  // 3️⃣ Les produkter
  const rawProducts = JSON.parse(fs.readFileSync('products-with-vaults-raw.json', 'utf-8'));

  const finalProducts = rawProducts.map((product) => {
    const vaults = product.vaults.map((vault) => {
      const entries = vault.entryGids
        .map((gid) => {
          const entry = entryMap.get(gid);
          if (!entry) {
            console.warn(`   ⚠️ Entry ${gid} ikke funnet i entryMap.`);
            return null;
          }
          return entry;
        })
        .filter(Boolean);

      return {
        id: vault.id.split('/').pop(),
        handle: vault.handle,
        entries,
      };
    });

    return {
      productId: product.id.split('/').pop(),
      handle: product.handle,
      title: product.title,
      vaults,
    };
  });

  // 4️⃣ Lagre til fil
  fs.writeFileSync('resolved-vault-products.json', JSON.stringify(finalProducts, null, 2));
  console.log(`\n✅ Ferdig! Lagret alt til resolved-vault-products.json`);
}

run().catch(console.error);
