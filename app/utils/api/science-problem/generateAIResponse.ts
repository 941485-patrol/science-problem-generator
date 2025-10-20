import { GoogleGenerativeAI } from '@google/generative-ai';
export default async function generateAIResponse(prompt: string) {
    // Google AI constants.
    if (!process.env.GOOGLE_API_KEY) {
        throw new Error('GOOGLE_API_KEY is not defined');
    }
    // Google AI constants.
    const googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const googleAIModel = googleAI.getGenerativeModel({
        model: 'gemini-2.5-flash'
    });

    // Results constants.
    const result = await googleAIModel.generateContent(prompt);
    const resultText = result.response.text();
    return resultText;
}