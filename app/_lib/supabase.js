import { createClient } from "@supabase/supabase-js";

const { supabaseKey, supabaseUrl } = process.env;
export const supabase = createClient(supabaseUrl, supabaseKey);
