// db/schema.ts
export const CLIENTES_TABLE = `
CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  direccion TEXT NOT NULL,
  telefono TEXT,
  email TEXT
);
`;

export const EQUIPOS_TABLE = `
CREATE TABLE IF NOT EXISTS equipos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  idCliente INTEGER NOT NULL,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  numeroSerie TEXT,
  tipoEquipo TEXT NOT NULL,
  ubicacionEquipo TEXT,
  FOREIGN KEY(idCliente) REFERENCES clientes(id)
);
`;

export const REPORTES_TABLE = `
CREATE TABLE IF NOT EXISTS reportes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  idCliente INTEGER NOT NULL,
  idEquipo INTEGER NOT NULL,
  fecha TEXT NOT NULL,
  tecnico TEXT NOT NULL,
  estadoEquipo TEXT NOT NULL 
    CHECK(estadoEquipo IN ('Excelente', 'Bueno', 'Regular', 'Malo', 'Crítico')),
  tipoRefrigerante TEXT,
  presion TEXT,
  temperaturaAmbiente TEXT,
  temperaturaEquipo TEXT,
  voltaje TEXT,
  amperaje TEXT,
  trabajoRealizado TEXT NOT NULL,
  observaciones TEXT,
  recomendaciones TEXT,
  fotos TEXT,
  firma TEXT,
  pdfUri TEXT,
  FOREIGN KEY(idCliente) REFERENCES clientes(id),
  FOREIGN KEY(idEquipo) REFERENCES equipos(id)
);
`;
