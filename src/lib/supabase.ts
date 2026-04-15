import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Usamos valores placeholder si faltan las keys para evitar que createClient explote en tiempo de build
// pero logueamos un error para que sea visible en la consola de Vercel.
const safeUrl = supabaseUrl || "https://placeholder.supabase.co";
const safeKey = supabaseAnonKey || "placeholder-key";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ CRÍTICO: Faltan las credenciales de Supabase en las variables de entorno.");
}

export const supabase = createClient(safeUrl, safeKey);
