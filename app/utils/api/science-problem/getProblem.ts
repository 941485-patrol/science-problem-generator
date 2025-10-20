import { supabase } from "../../../../lib/supabaseClient";

export default async function getProblem(id: any) {
    try {
        const response = await supabase
            .from('science_problem_sessions')
            .select('*')
            .eq('id', id)
            .single();

        if (response.error) throw response.error;
        return response.data
    } catch (error) {
        let errMsg = 'Supabase Error fetching the session.';
        console.error(errMsg, error);
        throw new Error(String(error));
    }
}