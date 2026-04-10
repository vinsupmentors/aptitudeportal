import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, state, city, password } = body;

    if (!name || !phone || !email || !state || !city || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'A student with this email or phone number has already registered.' },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: { name, phone, email, state, city, password },
    });

    return NextResponse.json({ message: 'Registration successful', userId: newUser.id }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error while registering.' }, { status: 500 });
  }
}
