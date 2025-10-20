import { supabase } from "../../../../lib/supabaseClient";

export default async function postFeedback(id: any, answer: string, isCorrectAnswer: boolean, feedback: string) {
    try {
        const response = await supabase
            .from('science_problem_submissions')
            .insert([{
                session_id: id,
                user_answer: String(answer),
                is_correct: isCorrectAnswer,
                feedback_text: feedback
            }]);
        if (response.error) throw response.error;
    } catch (error) {
        let errMsg = 'Supabase Error saving feedback.';
        console.error(errMsg, error);
        throw new Error(String(error));
    }
}