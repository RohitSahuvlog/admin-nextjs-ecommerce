
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Create a new user
    const newUser = await User.create(email, password);

    return NextResponse.json(newUser, { status: 201 });
}
