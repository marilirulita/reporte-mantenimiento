import { Cliente, Equipo, Reporte } from '../models/Reporte';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("reportes.db");

//////////////////////////
// CLIENTES
//////////////////////////
export const addCliente = async (cliente: Cliente) => {
  const result = await db.runAsync(
    `INSERT INTO clientes (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)`,
    [cliente.nombre, cliente.direccion, cliente.telefono ?? null, cliente.email ?? null]
  );
  return result.lastInsertRowId; // ✅ esto devuelve el ID generado
};

export const getClientes = (): Cliente[] => {
  const result = db.getAllSync<Cliente>(`SELECT * FROM clientes ORDER BY nombre DESC`);
  return result;
};

export const buscarClientesPorNombre = (texto: string) => {
  const query = `SELECT * FROM clientes WHERE nombre LIKE ?`;
  const resultados = db.getAllAsync(query, [`%${texto}%`]);
  return resultados;
};

export const deleteCliente = (id: number) => {
  db.runSync(`DELETE FROM clientes WHERE id = ?`, [id]);
};

//////////////////////////
// EQUIPOS
//////////////////////////

export const addEquipo = async (equipo: Equipo, idCliente: number) => {
  const result = await db.runAsync(
    `INSERT INTO equipos (idCliente, marca, modelo, numeroSerie, tipoEquipo, ubicacionEquipo)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      idCliente,
      equipo.marca,
      equipo.modelo,
      equipo.numeroSerie ?? null,
      equipo.tipoEquipo,
      equipo.ubicacionEquipo ?? null,
    ]
  );
  return result.lastInsertRowId;
};

export const getEquipos = (): Equipo[] => {
  const result = db.getAllSync<Equipo>(`SELECT * FROM equipos`);
  return result;
};

// 🔹 Obtiene todos los equipos asociados a un cliente
export const getEquiposByClienteId = (clienteId: number) => {
  const query = "SELECT * FROM equipos WHERE idCliente = ?;";
  const resultado = db.getAllAsync<Equipo>(query, [clienteId]);
  return resultado;
};

export const deleteEquipo = (id: number) => {
  db.runSync(`DELETE FROM equipos WHERE id = ?`, [id]);
};

//////////////////////////
// REPORTES
//////////////////////////

export const addReporte = async (reporte: Reporte) => {
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
      reporte.pdfUri ?? null
    ]
  );
  return result.lastInsertRowId;
};

export const getReportes = (): Reporte[] => {
  const result = db.getAllSync<Reporte>(`SELECT * FROM reportes ORDER BY id DESC;`);
  return result.map((r) => ({
    ...r,
    fotos: (() => {
      // Convertimos string → array si es necesario
      if (typeof r.fotos === "string") {
        try {
          return JSON.parse(r.fotos);
        } catch {
          return [];
        }
      }
      return Array.isArray(r.fotos) ? r.fotos : [];
    })()
}))
};

export const deleteReporte = (id: number) => {
  db.runSync(`DELETE FROM reportes WHERE id = ?`, [id]);
};

export const getAllReportes = (): Reporte[] => {
  // 🔹 Usamos un tipo auxiliar para lo que devuelve SQLite
  const result = db.getAllSync<Reporte>(`SELECT * FROM reportes ORDER BY id DESC;`);

  // 🔹 Mapeamos los resultados a tu modelo tipado Reporte
  return result;
};

export const getReportesConCliente = (): any[] => {

  const result = db.getAllSync(
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

  return result;
};