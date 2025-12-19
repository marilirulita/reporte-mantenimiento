import { Cliente } from "../models/Reporte";
import { db } from "./database";

export const addCliente = async (cliente: Cliente) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO clientes (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)`,
      [
        cliente.nombre,
        cliente.direccion,
        cliente.telefono ?? null,
        cliente.email ?? null,
      ]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al agregar cliente", error);
    throw error;
  }
};

export const getClientes = async (): Promise<Cliente[]> => {
  try {
    return await db.getAllAsync<Cliente>(
      `SELECT * FROM clientes ORDER BY nombre DESC`
    );
  } catch (error) {
    console.error("Error al obtener clientes", error);
    throw error;
  }
};

export const buscarClientesPorNombre = async (texto: string) => {
  try {
    const query = `SELECT * FROM clientes WHERE nombre LIKE ?`;
    return await db.getAllAsync(query, [`%${texto}%`]);
  } catch (error) {
    console.error("Error al buscar clientes", error);
    throw error;
  }
};

export const deleteCliente = async (id: number) => {
  try {
    await db.runAsync(`DELETE FROM clientes WHERE id = ?`, [id]);
  } catch (error) {
    console.error("Error al eliminar cliente", error);
    throw error;
  }
};
