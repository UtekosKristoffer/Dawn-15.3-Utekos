// 1) Importer pakker
import express from 'express';
import dotenv from 'dotenv';
import path from 'path'; // Importer path
import { fileURLToPath } from 'url'; // Importer url

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/shop-data', async (req, res) => {
  try {
    const shop = process.env.SHOPIFY_STORE;
    const token = process.env.ADMIN_API_ACCESS_TOKEN;

    const response = await fetch(`https://${shop}/admin/api/2024-04/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('API request failed');
  }
});

// 5) Start server
app.listen(port, () => {
  console.log(`✅ Admin Proxy running on http://localhost:${port}`);
});
