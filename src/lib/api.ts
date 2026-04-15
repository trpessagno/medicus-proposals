import { supabase } from "./supabase";
import { ProposalData } from "./types";

export const api = {
  /**
   * Guarda una propuesta. Si tiene ID, la actualiza; si no, crea una nueva.
   */
  async saveProposal(data: ProposalData): Promise<{ data: ProposalData | null; error: any }> {
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
  async getProposals(): Promise<{ data: ProposalData[]; error: any }> {
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
  async deleteProposal(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from("proposals")
      .delete()
      .eq("id", id);
    return { error };
  },

  /**
   * Mapea un registro de la base de datos (snake_case) al objeto de la app (camelCase).
   */
  mapFromDb(dbRow: any): ProposalData {
    return {
      id: dbRow.id,
      updated_at: dbRow.updated_at,
      clientName: dbRow.client_name,
      cuit: dbRow.cuit,
      capitas: dbRow.capitas,
      date: dbRow.date,
      currentCompetition: dbRow.current_competition,
      plans: dbRow.plans || [],
      pricingIndividual: dbRow.pricing_individual || [],
      pricingMatrimonio: dbRow.pricing_matrimonio || [],
    };
  }
};
