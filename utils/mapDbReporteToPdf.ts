import { PdfReporte } from "@/models/ReportePDF";

export const mapDbReporteToPdf = (reporte: any): PdfReporte => ({
  cliente: {
    nombre: reporte.nombre,
    direccion: reporte.direccion,
    telefono: reporte.telefono,
    email: reporte.email,
  },
  equipo: {
    marca: reporte.marca,
    modelo: reporte.modelo,
    numeroSerie: reporte.numeroSerie,
    tipoEquipo: reporte.tipoEquipo,
    ubicacionEquipo: reporte.ubicacionEquipo,
  },
  servicio: {
    fecha: reporte.fecha,
    tecnico: reporte.tecnico,
    estadoEquipo: reporte.estadoEquipo,
  },
  mediciones: {
    tipoRefrigerante: reporte.tipoRefrigerante,
    presion: reporte.presion,
    temperaturaAmbiente: reporte.temperaturaAmbiente,
    temperaturaEquipo: reporte.temperaturaEquipo,
    voltaje: reporte.voltaje,
    amperaje: reporte.amperaje,
  },
  trabajoRealizado: reporte.trabajoRealizado,
  observaciones: reporte.observaciones,
  recomendaciones: reporte.recomendaciones,
  fotos: reporte.fotos,
  firma: reporte.firma,
});
