require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const ADMIN_API_ACCESS_TOKEN = process.env.ADMIN_API_ACCESS_TOKEN;

const query = `
  query getEntries($cursor: String) {
    metaobjects(type: "entry", first: 250, after: $cursor) {
      edges {
        node {
          id
          handle
          type
          fields {
            key
            type
            value
            reference {
              ... on Product {
                id
                handle
                title
              }
              ... on Metaobject {
                id
                handle
                type
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
  try {
    let allEntries = [];
    let hasNextPage = true;
    let cursor = null;

    while (hasNextPage) {
      console.log(`Henter Entries, cursor: ${cursor || 'START'}`);

      const res = await axios.post(
        `https://${SHOPIFY_STORE}/admin/api/2024-07/graphql.json`,
        {
          query: query,
          variables: { cursor: cursor },
        },
        {
          headers: {
            'X-Shopify-Access-Token': ADMIN_API_ACCESS_TOKEN,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(JSON.stringify(res.data, null, 2));

      const data = res.data.data.metaobjects;
      const edges = data.edges;
      const pageInfo = data.pageInfo;

      edges.forEach((edge) => {
        allEntries.push(edge.node);
      });

      console.log(`➕ Hentet ${edges.length} — Totalt: ${allEntries.length}`);

      hasNextPage = pageInfo.hasNextPage;
      cursor = pageInfo.endCursor;
    }

    fs.writeFileSync('all-entries.json', JSON.stringify(allEntries, null, 2));
    console.log(`✅ Ferdig! Lagret ${allEntries.length} Entries til all-entries.json`);
  } catch (error) {
    console.error('🚨 Noe gikk galt:', error.response?.data || error);
  }
}

run();
