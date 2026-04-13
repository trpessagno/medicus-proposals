"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash2, Download, FileText, Settings2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_DATA, MEDICUS_COLORS } from "../lib/constants";
import { ProposalData, PlanType, PricingRow } from "../lib/types";
import ProposalPDF from "./ProposalPDF";

// Dynamic import for PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false, loading: () => <div className="flex h-full items-center justify-center bg-gray-100 italic">Cargando Previsualización...</div> }
);

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<ProposalData>(MOCK_DATA);
  const [debouncedData, setDebouncedData] = useState<ProposalData>(MOCK_DATA);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounce effect to avoid lag in PDF generation
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedData(data);
    }, 600);
    return () => clearTimeout(handler);
  }, [data]);

  const updateClientInfo = (field: keyof ProposalData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePlanData = (plan: PlanType) => {
    setData((prev) => {
      const newPlans = prev.plans.includes(plan)
        ? prev.plans.filter((p) => p !== plan)
        : [...prev.plans, plan];
      return { ...prev, plans: newPlans };
    });
  };

  const updatePricingRow = (
    type: "pricingIndividual" | "pricingMatrimonio",
    index: number,
    field: keyof PricingRow,
    value: string
  ) => {
    setData((prev) => {
      const newRows = [...prev[type]];
      newRows[index] = { ...newRows[index], [field]: value };
      return { ...prev, [type]: newRows };
    });
  };

  return (
    <div className="flex h-screen w-full bg-[#f4f7f9] overflow-hidden">
      {/* SIDEBAR CONFIGURATION (40%) */}
      <div className="w-[40%] h-full border-r border-white/5 bg-[#002d72] overflow-y-auto p-8 shadow-2xl z-10">
        <div className="flex items-center gap-2 mb-12 px-2">
          <div className="flex items-baseline gap-1">
            <span className="text-white text-4xl font-extrabold tracking-tighter">MEDICUS</span>
            <span className="w-2 h-2 bg-[#0260f9] rounded-full animate-pulse"></span>
          </div>
        </div>

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="tabs-capsule-list mb-8 ml-2">
            <TabsTrigger value="config" className="tabs-capsule-trigger gap-2">
              <Settings2 className="w-4 h-4" /> Configuración
            </TabsTrigger>
            <TabsTrigger value="pricing" className="tabs-capsule-trigger gap-2">
              <Users className="w-4 h-4" /> Matriz de Precios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="bg-white/5 border-white/10 shadow-xl rounded-[30px] overflow-hidden backdrop-blur-md">
              <CardHeader className="pb-4 pt-6 px-6">
                <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200/50">Datos del Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 px-6 pb-8">
                <div className="grid gap-3">
                  <Label htmlFor="clientName" className="text-white/90 text-sm font-semibold ml-1">Nombre de la Empresa</Label>
                  <Input
                    id="clientName"
                    value={data.clientName}
                    onChange={(e) => updateClientInfo("clientName", e.target.value.toUpperCase())}
                    placeholder="Ej: GRUPO MIRGOR"
                    className="medicus-input-dark h-12 px-6 text-base"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="grid gap-3">
                    <Label htmlFor="date" className="text-white/90 text-sm font-semibold ml-1">Mes/Año</Label>
                    <Input
                      id="date"
                      value={data.date}
                      onChange={(e) => updateClientInfo("date", e.target.value.toUpperCase())}
                      placeholder="Ej: ABRIL 2026"
                      className="medicus-input-dark h-12 px-6"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="comp" className="text-white/90 text-sm font-semibold ml-1">Competencia</Label>
                    <Input
                      id="comp"
                      value={data.currentCompetition}
                      onChange={(e) => updateClientInfo("currentCompetition", e.target.value.toUpperCase())}
                      placeholder="Ej: OSDE 210"
                      className="medicus-input-dark h-12 px-6"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200/50 ml-6">Planes a Cotizar</Label>
              <div className="grid grid-cols-1 gap-4 px-2">
                {(["Family R", "Celeste 6", "Azul 4"] as PlanType[]).map((plan) => {
                  const isActive = data.plans.includes(plan);
                  return (
                    <div 
                      key={plan} 
                      onClick={() => togglePlanData(plan)}
                      className={`selection-card p-6 rounded-[30px] flex items-center justify-between border-2 ${isActive ? 'bg-white border-white shadow-2xl shadow-blue-900/40 scale-[1.02]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                    >
                      <div className="flex flex-col">
                        <span className={`text-sm font-extrabold uppercase tracking-widest ${isActive ? 'text-[#002d72]' : 'text-blue-100/80'}`}>{plan}</span>
                        <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-blue-100/30'}`}>{isActive ? '✓ Incluido en propuesta' : 'Hacer click para incluir'}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-[#0260f9] shadow-lg shadow-blue-500/50' : 'bg-white/10'}`}>
                        {isActive && <Plus className="w-5 h-5 text-white rotate-45" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6 animate-in fade-in duration-300">
             <Tabs defaultValue="individual" className="w-full">
                <div className="flex items-center justify-between mb-2">
                   <Label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Ajuste de Precios</Label>
                   <TabsList className="h-8">
                      <TabsTrigger value="individual" className="text-xs h-7">Individual</TabsTrigger>
                      <TabsTrigger value="matrimonio" className="text-xs h-7">Matrimonio</TabsTrigger>
                   </TabsList>
                </div>

                <TabsContent value="individual">
                  <PricingEditor 
                    rows={data.pricingIndividual} 
                    onChange={(idx, field, val) => updatePricingRow("pricingIndividual", idx, field, val)} 
                  />
                </TabsContent>
                <TabsContent value="matrimonio">
                  <PricingEditor 
                    rows={data.pricingMatrimonio} 
                    onChange={(idx, field, val) => updatePricingRow("pricingMatrimonio", idx, field, val)} 
                  />
                </TabsContent>
             </Tabs>
          </TabsContent>
        </Tabs>
      </div>

      {/* PREVIEW PANEL (60%) */}
      <div className="w-[60%] h-full flex flex-col bg-slate-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
             <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-widest">Vista Previa en Tiempo Real</h2>
          </div>
          <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
             <Button variant="default" className="bg-[#0260f9] hover:bg-[#002d72] text-white rounded-full px-8 flex gap-2 h-11 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
               <Download className="w-4 h-4" /> GENERAR PDF
             </Button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[40px] shadow-2xl border border-slate-200/50 overflow-hidden relative group text-center flex flex-col items-center justify-center">
           {mounted ? (
             <PDFViewer className="w-full h-full border-none">
               <ProposalPDF data={debouncedData} />
             </PDFViewer>
           ) : (
             <div className="text-slate-400 italic">Inicializando visor...</div>
           )}
        </div>
      </div>
    </div>
  );
}

function PricingEditor({ rows, onChange }: { rows: PricingRow[], onChange: (idx: number, field: keyof PricingRow, val: string) => void }) {
  return (
    <div className="rounded-[24px] border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm">
      <Table>
        <TableHeader className="bg-white/10">
          <TableRow className="hover:bg-transparent border-white/10">
            <TableHead className="w-[100px] text-[10px] font-black uppercase text-blue-200/50 px-4">Plan</TableHead>
            <TableHead className="text-[10px] font-black uppercase text-blue-200/50 text-right">0-26</TableHead>
            <TableHead className="text-[10px] font-black uppercase text-blue-200/50 text-right">27-35</TableHead>
            <TableHead className="text-[10px] font-black uppercase text-blue-200/50 text-right">36-44</TableHead>
            <TableHead className="text-[10px] font-black uppercase text-blue-200/50 text-right pr-4">45-64</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} className="border-white/5 hover:bg-white/5 transition-colors group">
              <TableCell className="font-bold text-xs text-white/90 px-4 group-hover:text-[#0260f9]">{row.plan}</TableCell>
              <TableCell className="p-1">
                <Input
                  className="h-9 text-xs bg-transparent border-transparent hover:border-white/10 focus:bg-white/10 focus:text-white p-2 text-right transition-all font-mono text-blue-100"
                  value={row.age0_26}
                  onChange={(e) => onChange(idx, "age0_26", e.target.value)}
                />
              </TableCell>
              <TableCell className="p-1">
                <Input
                  className="h-9 text-xs bg-transparent border-transparent hover:border-white/10 focus:bg-white/10 focus:text-white p-2 text-right transition-all font-mono text-blue-100"
                  value={row.age27_35}
                  onChange={(e) => onChange(idx, "age27_35", e.target.value)}
                />
              </TableCell>
              <TableCell className="p-1">
                <Input
                  className="h-9 text-xs bg-transparent border-transparent hover:border-white/10 focus:bg-white/10 focus:text-white p-2 text-right transition-all font-mono text-blue-100"
                  value={row.age36_44}
                  onChange={(e) => onChange(idx, "age36_44", e.target.value)}
                />
              </TableCell>
              <TableCell className="p-1 pr-4">
                <Input
                  className="h-9 text-xs bg-transparent border-transparent hover:border-white/10 focus:bg-white/10 focus:text-white p-2 text-right transition-all font-mono text-blue-100"
                  value={row.age45_64}
                  onChange={(e) => onChange(idx, "age45_64", e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
