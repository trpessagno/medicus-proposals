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
      <div className="w-[40%] h-full border-r bg-white overflow-y-auto p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-12 bg-[#002d72] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <FileText className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Medicus Proposal</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">GENERADOR DE COTIZACIONES</p>
          </div>
        </div>

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="config" className="flex gap-2">
              <Settings2 className="w-4 h-4" /> Configuración
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex gap-2">
              <Users className="w-4 h-4" /> Matriz de Precios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-6 animate-in fade-in duration-300">
            <Card className="border-none shadow-sm rounded-[30px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">Datos del Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="clientName">Nombre de la Empresa</Label>
                  <Input
                    id="clientName"
                    value={data.clientName}
                    onChange={(e) => updateClientInfo("clientName", e.target.value.toUpperCase())}
                    placeholder="Ej: GRUPO MIRGOR"
                    className="border-slate-200 focus:border-[#004B8D] focus:ring-[#004B8D]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Mes/Año Cotización</Label>
                    <Input
                      id="date"
                      value={data.date}
                      onChange={(e) => updateClientInfo("date", e.target.value.toUpperCase())}
                      placeholder="Ej: ABRIL 2026"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="comp">Competencia Actual</Label>
                    <Input
                      id="comp"
                      value={data.currentCompetition}
                      onChange={(e) => updateClientInfo("currentCompetition", e.target.value.toUpperCase())}
                      placeholder="Ej: OSDE 210"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[30px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">Planes a Cotizar</CardTitle>
                <CardDescription>Selecciona los planes que incluirá el comparativo</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-2">
                {(["Family R", "Celeste 6", "Azul 4"] as PlanType[]).map((plan) => (
                  <div key={plan} className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <Checkbox
                      id={plan}
                      checked={data.plans.includes(plan)}
                      onCheckedChange={() => togglePlanData(plan)}
                    />
                    <Label htmlFor={plan} className="flex-1 font-medium cursor-pointer text-slate-700">{plan}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>
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
             <Button variant="default" className="bg-[#002d72] hover:bg-[#001a4d] text-white rounded-full px-6 flex gap-2 h-10 font-semibold transition-all hover:scale-105 active:scale-95 shadow-md">
               <Download className="w-4 h-4" /> Generar Propuesta PDF
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
    <div className="rounded-md border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[100px] text-[11px] font-bold uppercase text-slate-500">Plan</TableHead>
            <TableHead className="text-[11px] font-bold uppercase text-slate-500">0-26</TableHead>
            <TableHead className="text-[11px] font-bold uppercase text-slate-500">27-35</TableHead>
            <TableHead className="text-[11px] font-bold uppercase text-slate-500">36-44</TableHead>
            <TableHead className="text-[11px] font-bold uppercase text-slate-500">45-64</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-semibold text-xs text-slate-700 bg-slate-50/50">{row.plan}</TableCell>
              <TableCell className="p-1">
                <Input
                  className="h-8 text-xs border-transparent hover:border-slate-200 focus:border-[#004B8D] p-1 text-right"
                  value={row.age0_26}
                  onChange={(e) => onChange(idx, "age0_26", e.target.value)}
                />
              </TableCell>
              <TableCell className="p-1">
                <Input
                  className="h-8 text-xs border-transparent hover:border-slate-200 focus:border-[#004B8D] p-1 text-right"
                  value={row.age27_35}
                  onChange={(e) => onChange(idx, "age27_35", e.target.value)}
                />
              </TableCell>
              <TableCell className="p-1">
                <Input
                  className="h-8 text-xs border-transparent hover:border-slate-200 focus:border-[#004B8D] p-1 text-right"
                  value={row.age36_44}
                  onChange={(e) => onChange(idx, "age36_44", e.target.value)}
                />
              </TableCell>
              <TableCell className="p-1">
                <Input
                  className="h-8 text-xs border-transparent hover:border-slate-200 focus:border-[#004B8D] p-1 text-right"
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
