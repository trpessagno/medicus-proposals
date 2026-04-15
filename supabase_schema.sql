-- Script para crear la tabla de propuestas en Supabase
-- Ejecuta esto en el Editor de SQL de tu panel de Supabase

CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_name TEXT NOT NULL,
  cuit TEXT,
  capitas TEXT,
  date TEXT,
  current_competition TEXT,
  plans JSONB, -- Array de strings con los nombres de planes
  pricing_individual JSONB, -- Array de objetos PricingRow
  pricing_matrimonio JSONB -- Array de objetos PricingRow
);

-- Opcional: Habilitar RLS si deseas seguridad por usuario
-- ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Permitir todo a usuarios autenticados" ON proposals FOR ALL USING (true);
