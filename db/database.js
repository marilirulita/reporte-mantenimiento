import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("servicios.db");

// Inicializa la tabla
export const createTables = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL,
        password TEXT NOT NULL
      );

    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        direccion TEXT,
        telefono TEXT,
        referencia TEXT
      );

    CREATE TABLE IF NOT EXISTS equipos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER,
        descripcion TEXT,
        marca TEXT,
        modelo TEXT,
        serie TEXT,
        ton_volt TEXT,
        area TEXT,
        FOREIGN KEY (cliente_id) REFERENCES clientes (id)
      );

    CREATE TABLE IF NOT EXISTS reportes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER,
        equipo_id INTEGER,
        reporte_numero TEXT,
        tecnico_id INTEGER,
        tecnico_nombre TEXT,
        fecha_ejecucion TEXT,
        pendiente INTEGER DEFAULT 0,

        compresor1_amps TEXT, compresor1_referencia TEXT, compresor1_baja TEXT, compresor1_alta TEXT, compresor1_aceite TEXT,
        compresor2_amps TEXT, compresor2_referencia TEXT, compresor2_baja TEXT, compresor2_alta TEXT, compresor2_aceite TEXT,
        compresor3_amps TEXT, compresor3_referencia TEXT, compresor3_baja TEXT, compresor3_alta TEXT, compresor3_aceite TEXT,

        motor1_amps TEXT, motor2_amps TEXT, motor3_amps TEXT, motor4_amps TEXT, motor5_amps TEXT, motor6_amps TEXT,
        linea_motor1_referencia TEXT, linea_motor2_referencia TEXT,

        evaporador_amps TEXT, evaporador_referencia TEXT, evaporador_banda TEXT, evaporador_medida TEXT, evaporador_filtro_retorno TEXT,

        voltaje TEXT, temp_int TEXT, temp_ext TEXT, ruidos_extranos TEXT,
        actividades_realizadas TEXT, recomendaciones TEXT, cobro_servicio TEXT,

        firma TEXT,
        fotos TEXT,

        FOREIGN KEY (cliente_id) REFERENCES clientes (id),
        FOREIGN KEY (equipo_id) REFERENCES equipos (id)
      );
  `);
};

export default db;
