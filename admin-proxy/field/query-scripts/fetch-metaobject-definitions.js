// Laster miljøvariabler fra .env
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

// Setter opp config
const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const ADMIN_API_ACCESS_TOKEN = process.env.ADMIN_API_ACCESS_TOKEN;

const query = `
  query getMetaobjectDefinitions($cursor: String) {
    metaobjectDefinitions(first: 50, after: $cursor) {
      edges {
        node {
          name
          type
          access {
            admin
            storefront
          }
          fieldDefinitions {
            name
            key
            type {
              name   # ✅ Dette MÅ være her
            }
            required
            description
            validations {
              name
              value
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
    let hasNextPage = true;
    let cursor = null;
    let allDefinitions = [];

    while (hasNextPage) {
      console.log(`🔍 Henter definisjoner — cursor: ${cursor || 'START'}`);

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

      const data = res.data.data.metaobjectDefinitions;
      const edges = data.edges;

      edges.forEach((edge) => {
        allDefinitions.push(edge.node);
      });

      console.log(`➕ Hentet ${edges.length} — Totalt: ${allDefinitions.length}`);

      hasNextPage = data.pageInfo.hasNextPage;
      cursor = data.pageInfo.endCursor;
    }

    // Lagre til fil
    fs.writeFileSync('metaobject-definitions.json', JSON.stringify(allDefinitions, null, 2));

    console.log(
      `✅ Ferdig! Lagret ${allDefinitions.length} metaobject definitions til metaobject-definitions.json`
    );
  } catch (error) {
    console.error('🚨 Noe gikk galt:', error.response?.data || error);
  }
}

run();
