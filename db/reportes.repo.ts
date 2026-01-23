import { Reporte, ReporteConCliente } from "../models/Reporte";
import { db } from "./database";
import { parseFotos } from "./helpers";

export const addReporte = async (reporte: Reporte) => {
  try {
    const fotosJSON = JSON.stringify(reporte.fotos ?? []);
    const result = await db.runAsync(
      `INSERT INTO reportes (
      idCliente,
      idEquipo,
      fecha,
      tecnico,
      estadoEquipo,
      tipoRefrigerante,
      presion,
      temperaturaAmbiente,
      temperaturaEquipo,
      voltaje,
      amperaje,
      trabajoRealizado,
      observaciones,
      recomendaciones,
      fotos,
      firma,
      pdfUri
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        reporte.idCliente,
        reporte.idEquipo,
        reporte.fecha ?? new Date().toISOString(),
        reporte.tecnico,
        reporte.estadoEquipo,
        reporte.tipoRefrigerante ?? null,
        reporte.presion ?? null,
        reporte.temperaturaAmbiente ?? null,
        reporte.temperaturaEquipo ?? null,
        reporte.voltaje ?? null,
        reporte.amperaje ?? null,
        reporte.trabajoRealizado,
        reporte.observaciones ?? null,
        reporte.recomendaciones ?? null,
        fotosJSON ?? null,
        reporte.firma ?? null,
        reporte.pdfUri ?? null,
      ]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al agregar reporte", error);
    throw error;
  }
};

export const getReportes = async (): Promise<Reporte[]> => {
  try {
    const result = await db.getAllAsync<Reporte>(
      `SELECT * FROM reportes ORDER BY id DESC;`
    );
    return result.map((r) => ({
      ...r,
      fotos: parseFotos(r.fotos),
    }));
  } catch (error) {
    console.error("Error al obtener reportes", error);
    throw error;
  }
};

export const deleteReporte = async (id: number) => {
  try {
    await db.runAsync(`DELETE FROM reportes WHERE id = ?`, [id]);
  } catch (error) {
    console.error("Error al eliminar reporte", error);
    throw error;
  }
};

export const getAllReportes = async (): Promise<Reporte[]> => {
  try {
    return await db.getAllAsync<Reporte>(
      `SELECT * FROM reportes ORDER BY id DESC;`
    );
  } catch (error) {
    console.error("Error al obtener todos los reportes", error);
    throw error;
  }
};

export const getReportesConCliente = async (): Promise<ReporteConCliente[]> => {
  try {
    return await db.getAllAsync(
      `SELECT 
      reportes.*,
      clientes.nombre AS nombre,
      clientes.telefono AS telefono,
      clientes.direccion AS direccion,
      clientes.email AS email,
      equipos.marca AS marca,
      equipos.modelo AS modelo,
      equipos.numeroSerie AS numeroSerie,
      equipos.tipoEquipo AS tipoEquipo,
      equipos.ubicacionEquipo AS ubicacionEquipo
    FROM reportes
    INNER JOIN clientes ON reportes.idCliente = clientes.id
    INNER JOIN equipos ON reportes.idEquipo = equipos.id
    ORDER BY reportes.id DESC;`
    );
  } catch (error) {
    console.error("Error al obtener reportes con cliente", error);
    throw error;
  }
};
