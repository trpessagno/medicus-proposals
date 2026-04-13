export interface PricingRow {
  plan: string;
  age0_26: string;
  age27_35: string;
  age36_44: string;
  age45_64: string;
}

export type PlanType = "Family R" | "Celeste 6" | "Azul 4";

export interface ProposalData {
  clientName: string;
  date: string;
  currentCompetition: string;
  plans: PlanType[];
  pricingIndividual: PricingRow[];
  pricingMatrimonio: PricingRow[];
}
