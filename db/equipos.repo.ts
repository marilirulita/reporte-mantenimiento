import { Equipo } from "../models/Reporte";
import { db } from "./database";

export const addEquipo = async (equipo: Equipo, idCliente: number) => {
  try {
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
  } catch (error) {
    console.error("Error al agregar equipo", error);
    throw error;
  }
};

export const getEquipos = async (): Promise<Equipo[]> => {
  try {
    return await db.getAllAsync<Equipo>(`SELECT * FROM equipos`);
  } catch (error) {
    console.error("Error al obtener equipos", error);
    throw error;
  }
};

// 🔹 Obtiene todos los equipos asociados a un cliente
export const getEquiposByClienteId = async (clienteId: number) => {
  try {
    const query = "SELECT * FROM equipos WHERE idCliente = ?;";
    return await db.getAllAsync<Equipo>(query, [clienteId]);
  } catch (error) {
    console.error("Error al obtener equipos por cliente id", error);
    throw error;
  }
};

export const deleteEquipo = async (id: number) => {
  try {
    await db.runAsync(`DELETE FROM equipos WHERE id = ?`, [id]);
  } catch (error) {
    console.error("Error al eliminar equipo", error);
    throw error;
  }
};
