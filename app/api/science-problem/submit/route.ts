import { NextRequest, NextResponse } from 'next/server';
import generateAIResponse from '../../../utils/api/science-problem/generateAIResponse';
import getProblem from '../../../utils/api/science-problem/getProblem';
import postFeedback from '../../../utils/api/science-problem/postFeedback';

export async function POST(req: NextRequest) {
    try {

        let request = await req.json();

        let session = await getProblem(request.sessionId);

        if (!session) {
            throw new Error("Session not found or has expired.");
        }

        let isCorrectAnswer = String(request.userAnswer) === session.correct_answer;

        const prompt = `
        The user was given the following science problem:
        "${session.problem_text}"

        The correct answer is: ${session.correct_answer}
        The user's answer was: ${request.userAnswer}

        The user was ${isCorrectAnswer ? 'correct' : 'incorrect'}.

        Provide brief, encouraging, and personalized feedback for the user. If the user was incorrect, provide a hint on how to solve it without giving away the answer.
      `;

        let resultText = await generateAIResponse(prompt);

        await postFeedback(request.sessionId, request.userAnswer, isCorrectAnswer, resultText);

        return NextResponse.json({
            isCorrectAnswer, feedback: resultText
        }, { status: 200 });

    } catch (error) {
        // console.error('Path /api/science-problem/submit error:', error);
        console.log(error);
        let errMsg = 'Error submitting science problem';
        return NextResponse.json(
            {
                error: errMsg,
                details: error instanceof Error ? error.message : 'Unknown error occured.'
            },
            { status: 500 })
    }
}