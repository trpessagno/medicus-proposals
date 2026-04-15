/** v1.0.2 - Persistencia híbrida (Supabase + localStorage fallback) */
import { supabase, isSupabaseConfigured } from "./supabase";
import { ProposalData, PlanType, PricingRow } from "./types";

const LOCAL_STORAGE_KEY = "medicus_proposals_fallback";

export const api = {
  /**
   * Guarda una propuesta. Prioriza Supabase si está configurado, de lo contrario usa localStorage.
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
      selected_benefits: data.selectedBenefits,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        if (data.id && data.id.includes("-")) { // Supabase IDs are UUIDs
          const { data: updated, error } = await supabase
            .from("proposals")
            .update(payload)
            .eq("id", data.id)
            .select()
            .single();
          
          if (!error && updated) return { data: this.mapFromDb(updated), error: null };
        } else {
          const { data: inserted, error } = await supabase
            .from("proposals")
            .insert([{ ...payload, created_at: new Date().toISOString() }])
            .select()
            .single();
          
          if (!error && inserted) return { data: this.mapFromDb(inserted), error: null };
        }
      } catch (e) {
        console.warn("Supabase falló, recurriendo a localStorage:", e);
      }
    }

    // Fallback: LocalStorage
    return this.saveLocal(data);
  },

  /**
   * Obtiene todas las propuestas. Combina Supabase y localStorage.
   */
  async getProposals(): Promise<{ data: ProposalData[]; error: unknown }> {
    let supabaseProposals: ProposalData[] = [];
    
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("proposals")
          .select("*")
          .order("updated_at", { ascending: false });
        if (!error && data) supabaseProposals = data.map(this.mapFromDb);
      } catch (e) {
        console.warn("Error cargando de Supabase:", e);
      }
    }

    const localProposals = this.getLocalProposals();
    
    // Unir y ordenar por fecha
    const all = [...supabaseProposals, ...localProposals].sort((a, b) => 
      new Date(b.updated_at || "").getTime() - new Date(a.updated_at || "").getTime()
    );

    return { data: all, error: null };
  },

  /**
   * Elimina una propuesta.
   */
  async deleteProposal(id: string): Promise<{ error: unknown }> {
    if (isSupabaseConfigured && id.includes("-")) {
      try {
        const { error } = await supabase.from("proposals").delete().eq("id", id);
        if (!error) return { error: null };
      } catch (e) {
        console.warn("Error eliminando en Supabase:", e);
      }
    }

    const local = this.getLocalProposals();
    const filtered = local.filter(p => p.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    return { error: null };
  },

  /** --- Helpers LocalStorage --- */

  getLocalProposals(): ProposalData[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveLocal(data: ProposalData): { data: ProposalData; error: null } {
    const proposals = this.getLocalProposals();
    const now = new Date().toISOString();
    
    let updatedData: ProposalData;
    
    if (data.id && !data.id.includes("-")) { // Es un ID local (p.ej. timestamp)
      const index = proposals.findIndex(p => p.id === data.id);
      updatedData = { ...data, updated_at: now };
      if (index !== -1) {
        proposals[index] = updatedData;
      } else {
        proposals.push(updatedData);
      }
    } else {
      updatedData = { 
        ...data, 
        id: `local-${Date.now()}`, 
        updated_at: now 
      };
      proposals.push(updatedData);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(proposals));
    return { data: updatedData, error: null };
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
      selectedBenefits: (row.selected_benefits as string[]) || [],
    };
  }
};
