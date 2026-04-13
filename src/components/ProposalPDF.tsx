"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { ProposalData } from "../lib/types";
import { MEDICUS_COLORS } from "../lib/constants";

// Register fonts if needed (using default Helvetica/Times for simplicity in this template)

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Helvetica",
  },
  coverPage: {
    flexDirection: "column",
    backgroundColor: MEDICUS_COLORS.primary,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
  },
  logoPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logoText: {
    color: MEDICUS_COLORS.primary,
    fontSize: 24,
    fontWeight: "bold",
  },
  coverTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  coverSubtitle: {
    fontSize: 18,
    opacity: 0.8,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    color: MEDICUS_COLORS.primary,
    marginBottom: 20,
    borderBottom: 2,
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
    marginBottom: 15,
    padding: 10,
    backgroundColor: MEDICUS_COLORS.accent,
    borderRadius: 4,
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
    borderTop: 1,
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
      {/* P1: COVER */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>MEDICUS</Text>
        </View>
        <Text style={styles.coverTitle}>PROPUESTA CORPORATIVA</Text>
        <Text style={styles.coverSubtitle}>{data.clientName}</Text>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.coverSubtitle}>{data.date}</Text>
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

        {data.plans.includes("Family R") && (
          <View style={styles.benefitBlock}>
            <Text style={styles.benefitTitle}>Family R (vs 210 Osde)</Text>
            <Text style={styles.text}>• 60% Dto Farmacias, Pax Assistance, Medico a Domicilio.</Text>
            <Text style={styles.text}>• Mejoras en Reintegros, Odontología (Implantes/Ortodoncia).</Text>
            <Text style={styles.text}>• Fuera de cartilla, Psicología, Óptica (1 par monofocal/bifocal).</Text>
          </View>
        )}

        {data.plans.includes("Celeste 6") && (
          <View style={styles.benefitBlock}>
            <Text style={styles.benefitTitle}>Celeste 6 (vs 310/410 Osde)</Text>
            <Text style={styles.text}>• Todo lo de Family R.</Text>
            <Text style={styles.text}>• Módulo Mujer (estudios/estética) + Check Up anual.</Text>
          </View>
        )}

        {data.plans.includes("Azul 4") && (
          <View style={styles.benefitBlock}>
            <Text style={styles.benefitTitle}>Azul 4 (vs 450/510 Osde)</Text>
            <Text style={styles.text}>• Todo lo de Celeste 6.</Text>
            <Text style={styles.text}>• CONCIERGE Sanatorio Otamendi.</Text>
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
        <View style={{ marginTop: 50, borderTop: 1, borderColor: MEDICUS_COLORS.primary, paddingTop: 20 }}>
          <Text style={styles.text}>Firma Medicus Corporativo</Text>
          <Text style={styles.text}>Gerencia Comercial B2B</Text>
        </View>
        <Text style={styles.footer}>Página 7 de 7</Text>
      </Page>
    </Document>
  );
};

export default ProposalPDF;
