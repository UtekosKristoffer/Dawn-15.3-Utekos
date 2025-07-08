// Laster miljøvariabler fra .env
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

// Setter opp config
const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const ADMIN_API_ACCESS_TOKEN = process.env.ADMIN_API_ACCESS_TOKEN;
const STOREFRONT_API_ACCESS_TOKEN = process.env.STOREFRONT_API_ACCESS_TOKEN;

// Din GraphQL-spørring — med placeholder for type
const query = `
  query getMetaobjects($type: String!, $cursor: String) {
    metaobjects(type: $type, first: 250, after: $cursor) {
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
              ... on Metaobject {
                id
                handle
                type
                fields {
                  key
                  value
                }
              }
              ... on Product {
                id
                handle
                title
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
    // 1️⃣ Les alle definisjoner fra metaobject-definitions.json
    const definitions = JSON.parse(fs.readFileSync('metaobject-definitions.json'));
    const types = definitions.map((def) => def.type);

    console.log(`✅ Fant ${types.length} typer: ${types.join(', ')}`);

    let allMetaobjects = [];

    // 2️⃣ Loop over alle typer
    for (const type of types) {
      console.log(`\n🔍 Henter type: ${type}`);

      let hasNextPage = true;
      let cursor = null;

      while (hasNextPage) {
        console.log(`Henter side med cursor: ${cursor || 'START'}`);

        const res = await axios.post(
          `https://${SHOPIFY_STORE}/admin/api/2024-07/graphql.json`,
          {
            query: query,
            variables: { type: type, cursor: cursor },
          },
          {
            headers: {
              'X-Shopify-Access-Token': ADMIN_API_ACCESS_TOKEN,
              'Content-Type': 'application/json',
            },
          }
        );

        // Debug
        // console.log(JSON.stringify(res.data, null, 2));

        const data = res.data.data.metaobjects;
        const edges = data.edges;
        const pageInfo = data.pageInfo;

        edges.forEach((edge) => {
          allMetaobjects.push({
            ...edge.node,
            _type: type, // legger til type for oversikt
          });
        });

        console.log(`➕ Hentet ${edges.length} — Totalt: ${allMetaobjects.length}`);

        hasNextPage = pageInfo.hasNextPage;
        cursor = pageInfo.endCursor;
      }
    }

    // 3️⃣ Lagre ALT i en fil
    fs.writeFileSync('all-metaobjects.json', JSON.stringify(allMetaobjects, null, 2));

    console.log(
      `\n✅ Ferdig! Lagret ${allMetaobjects.length} metaobjects til all-metaobjects.json`
    );
  } catch (error) {
    console.error('🚨 Noe gikk galt:', error.response?.data || error);
  }
}

run();
