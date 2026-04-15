"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Download, FileText, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_DATA } from "../lib/constants";
import { ProposalData, PlanType, PricingRow } from "../lib/types";
import ProposalPDF from "./ProposalPDF";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false, loading: () => <div className="flex h-full items-center justify-center bg-gray-100 italic">Cargando Previsualización...</div> }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <Button disabled className="w-full bg-slate-300 text-slate-500 h-[56px] rounded-xl font-black mt-4">Cargando PDF...</Button> }
);

const PLAN_DESCRIPTIONS: Record<PlanType, string> = {
  "Integra": "Red de prestadores básica y farmacias.",
  "Family": "Red de prestadores integral",
  "Conecta": "Cartilla premium inteligente",
  "Celeste": "Cartilla extendida y reintegros",
  "Azul": "Plan premium de alta gama"
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "planes">("dashboard");
  const [data, setData] = useState<ProposalData>(MOCK_DATA);
  const [debouncedData, setDebouncedData] = useState<ProposalData>(MOCK_DATA);

  useEffect(() => { setMounted(true); }, []);

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
    <div className="flex flex-col h-screen overflow-hidden bg-[#f4f7f9] font-sans">
      {/* NAVBAR */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-10 h-full">
          <h1 className="text-[#002d72] text-[22px] font-black tracking-tighter">MEDICUS</h1>
          <div className="flex gap-8 h-full">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`text-sm font-bold uppercase tracking-widest flex items-center h-full border-b-[3px] transition-colors ${activeTab === "dashboard" ? "border-[#0260f9] text-[#002d72]" : "border-transparent text-slate-500 hover:text-slate-800"}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("planes")}
              className={`text-sm font-bold uppercase tracking-widest flex items-center h-full border-b-[3px] transition-colors ${activeTab === "planes" ? "border-[#0260f9] text-[#002d72]" : "border-transparent text-slate-500 hover:text-slate-800"}`}
            >
              Planes
            </button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Settings className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden cursor-pointer shadow-md">
            <User className="w-5 h-5 text-white/80 mt-1" />
          </div>
        </div>
      </div>

      {activeTab === "dashboard" && (
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT SIDEBAR Opciones */}
          <div className="w-[420px] lg:w-[480px] h-full bg-[#f4f7f9] overflow-y-auto p-10 flex flex-col relative shrink-0">
            <h2 className="text-[#002d72] text-[28px] font-black mb-2 tracking-tight leading-tight">Generador de Propuestas B2B</h2>
            <p className="text-slate-600 text-[13px] mb-10 font-medium">Configure los detalles de la cotización corporativa.</p>

            <div className="mb-8 space-y-5">
              <h3 className="text-[11px] font-black tracking-[0.15em] text-slate-500 uppercase">DATOS DEL CLIENTE</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700 ml-1">Razón Social</Label>
                  <Input 
                    value={data.clientName}
                    onChange={(e) => updateClientInfo("clientName", e.target.value)}
                    className="h-11 bg-white border-slate-200/80 shadow-sm text-sm rounded-lg"
                    placeholder="Empresa S.A."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-700 ml-1">CUIT</Label>
                    <Input 
                      value={data.cuit}
                      onChange={(e) => updateClientInfo("cuit", e.target.value)}
                      className="h-11 bg-white border-slate-200/80 shadow-sm text-sm rounded-lg"
                      placeholder="30-00000000-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-700 ml-1">Cápitas</Label>
                    <Input 
                      value={data.capitas}
                      onChange={(e) => updateClientInfo("capitas", e.target.value)}
                      className="h-11 bg-white border-slate-200/80 shadow-sm text-sm rounded-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-700 ml-1">Mes/Año</Label>
                    <Input 
                      type="text"
                      value={data.date}
                      onChange={(e) => updateClientInfo("date", e.target.value)}
                      className="h-11 bg-white border-slate-200/80 shadow-sm text-sm rounded-lg block"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-700 ml-1">Competencia</Label>
                    <Input 
                      value={data.currentCompetition}
                      onChange={(e) => updateClientInfo("currentCompetition", e.target.value)}
                      className="h-11 bg-white border-slate-200/80 shadow-sm text-sm rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10 space-y-4 flex-1">
              <h3 className="text-[11px] font-black tracking-[0.15em] text-slate-500 uppercase mt-4">PLANES A COTIZAR</h3>
              <div className="space-y-3">
                {(["Integra", "Family", "Conecta", "Celeste", "Azul"] as PlanType[]).map((plan) => {
                  const isActive = data.plans.includes(plan);
                  // Usar las etiquetas exactas de la imagen para Family, Celeste, Azul
                  const planLabel = plan === "Family" ? "Family R" : plan === "Celeste" ? "Celeste 6" : plan === "Azul" ? "Azul 4" : plan;
                  return (
                    <div 
                      key={plan}
                      onClick={() => togglePlanData(plan)}
                      className={`flex items-center p-[18px] rounded-2xl cursor-pointer transition-all border-2 bg-white
                        ${isActive ? "border-[#0260f9] shadow-sm shadow-blue-500/10" : "border-slate-100 hover:border-slate-200"}
                      `}
                    >
                      <div className={`w-[22px] h-[22px] rounded-md flex items-center justify-center border-2 mr-4 shrink-0 transition-colors
                        ${isActive ? "bg-[#002d72] border-[#002d72]" : "border-slate-200 bg-slate-50"}
                      `}>
                        {isActive && <div className="w-[10px] h-[10px] bg-white transform translate-y-[-1px]" style={{ clipPath: "polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)" }} />}
                      </div>
                      <div className="flex-1 mt-1">
                        <p className={`font-black text-[15px] leading-tight ${isActive ? "text-[#002d72]" : "text-slate-800"}`}>{planLabel}</p>
                        <p className="text-[12px] text-slate-500 font-medium leading-normal mt-0.5">{PLAN_DESCRIPTIONS[plan]}</p>
                      </div>
                      {isActive && (
                        <div className="text-[#00b0f0] bg-blue-50 p-1.5 rounded-full">
                          <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
                             <circle cx="12" cy="12" r="10" fill="currentColor" className="text-[#00b0f0] opacity-20"/>
                             <path d="M10.2 14.8L7.4 12l-1.4 1.4 4.2 4.2 8.4-8.4-1.4-1.4z" fill="currentColor"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {mounted ? (
              <PDFDownloadLink
                document={<ProposalPDF data={debouncedData} />}
                fileName={`Propuesta_Medicus_${data.clientName.replace(/\s+/g, '_')}.pdf`}
                className="w-full mt-4"
              >
                {({ loading }) => (
                  <Button className="w-full bg-[#002d72] hover:bg-[#001f4f] text-white h-[56px] rounded-xl flex gap-2 font-black text-[15px] shadow-xl shrink-0 transition-transform active:scale-[0.98]">
                    <FileText className="w-5 h-5 ml-2" /> {loading ? "Generando Documento..." : "Descargar Propuesta PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            ) : (
              <Button disabled className="w-full bg-[#002d72]/50 text-white h-[56px] rounded-xl flex gap-2 font-black text-[15px] shadow-xl shrink-0 mt-4">
                <FileText className="w-5 h-5 ml-2" /> Cargando...
              </Button>
            )}
          </div>

          {/* RIGHT SIDEBAR PDF */}
          <div className="flex-1 h-full bg-[#111827] flex items-center justify-center shrink-0">
            <div className="w-full h-full relative group">
               {mounted ? (
                 <PDFViewer className="w-full h-full border-none">
                   <ProposalPDF data={debouncedData} />
                 </PDFViewer>
               ) : (
                 <div className="text-slate-400 italic flex items-center justify-center h-full">Inicializando visor...</div>
               )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "planes" && (
        <div className="flex-1 p-12 bg-white overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
             <div>
               <h2 className="text-[#002d72] text-4xl font-black mb-3 tracking-tight">Matriz de Precios</h2>
               <p className="text-slate-500 text-base font-medium">Edite los precios base (individual o matrimonio) permitidos en cada franja etaria. Estos valores alteran el PDF dinámicamente.</p>
             </div>

             <Tabs defaultValue="individual" className="w-full">
                <TabsList className="h-12 mb-8 bg-slate-100/50 p-1 rounded-xl">
                   <TabsTrigger value="individual" className="text-sm px-10 h-full rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-[#002d72] data-[state=active]:shadow-sm">Cápitas Individuales</TabsTrigger>
                   <TabsTrigger value="matrimonio" className="text-sm px-10 h-full rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-[#002d72] data-[state=active]:shadow-sm">Cápitas Matrimonio</TabsTrigger>
                </TabsList>

                <TabsContent value="individual">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <PricingEditor 
                      rows={data.pricingIndividual} 
                      onChange={(idx, field, val) => updatePricingRow("pricingIndividual", idx, field, val)} 
                    />
                  </div>
                </TabsContent>
                <TabsContent value="matrimonio">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <PricingEditor 
                      rows={data.pricingMatrimonio} 
                      onChange={(idx, field, val) => updatePricingRow("pricingMatrimonio", idx, field, val)} 
                    />
                  </div>
                </TabsContent>
             </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}

function PricingEditor({ rows, onChange }: { rows: PricingRow[], onChange: (idx: number, field: keyof PricingRow, val: string) => void }) {
  return (
    <Table>
      <TableHeader className="bg-slate-50/50">
        <TableRow className="hover:bg-transparent border-b border-slate-200 text-slate-500">
          <TableHead className="w-[180px] text-xs font-black tracking-widest uppercase px-8 py-5">Plan Medicus</TableHead>
          <TableHead className="text-xs font-black tracking-widest uppercase text-right py-5">Hasta 26 años</TableHead>
          <TableHead className="text-xs font-black tracking-widest uppercase text-right py-5">27 a 35 años</TableHead>
          <TableHead className="text-xs font-black tracking-widest uppercase text-right py-5">36 a 44 años</TableHead>
          <TableHead className="text-xs font-black tracking-widest uppercase text-right py-5 pr-8">45 a 64 años</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
            <TableCell className="font-extrabold text-[15px] text-[#002d72] px-8 tracking-tight">{row.plan}</TableCell>
            <TableCell className="p-3">
              <Input
                className="h-12 bg-white border-slate-200 focus:border-[#0260f9] focus:ring-1 focus:ring-[#0260f9] text-right font-medium text-slate-700 text-base"
                value={row.age0_26}
                onChange={(e) => onChange(idx, "age0_26", e.target.value)}
              />
            </TableCell>
            <TableCell className="p-3">
              <Input
                className="h-12 bg-white border-slate-200 focus:border-[#0260f9] focus:ring-1 focus:ring-[#0260f9] text-right font-medium text-slate-700 text-base"
                value={row.age27_35}
                onChange={(e) => onChange(idx, "age27_35", e.target.value)}
              />
            </TableCell>
            <TableCell className="p-3">
              <Input
                className="h-12 bg-white border-slate-200 focus:border-[#0260f9] focus:ring-1 focus:ring-[#0260f9] text-right font-medium text-slate-700 text-base"
                value={row.age36_44}
                onChange={(e) => onChange(idx, "age36_44", e.target.value)}
              />
            </TableCell>
            <TableCell className="p-3 pr-8">
              <Input
                className="h-12 bg-white border-slate-200 focus:border-[#0260f9] focus:ring-1 focus:ring-[#0260f9] text-right font-medium text-slate-700 text-base"
                value={row.age45_64}
                onChange={(e) => onChange(idx, "age45_64", e.target.value)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
