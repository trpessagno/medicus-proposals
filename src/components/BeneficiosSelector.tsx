"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { beneficiosInstitucionales, CategoriaBeneficios } from "../data/beneficios";

interface BeneficiosSelectorProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function BeneficiosSelector({ selectedIds, onChange }: BeneficiosSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleBenefit = (benefitId: string) => {
    const newSelection = selectedIds.includes(benefitId)
      ? selectedIds.filter((id) => id !== benefitId)
      : [...selectedIds, benefitId];
    onChange(newSelection);
  };

  const toggleAllInCategory = (category: CategoriaBeneficios) => {
    const benefitIds = category.beneficios.map((b) => b.id);
    const allSelected = benefitIds.every((id) => selectedIds.includes(id));

    let newSelection: string[];
    if (allSelected) {
      newSelection = selectedIds.filter((id) => !benefitIds.includes(id));
    } else {
      newSelection = Array.from(new Set([...selectedIds, ...benefitIds]));
    }
    onChange(newSelection);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-[#002d72] text-[32px] font-black tracking-tight leading-tight">
          Beneficios Institucionales
        </h3>
        <p className="text-slate-500 text-sm font-medium">
          Seleccione los beneficios corporativos que desea incluir en la propuesta personalizada.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {beneficiosInstitucionales.map((categoria) => {
          const isExpanded = expandedCategories.includes(categoria.id);
          const categoryBenefitIds = categoria.beneficios.map((b) => b.id);
          const selectedInCategoryCount = categoryBenefitIds.filter((id) =>
            selectedIds.includes(id)
          ).length;
          const isAllSelected = selectedInCategoryCount === categoria.beneficios.length;

          return (
            <Card key={categoria.id} className={`overflow-hidden border-slate-200 shadow-sm transition-all ${isExpanded ? "md:col-span-2 ring-1 ring-[#0260f9]/20" : "hover:border-slate-300"}`}>
              <CardHeader
                className={`p-5 cursor-pointer flex flex-row items-center justify-between transition-colors ${isExpanded ? "bg-slate-50/50" : "bg-white hover:bg-slate-50/30"}`}
                onClick={() => toggleCategory(categoria.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl transition-colors ${selectedInCategoryCount > 0 ? "bg-[#0260f9] text-white" : "bg-slate-100 text-slate-400"}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-black text-[#002d72] tracking-tight">
                      {categoria.titulo}
                    </CardTitle>
                    {selectedInCategoryCount > 0 && (
                      <p className="text-[11px] text-[#0260f9] font-black mt-0.5 uppercase tracking-wider">
                        {selectedInCategoryCount} de {categoria.beneficios.length} SELECCIONADOS
                      </p>
                    )}
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </CardHeader>

              {isExpanded && (
                <CardContent className="p-6 pt-2 bg-white border-t border-slate-100">
                  <div className="space-y-4">
                    <div 
                      className="flex items-center space-x-3 pb-3 border-b border-slate-100 mb-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        id={`all-${categoria.id}`}
                        checked={isAllSelected}
                        onCheckedChange={() => toggleAllInCategory(categoria)}
                        className="w-5 h-5 border-slate-300 data-[state=checked]:bg-[#002d72] data-[state=checked]:border-[#002d72]"
                      />
                      <label 
                        htmlFor={`all-${categoria.id}`}
                        className="text-[12px] font-black text-[#002d72] cursor-pointer tracking-wider uppercase"
                      >
                        {isAllSelected ? "Deseleccionar todos" : "Seleccionar todos de esta categoría"}
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {categoria.beneficios.map((beneficio) => (
                        <div 
                          key={beneficio.id} 
                          className="flex items-start space-x-3 group animate-in fade-in slide-in-from-left-2 duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            id={beneficio.id}
                            checked={selectedIds.includes(beneficio.id)}
                            onCheckedChange={() => toggleBenefit(beneficio.id)}
                            className="mt-0.5 w-5 h-5 border-slate-300 data-[state=checked]:bg-[#0260f9] data-[state=checked]:border-[#0260f9]"
                          />
                          <label
                            htmlFor={beneficio.id}
                            className="text-[14px] leading-relaxed text-slate-600 font-medium cursor-pointer group-hover:text-slate-900 transition-colors"
                          >
                            {beneficio.text}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
