import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId, answers, questionsSent } = await req.json();

    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.hasTakenTest) return NextResponse.json({ error: "Test already taken" }, { status: 403 });

    let aptitudeScore = 0;
    let verbalScore = 0;

    questionsSent.forEach((q: any) => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      if (isCorrect) {
        if (q.type === "Aptitude") aptitudeScore++;
        if (q.type === "Verbal") verbalScore++;
      }
    });

    const totalScore = aptitudeScore + verbalScore;
    
    // Simple logic for strengths/weaknesses based on score vs max (25)
    const strengths = aptitudeScore > 15 ? "Aptitude" : verbalScore > 15 ? "Verbal Reasoning" : "None";
    const weaknesses = aptitudeScore <= 15 ? "Quantitative Aptitude" : verbalScore <= 15 ? "Verbal Accuracy" : "None";
    const areasToImprove = aptitudeScore <= 15 ? "Practice more math problems and logic puzzles." : verbalScore <= 15 ? "Read more articles to improve vocabulary." : "Keep up the excellent work!";

    // Create Result
    await prisma.testResult.create({
      data: {
        userId,
        totalScore,
        verbalScore,
        aptitudeScore,
        strengths,
        weaknesses,
        areasToImprove
      }
    });

    // Lock user from taking another test
    await prisma.user.update({
      where: { id: userId },
      data: { hasTakenTest: true }
    });

    return NextResponse.json({ message: "Exam submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Submission Error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
