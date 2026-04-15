/**
 * Beneficios Institucionales Medicus (Estándar B2B)
 */

export interface Beneficio {
  id: string;
  text: string;
}

export interface CategoriaBeneficios {
  id: string;
  titulo: string;
  beneficios: Beneficio[];
}

export const beneficiosInstitucionales: CategoriaBeneficios[] = [
  {
    id: "asistencia-medica",
    titulo: "Asistencia médica y prácticas",
    beneficios: [
      { id: "am-1", text: "Consultas en consultorio y a domicilio." },
      { id: "am-2", text: "Diagnóstico y tratamiento (laboratorio, imágenes y estudios)." },
      { id: "am-3", text: "Reintegros en prácticas auxiliares (p. ej., kinesiología y fonoaudiología)." },
      { id: "am-4", text: "Plan exento de arancel adicional en consultas y prácticas médicas." }
    ]
  },
  {
    id: "internacion-cirugias",
    titulo: "Internación y cirugías",
    beneficios: [
      { id: "ic-1", text: "Pensión sanatorial." },
      { id: "ic-2", text: "Terapia intensiva y unidad coronaria." },
      { id: "ic-3", text: "Derechos operatorios y cirugías según nomenclador." },
      { id: "ic-4", text: "Acompañante en internación (maternidad y cirugía mayor)." }
    ]
  },
  {
    id: "maternidad-recien-nacido",
    titulo: "Maternidad y recién nacido",
    beneficios: [
      { id: "mrn-1", text: "Honorarios (obstetra, partera, neonatólogo y anestesista)." },
      { id: "mrn-2", text: "Gastos de internación y curso psicoprofiláctico." },
      { id: "mrn-3", text: "Recién nacido: sin cuota durante los primeros 3 meses (en partos cubiertos)." }
    ]
  },
  {
    id: "medicamentos-vacunas",
    titulo: "Medicamentos y vacunas",
    beneficios: [
      { id: "mv-1", text: "Cobertura de medicamentos por internación (incluye material descartable)." },
      { id: "mv-2", text: "Descuento en farmacias adheridas (incluye vacunas)." },
      { id: "mv-3", text: "Vacuna Prevenar al 100%." }
    ]
  },
  {
    id: "odontologia-optica",
    titulo: "Odontología y óptica",
    beneficios: [
      { id: "oo-1", text: "Plan odontológico Medicus + reintegros odontológicos." },
      { id: "oo-2", text: "Odontología general, prótesis, ortodoncia e implantes." },
      { id: "oo-3", text: "Óptica anual: anteojo completo o lentes de contacto." }
    ]
  },
  {
    id: "programas-coberturas",
    titulo: "Programas y coberturas diferenciales",
    beneficios: [
      { id: "pc-1", text: "Plan de psicología médica (sesiones sin cargo) + reintegros." },
      { id: "pc-2", text: "Medicus Mujer + check-up anual (titular y cónyuge)." },
      { id: "pc-3", text: "Seguro del viajero: 30 días por viaje (grupo familiar)." },
      { id: "pc-4", text: "Cirugía estética (1 área cada 2 años) y prótesis importada no estética al 100% (sujeto a auditoria)." }
    ]
  }
];

export const getBenefitTextById = (id: string): string => {
  for (const cat of beneficiosInstitucionales) {
    const benefit = cat.beneficios.find((b) => b.id === id);
    if (benefit) return benefit.text;
  }
  return "";
};

export const getSelectedBenefitsGrouped = (selectedIds: string[]) => {
  return beneficiosInstitucionales.map(cat => ({
    ...cat,
    beneficios: cat.beneficios.filter(b => selectedIds.includes(b.id))
  })).filter(cat => cat.beneficios.length > 0);
};
