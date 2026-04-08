import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const testResult = await prisma.testResult.findUnique({
      where: { userId },
      include: { user: true }
    });

    if (!testResult) {
      return NextResponse.json({ error: "No test result found for this user." }, { status: 404 });
    }

    // Calculate rank
    const allResults = await prisma.testResult.findMany({
      orderBy: { totalScore: 'desc' }
    });

    // Find index of current user
    const rankIndex = allResults.findIndex(r => r.userId === userId);
    const rank = rankIndex + 1;
    const totalStudents = allResults.length;
    const percentile = totalStudents > 1 
      ? Math.round(((totalStudents - rank) / (totalStudents - 1)) * 100) 
      : 100;

    return NextResponse.json({
      score: testResult,
      rank,
      totalStudents,
      percentile
    }, { status: 200 });
  } catch (error) {
    console.error("Results API Error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
