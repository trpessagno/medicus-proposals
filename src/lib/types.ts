export interface PricingRow {
  plan: string;
  age0_26: string;
  age27_35: string;
  age36_44: string;
  age45_64: string;
}

export type PlanType = "Integra" | "Family" | "Conecta" | "Azul" | "Celeste";

export interface ProposalData {
  id?: string;
  updated_at?: string;
  clientName: string;
  cuit: string;
  capitas: string;
  date: string;
  currentCompetition: string;
  plans: PlanType[];
  pricingIndividual: PricingRow[];
  pricingMatrimonio: PricingRow[];
  selectedBenefits: string[];
}
