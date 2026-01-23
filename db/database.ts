import * as SQLite from "expo-sqlite";
import {
  CLIENTES_TABLE,
  EQUIPOS_TABLE,
  REPORTES_TABLE,
} from "./schema";

export const db = SQLite.openDatabaseSync("reportes.db");

// Inicializa la tabla
export const createTables = async () => {
  try {
    await db.execAsync(CLIENTES_TABLE);
    await db.execAsync(EQUIPOS_TABLE);
    await db.execAsync(REPORTES_TABLE);
    console.log("✅ Tablas creadas correctamente");
  } catch (error) {
    console.error("❌ Error creando tablas", error);
    throw error;
  }
};

export default db;
