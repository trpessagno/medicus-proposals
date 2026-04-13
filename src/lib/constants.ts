import { ProposalData } from "./types";

export const MOCK_DATA: ProposalData = {
  clientName: "GRUPO MIRGOR",
  date: "ABRIL 2026",
  currentCompetition: "OSDE 210",
  plans: ["Family R", "Celeste 6", "Azul 4"],
  pricingIndividual: [
    { plan: "FAMILY R", age0_26: "98.417", age27_35: "122.750", age36_44: "189.621", age45_64: "216.941" },
    { plan: "CELESTE 6", age0_26: "128.548", age27_35: "160.346", age36_44: "244.896", age45_64: "280.168" },
    { plan: "AZUL 4", age0_26: "155.447", age27_35: "193.912", age36_44: "296.099", age45_64: "338.737" }
  ],
  pricingMatrimonio: [
    { plan: "FAMILY R", age0_26: "185.420", age27_35: "230.950", age36_44: "356.400", age45_64: "407.800" },
    { plan: "CELESTE 6", age0_26: "242.100", age27_35: "302.400", age36_44: "460.800", age45_64: "528.200" },
    { plan: "AZUL 4", age0_26: "292.300", age27_35: "364.700", age36_44: "557.100", age45_64: "637.500" }
  ]
};

export const MEDICUS_COLORS = {
  primary: "#002d72", // Official Medicus Deep Blue
  secondary: "#4da6ff", // Official Medicus Celeste/Accent
  accent: "#f4f7f9", // Very light grey/blue background
  text: "#1a1a1a",
  lightText: "#64748b",
  white: "#FFFFFF",
  border: "#e2e8f0"
};
