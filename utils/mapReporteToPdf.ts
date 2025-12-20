import { PdfReporte } from "../models/ReportePDF";

export const mapReporteToPdf = (reporte: any): PdfReporte => ({
  cliente: {
    nombre: reporte.cliente.cliente.nombre,
    direccion: reporte.cliente.cliente.direccion,
    telefono: reporte.cliente.cliente.telefono,
    email: reporte.cliente.cliente.email,
  },
  equipo: {
    marca: reporte.cliente.equipo.marca,
    modelo: reporte.cliente.equipo.modelo,
    numeroSerie: reporte.cliente.equipo.numeroSerie,
    tipoEquipo: reporte.cliente.equipo.tipoEquipo,
    ubicacionEquipo: reporte.cliente.equipo.ubicacionEquipo,
  },
  servicio: {
    fecha: reporte.tecnico.fechaServicio,
    tecnico: reporte.tecnico.nombreTecnico,
    estadoEquipo: reporte.tecnico.estadoEquipo,
  },
  mediciones: {
    tipoRefrigerante: reporte.tecnico.tipoRefrigerante,
    presion: reporte.tecnico.presion,
    temperaturaAmbiente: reporte.tecnico.temperaturaAmbiente,
    temperaturaEquipo: reporte.tecnico.temperaturaEquipo,
    voltaje: reporte.tecnico.voltaje,
    amperaje: reporte.tecnico.amperaje,
  },
  trabajoRealizado: reporte.tecnico.trabajoRealizado,
  observaciones: reporte.tecnico.observaciones,
  recomendaciones: reporte.tecnico.observacionesAdicionales,
  fotos: reporte.fotos,
  firma: reporte.firma,
});
