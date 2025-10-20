import { NextRequest, NextResponse } from 'next/server';

import getAIRresponse from '../../utils/api/science-problem/getAIResponse';
import postGetResponse from '../../utils/api/science-problem/postGetResponse';
import generateAIResponse from '../../utils/api/science-problem/generateAIResponse';

export async function POST(req: NextRequest) {

    try {
        const prompt = `
            Generate a General Science subject fill in the blank question suitable for Grade 10 students in the Philippines.
            Return it in JSON format with keys 'problem_text' and 'final_answer'.`;

        let resultText = await generateAIResponse(prompt);

        let aiResponse = getAIRresponse(resultText);

        let problem_text = aiResponse.problem_text;
        let final_answer = aiResponse.final_answer

        let responseData = await postGetResponse(problem_text, final_answer);

        // Return the problem text and the session id from database.
        return NextResponse.json({ problem_text, sessionId: responseData.id }, { status: 200 })

    } catch (error) {
        console.error('Path /api/science-problem error:', error);

        let errMsg = 'Error generating science problem';
        return NextResponse.json(
            {
                error: errMsg,
                details: error instanceof Error ? error.message : 'Unknown error occured.'
            },
            { status: 500 })
    }
}