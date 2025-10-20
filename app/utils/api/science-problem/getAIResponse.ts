export default function getAIRresponse(resultText: any) {
    // Get the AI response and parse it.
    let problem: any;
    try {
        let sanitzedResult = resultText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim()
        return problem = JSON.parse(sanitzedResult);
    } catch (error) {
        let errMsg = 'Error parsing JSON from AI';
        console.error(errMsg, error);
        throw new Error(String(error));
    }
}
