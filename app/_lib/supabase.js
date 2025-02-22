import { createClient } from "@supabase/supabase-js";

const { supabaseKey, supabaseUrl } = process.env;
// console.log(supabaseUrl, supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);
