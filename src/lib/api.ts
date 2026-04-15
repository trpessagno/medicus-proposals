import { supabase } from "./supabase";
import { ProposalData, PlanType, PricingRow } from "./types";

export const api = {
  /**
   * Guarda una propuesta. Si tiene ID, la actualiza; si no, crea una nueva.
   */
  async saveProposal(data: ProposalData): Promise<{ data: ProposalData | null; error: unknown }> {
    const payload = {
      client_name: data.clientName,
      cuit: data.cuit,
      capitas: data.capitas,
      date: data.date,
      current_competition: data.currentCompetition,
      plans: data.plans,
      pricing_individual: data.pricingIndividual,
      pricing_matrimonio: data.pricingMatrimonio,
      updated_at: new Date().toISOString(),
    };

    if (data.id) {
      const { data: updated, error } = await supabase
        .from("proposals")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      
      return { data: updated ? this.mapFromDb(updated) : null, error };
    } else {
      const { data: inserted, error } = await supabase
        .from("proposals")
        .insert([{ ...payload, created_at: new Date().toISOString() }])
        .select()
        .single();
      
      return { data: inserted ? this.mapFromDb(inserted) : null, error };
    }
  },

  /**
   * Obtiene todas las propuestas ordenadas por fecha de actualización.
   */
  async getProposals(): Promise<{ data: ProposalData[]; error: unknown }> {
    const { data, error } = await supabase
      .from("proposals")
      .select("*")
      .order("updated_at", { ascending: false });

    return { 
      data: data ? data.map(this.mapFromDb) : [], 
      error 
    };
  },

  /**
   * Elimina una propuesta por ID.
   */
  async deleteProposal(id: string): Promise<{ error: unknown }> {
    const { error } = await supabase
      .from("proposals")
      .delete()
      .eq("id", id);
    return { error };
  },

  /**
   * Mapea un registro de la base de datos (snake_case) al objeto de la app (camelCase).
   */
  mapFromDb(dbRow: unknown): ProposalData {
    const row = dbRow as Record<string, unknown>;
    return {
      id: row.id as string,
      updated_at: row.updated_at as string,
      clientName: row.client_name as string,
      cuit: row.cuit as string,
      capitas: row.capitas as string,
      date: row.date as string,
      currentCompetition: row.current_competition as string,
      plans: (row.plans as PlanType[]) || [],
      pricingIndividual: (row.pricing_individual as PricingRow[]) || [],
      pricingMatrimonio: (row.pricing_matrimonio as PricingRow[]) || [],
    };
  }
};
