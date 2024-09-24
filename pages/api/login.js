import { NextResponse } from 'next/server'; // You can remove this if you're not using it.
import { mongooseConnect } from '@/lib/mongoose';
import { User } from '@/models/User';
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log('Login API called');

    // Access body directly from req
    const { email, password } = req.body;

    // Connect to the database
    await mongooseConnect();

    // Find user by email
    const user = await User.findByEmail(email);

    // Check if user exists
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Verify the password
    const isPasswordValid = await User.validatePassword(password, user.password);

    // Check if password is valid
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate access token
    const accessToken = jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // If authentication is successful, return user details (omit password) and access token
    const { password: _, ...userWithoutPassword } = user.toObject(); // Convert to plain object
    return res.status(200).json({ ...userWithoutPassword, accessToken });
}
