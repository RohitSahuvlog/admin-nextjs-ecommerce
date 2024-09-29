import { cors, runMiddleware } from "@/lib/cors";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";



export default async function handle(req, res) {
  await runMiddleware(req, res, cors);
  await mongooseConnect();
  if (req.method === 'POST') {
    let { ids } = req.body;
    ids = JSON.parse(ids);
    console.log('Received ids:', ids);

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).send('No ids provided');
    }

    try {
      const products = await Product.find({ _id: { $in: ids } });
      res.status(200).send(products);
    } catch (error) {
      console.log('Error fetching products from database:', error);
      res.status(500).send('Error fetching products', error);
    }
  } else {
    res.status(405).send(`Method ${req.method} Not Allowed`);
  }
}
