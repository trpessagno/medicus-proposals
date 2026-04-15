import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

export const supabase = (() => {
  // Solo inicializamos si estamos en el cliente Y tenemos las URL necesarias
  if (typeof window !== "undefined") {
    if (!supabaseInstance) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
      
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    }
    return supabaseInstance;
  }
  
  return {} as SupabaseClient;
})();

export const isSupabaseConfigured = 
  typeof window !== "undefined" && 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");
