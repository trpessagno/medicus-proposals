-- Script para crear la tabla de propuestas en Supabase
-- Ejecuta esto en el Editor de SQL de tu panel de Supabase

CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_name TEXT NOT NULL,
  cuit TEXT,
  capitas TEXT,
  date TEXT,
  current_competition TEXT,
  plans JSONB DEFAULT '[]'::jsonb,
  pricing_individual JSONB DEFAULT '[]'::jsonb,
  pricing_matrimonio JSONB DEFAULT '[]'::jsonb,
  selected_benefits JSONB DEFAULT '[]'::jsonb,
  updated_at TEXT,
  created_at TEXT
);

-- Opcional: Habilitar RLS si deseas seguridad por usuario
-- ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Permitir todo a usuarios autenticados" ON proposals FOR ALL USING (true);
