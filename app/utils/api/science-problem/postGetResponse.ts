import { supabase } from "../../../../lib/supabaseClient";

export default async function postGetResponse(problem_text: String, final_answer: String) {
    // Save AI response to supabase, then get it.
    try {
        const response = await supabase
            .from('science_problem_sessions')
            .insert([{ problem_text: problem_text, correct_answer: final_answer }])
            .select()
            .single();

        if (response.error) throw response.error;

        return response.data;

    } catch (error) {
        let errMsg = 'Supabase Error';
        console.error(errMsg, error);
        throw new Error(String(error));
    }

}