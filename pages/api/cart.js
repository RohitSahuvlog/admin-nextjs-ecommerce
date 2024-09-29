import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  if (req.method === 'POST') {
    const ids = req.body.ids;
    if (ids.length === 0) {
      return res.status(400).send('No ids provided');
    }
    const products = await Product.find({ _id: { $in: ids } });
    res.status(200).send(products);
  } else {
    res.status(405).send('Method not allowed');
  }
}