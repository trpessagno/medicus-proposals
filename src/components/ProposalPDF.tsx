"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { ProposalData } from "../lib/types";
import { MEDICUS_COLORS } from "../lib/constants";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 50,
    fontFamily: "Helvetica",
  },
  coverPage: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 50,
    paddingTop: 60,
    fontFamily: "Helvetica",
    height: "100%",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 60,
  },
  logoBlock: {
    flexDirection: "column",
  },
  logoText: {
    color: "#002d72",
    fontSize: 28,
    fontWeight: "heavy",
    letterSpacing: -1,
  },
  logoLine: {
    height: 4,
    width: 60,
    backgroundColor: "#00b0f0",
    marginTop: 5,
  },
  topRightText: {
    textAlign: "right",
  },
  refLabel: {
    fontSize: 8,
    color: "#002d72",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  refValue: {
    fontSize: 8,
    color: "#5a7184",
    marginTop: 2,
  },
  heroSection: {
    marginTop: 40,
    marginBottom: 60,
  },
  heroPreTitle: {
    fontSize: 36,
    color: "#111827",
    fontWeight: "bold",
    letterSpacing: -1,
  },
  heroTitle: {
    fontSize: 42,
    color: "#002d72",
    fontWeight: "heavy",
    fontStyle: "italic",
    letterSpacing: -1,
    marginTop: 5,
  },
  heroSubtitle: {
    fontSize: 12,
    color: "#5a7184",
    marginTop: 25,
    lineHeight: 1.6,
    width: "70%",
  },
  dataGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  dataColLeft: {
    width: "55%",
  },
  dataColRight: {
    width: "40%",
  },
  dataLabel: {
    fontSize: 8,
    color: "#002d72",
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  dataValueMain: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "bold",
  },
  dataValueSub: {
    fontSize: 10,
    color: "#5a7184",
    marginTop: 4,
  },
  investmentCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 25,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  investmentLabel: {
    fontSize: 8,
    color: "#5a7184",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  investmentValue: {
    fontSize: 24,
    color: "#002d72",
    fontWeight: "heavy",
    letterSpacing: -1,
    marginTop: 10,
  },
  investmentSub: {
    fontSize: 8,
    color: "#94a3b8",
    marginTop: 5,
  },
  coverFooter: {
    position: "absolute",
    bottom: 50,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 15,
  },
  footerTextBold: {
    fontSize: 9,
    color: "#111827",
    fontWeight: "bold",
  },
  footerTextLight: {
    fontSize: 8,
    color: "#94a3b8",
    marginTop: 2,
  },
  stampBox: {
    width: 35,
    height: 35,
    backgroundColor: "#94a3b8",
    justifyContent: "center",
    alignItems: "center",
  },
  stampText: {
    color: "#fff",
    fontSize: 6,
    fontWeight: "bold",
  },
  // The rest from original PDF
  sectionTitle: {
    fontSize: 24,
    color: MEDICUS_COLORS.primary,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: MEDICUS_COLORS.primary,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  pageHeader: {
    fontSize: 12,
    color: MEDICUS_COLORS.lightText,
    marginBottom: 20,
    textAlign: "right",
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    color: MEDICUS_COLORS.text,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  benefitBlock: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: MEDICUS_COLORS.accent,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: MEDICUS_COLORS.border,
  },
  benefitTitle: {
    fontSize: 14,
    color: MEDICUS_COLORS.primary,
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: MEDICUS_COLORS.border,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: MEDICUS_COLORS.border,
  },
  tableHeader: {
    backgroundColor: MEDICUS_COLORS.primary,
    color: "#FFFFFF",
  },
  tableColHeader: {
    width: "25%",
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCol: {
    width: "25%",
    padding: 5,
    fontSize: 10,
    textAlign: "center",
  },
  tableColFirst: {
    width: "30%",
    padding: 5,
    fontSize: 10,
    textAlign: "left",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: MEDICUS_COLORS.border,
    paddingTop: 10,
    textAlign: "center",
    fontSize: 10,
    color: MEDICUS_COLORS.lightText,
  },
});

const ProposalPDF = ({ data }: { data: ProposalData }) => {
  return (
    <Document>
      {/* P1: COVER (REDESIGNED TO MATCH MOCKUP EXACTLY) */}
      <Page size="A4" style={styles.coverPage}>
        
        <View style={styles.topBar}>
          <View style={styles.logoBlock}>
            <Text style={styles.logoText}>MEDICUS</Text>
            <View style={styles.logoLine} />
          </View>
          <View style={styles.topRightText}>
            <Text style={styles.refLabel}>PROPUESTA CORPORATIVA</Text>
            <Text style={styles.refValue}>Ref: 2026-B2B-8832</Text>
          </View>
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroPreTitle}>Propuesta para</Text>
          <Text style={styles.heroTitle}>{data.clientName}</Text>
          
          <Text style={styles.heroSubtitle}>
            Presentación comercial exclusiva detallando beneficios, red de prestadores y cobertura médica integral para su equipo de trabajo.
          </Text>
        </View>

        <View style={styles.dataGrid}>
          <View style={styles.dataColLeft}>
             <Text style={styles.dataLabel}>PLAN SELECCIONADO</Text>
             <Text style={styles.dataValueMain}>
                {data.plans.length > 0 ? data.plans.join(" + ") : "Sin Selección"}
             </Text>
             <Text style={styles.dataValueSub}>Categoría Corporativa VIP - {data.capitas} Cápitas</Text>

             <View style={{ marginTop: 30 }}>
                <Text style={styles.dataLabel}>VIGENCIA</Text>
                <Text style={styles.dataValueMain}>{data.date || "Inmediata"}</Text>
             </View>
          </View>
          
          <View style={styles.dataColRight}>
             <View style={styles.investmentCard}>
               <Text style={styles.investmentLabel}>INVERSIÓN MENSUAL EST.</Text>
               <Text style={styles.investmentValue}>
                 {(() => {
                    if (!data.plans.length || !data.capitas) return "S/Detalle";
                    // Tomamos el primer plan seleccionado como referencia para el monto principal
                    const firstPlan = data.plans[0].toUpperCase();
                    const pricing = data.pricingIndividual.find(p => p.plan.toUpperCase() === firstPlan);
                    if (!pricing) return "S/Detalle";
                    
                    const capitasNum = parseInt(data.capitas.replace(/\./g, '')) || 0;
                    const priceNum = parseFloat(pricing.age27_35.replace(/\./g, '').replace(/,/g, '.')) || 0;
                    const total = capitasNum * priceNum;
                    
                    return total > 0 ? `$${total.toLocaleString('es-AR')}` : "S/Detalle";
                 })()}
               </Text>
               <Text style={styles.investmentSub}>Estimado base (franja 27-35 años)</Text>
             </View>
          </View>
        </View>

        <View style={styles.coverFooter}>
          <View>
            <Text style={styles.footerTextBold}>Medicus S.A. de Asistencia Médica</Text>
            <Text style={styles.footerTextLight}>Azcuénaga 910, CABA | www.medicus.com.ar</Text>
          </View>
          <View style={styles.stampBox}>
            <Text style={styles.stampText}>SELLO</Text>
          </View>
        </View>
      </Page>

      {/* P2: INTRO */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageHeader}>MEDICUS | Propuesta Comercial</Text>
        <Text style={styles.sectionTitle}>PROPUESTA {data.clientName}</Text>
        <Text style={styles.text}>
          Estimados responsables de <Text style={styles.bold}>{data.clientName}</Text>,
        </Text>
        <Text style={styles.text}>
          Es un placer para Medicus presentarles esta propuesta integral de salud diseñada para acompañar el crecimiento de su organización y el bienestar de sus colaboradores.
        </Text>
        <Text style={styles.text}>
          Nuestra red de prestadores, sanatorios propios de primer nivel y la agilidad en la gestión nos posicionan como el aliado estratégico ideal para su empresa.
        </Text>
        <Text style={styles.footer}>Confidencial - Medicus S.A. - 2026</Text>
      </Page>

      {/* P3: COMPARATIVA INTRO */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageHeader}>MEDICUS | Comparativa de Beneficios</Text>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 32, color: MEDICUS_COLORS.primary, fontWeight: "bold" }}>
            Comparativa de Beneficios
          </Text>
          <Text style={{ fontSize: 16, marginTop: 10, color: MEDICUS_COLORS.lightText }}>
            Medicus vs {data.currentCompetition}
          </Text>
        </View>
        <Text style={styles.footer}>Página 3 de 7</Text>
      </Page>

      {/* P4: DINAMIC BENEFITS */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageHeader}>Análisis de Planes</Text>
        <Text style={styles.sectionTitle}>Beneficios Detallados</Text>

        {data.plans.includes("Integra") && (
          <View style={styles.benefitBlock}>
            <Text style={styles.benefitTitle}>Integra</Text>
            <Text style={styles.text}>• 40% Dto Farmacias, Consultas médicas incluidas.</Text>
            <Text style={styles.text}>• Cobertura ágil en sanatorios de cartilla.</Text>
            <Text style={styles.text}>• Odontología general y preventiva.</Text>
          </View>
        )}

        {data.plans.includes("Family") && (
          <View style={styles.benefitBlock}>
            <Text style={styles.benefitTitle}>Family (vs 210 Osde)</Text>
            <Text style={styles.text}>• 60% Dto Farmacias, Pax Assistance, Medico a Domicilio.</Text>
            <Text style={styles.text}>• Mejoras en Reintegros, Odontología (Implantes/Ortodoncia).</Text>
            <Text style={styles.text}>• Fuera de cartilla, Psicología, Óptica (1 par monofocal/bifocal).</Text>
          </View>
        )}

        {data.plans.includes("Conecta") && (
          <View style={styles.benefitBlock}>
            <Text style={styles.benefitTitle}>Conecta</Text>
            <Text style={styles.text}>• Beneficios del plan Family optimizados.</Text>
            <Text style={styles.text}>• Ortodoncia sin límite de edad y mayores topes.</Text>
            <Text style={styles.text}>• Telemedicina 24/7 de alta prioridad.</Text>
          </View>
        )}

        {data.plans.includes("Celeste") && (
          <View style={styles.benefitBlock}>
            <Text style={styles.benefitTitle}>Celeste (vs 310/410 Osde)</Text>
            <Text style={styles.text}>• Todo lo de los planes anteriores.</Text>
            <Text style={styles.text}>• Módulo Mujer (estudios/estética) + Check Up anual.</Text>
          </View>
        )}

        {data.plans.includes("Azul") && (
          <View style={styles.benefitBlock}>
            <Text style={styles.benefitTitle}>Azul (vs 450/510 Osde)</Text>
            <Text style={styles.text}>• Todo lo de Celeste.</Text>
            <Text style={styles.text}>• CONCIERGE Sanatorio Otamendi y prestadores VIP.</Text>
          </View>
        )}
        <Text style={styles.footer}>Página 4 de 7</Text>
      </Page>

      {/* P5: PRECIOS INTRO */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageHeader}>MEDICUS | Propuesta Económica</Text>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 32, color: MEDICUS_COLORS.primary, fontWeight: "bold" }}>
            Propuesta de Precios
          </Text>
          <Text style={{ fontSize: 16, marginTop: 10, color: MEDICUS_COLORS.lightText }}>
            Vigencia: {data.date}
          </Text>
        </View>
        <Text style={styles.footer}>Página 5 de 7</Text>
      </Page>

      {/* P6: PRICING TABLES */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageHeader}>Matrices de Cotización</Text>
        
        <Text style={styles.benefitTitle}>MATRIZ INDIVIDUAL</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableColFirst, { color: "white" }]}>Plan</Text>
            <Text style={styles.tableColHeader}>0-26</Text>
            <Text style={styles.tableColHeader}>27-35</Text>
            <Text style={styles.tableColHeader}>36-44</Text>
            <Text style={styles.tableColHeader}>45-64</Text>
          </View>
          {data.pricingIndividual.map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableColFirst}>{row.plan}</Text>
              <Text style={styles.tableCol}>${row.age0_26}</Text>
              <Text style={styles.tableCol}>${row.age27_35}</Text>
              <Text style={styles.tableCol}>${row.age36_44}</Text>
              <Text style={styles.tableCol}>${row.age45_64}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.benefitTitle, { marginTop: 20 }]}>MATRIZ MATRIMONIO</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableColFirst, { color: "white" }]}>Plan</Text>
            <Text style={styles.tableColHeader}>0-26</Text>
            <Text style={styles.tableColHeader}>27-35</Text>
            <Text style={styles.tableColHeader}>36-44</Text>
            <Text style={styles.tableColHeader}>45-64</Text>
          </View>
          {data.pricingMatrimonio.map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableColFirst}>{row.plan}</Text>
              <Text style={styles.tableCol}>${row.age0_26}</Text>
              <Text style={styles.tableCol}>${row.age27_35}</Text>
              <Text style={styles.tableCol}>${row.age36_44}</Text>
              <Text style={styles.tableCol}>${row.age45_64}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>Página 6 de 7</Text>
      </Page>

      {/* P7: LEGAL */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageHeader}>Condiciones Legales</Text>
        <Text style={styles.sectionTitle}>Consideraciones Generales</Text>
        <Text style={styles.text}>
          1. Requisitos de nómina: Sujetas a declaración jurada de salud o nómina mayor a 50 titulares.
        </Text>
        <Text style={styles.text}>
          2. Topes de reintegros: Según cartilla vigente al momento de la prestación.
        </Text>
        <Text style={styles.text}>
          3. Óptica: Un par de cristales monofocales o bifocales anuales por beneficiario.
        </Text>
        <Text style={styles.text}>
          4. Salud Mental: 30 sesiones anuales por beneficiario cubiertas al 100%.
        </Text>
        <View style={{ marginTop: 50, borderTopWidth: 1, borderTopColor: MEDICUS_COLORS.primary, paddingTop: 20 }}>
          <Text style={styles.text}>Firma Medicus Corporativo</Text>
          <Text style={styles.text}>Gerencia Comercial B2B</Text>
        </View>
        <Text style={styles.footer}>Página 7 de 7</Text>
      </Page>
    </Document>
  );
};

export default ProposalPDF;
