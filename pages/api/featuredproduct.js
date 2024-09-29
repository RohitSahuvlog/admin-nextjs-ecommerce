// pages/api/featuredproduct.js
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'GET') {
        try {
            const featuredProductId = '66f3105440882e441e9d97ef';  // Or fetch dynamically
            const featuredProduct = await Product.findById(featuredProductId);

            return res.status(200).json(featuredProduct);
        } catch (error) {
            return res.status(404).json({ success: false, error: error.message });
        }
    } else {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}
