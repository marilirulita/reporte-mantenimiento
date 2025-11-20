import db from './database.js';

export const checkTables = () => {
  const result = db.getAllSync("SELECT name FROM sqlite_master WHERE type='table';");
  console.log("Tablas existentes:", result);
};

export const checkColumns = () => {
  try {
    const users: any[] = db.getAllSync("PRAGMA table_info(users);");
    console.log("Columnas de clientes:", users);
  } catch (error) {
    console.error("Error al obtener columnas:", error);
  }
}

export const deleteTables = () => {
  try {
    // 🔹 Eliminar tablas si existen
    db.execSync(`
      DROP TABLE IF EXISTS users;
    `);
  
    console.log("Tablas eliminadas correctamente.");
  } catch (error) {
    console.error("Error al eliminar o crear tablas:", error);
  }
}