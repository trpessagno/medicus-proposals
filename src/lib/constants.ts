import { ProposalData } from "./types";

export const MOCK_DATA: ProposalData = {
  clientName: "TechSolutions S.A.",
  cuit: "30-00000000-0",
  capitas: "150",
  date: "Junio 2024",
  currentCompetition: "OSDE 210",
  plans: ["Family", "Celeste", "Azul"],
  pricingIndividual: [
    { plan: "INTEGRA", age0_26: "85.000", age27_35: "110.000", age36_44: "160.000", age45_64: "190.000" },
    { plan: "FAMILY", age0_26: "98.417", age27_35: "122.750", age36_44: "189.621", age45_64: "216.941" },
    { plan: "CONECTA", age0_26: "115.000", age27_35: "140.000", age36_44: "210.000", age45_64: "245.000" },
    { plan: "AZUL", age0_26: "155.447", age27_35: "193.912", age36_44: "296.099", age45_64: "338.737" },
    { plan: "CELESTE", age0_26: "128.548", age27_35: "160.346", age36_44: "244.896", age45_64: "280.168" }
  ],
  pricingMatrimonio: [
    { plan: "INTEGRA", age0_26: "160.000", age27_35: "205.000", age36_44: "310.000", age45_64: "360.000" },
    { plan: "FAMILY", age0_26: "185.420", age27_35: "230.950", age36_44: "356.400", age45_64: "407.800" },
    { plan: "CONECTA", age0_26: "220.000", age27_35: "270.000", age36_44: "400.000", age45_64: "470.000" },
    { plan: "AZUL", age0_26: "292.300", age27_35: "364.700", age36_44: "557.100", age45_64: "637.500" },
    { plan: "CELESTE", age0_26: "242.100", age27_35: "302.400", age36_44: "460.800", age45_64: "528.200" }
  ],
  selectedBenefits: []
};

export const MEDICUS_COLORS = {
  primary: "#002d72", // Official Medicus Deep Blue
  secondary: "#0260f9", // Official Medicus Digital Blue
  accent: "#f2f6f9", // Brand light gray/blue background
  text: "#002d72",
  lightText: "#5a7184", // Brand muted text
  white: "#FFFFFF",
  border: "#e2e8f0"
};
