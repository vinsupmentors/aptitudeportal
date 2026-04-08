import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { loginId, password } = await req.json();

    if (!loginId || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { OR: [{ email: loginId }, { phone: loginId }] },
    });

    if (!user) {
      return NextResponse.json({ error: 'No account found. Please register first.' }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ error: 'Incorrect password. Please try again.' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', userId: user.id }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
