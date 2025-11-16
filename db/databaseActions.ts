import * as SQLite from "expo-sqlite";
import { Cliente, Equipo, Reporte, User } from '../models/interfaces';

const db = SQLite.openDatabaseSync("servicios.db");

//////////////////////////
// USUARIOS
//////////////////////////
// Crear usuario
export const createUser = async (user: User): Promise<number> => {
  const result = await db.runAsync(
    `INSERT INTO users (name, username, role, password) VALUES (?, ?, ?, ?);`,
    [user.name, user.username, user.role, user.password]
  );
  return result.lastInsertRowId;
};

// Obtener todos los usuarios
export const getUsers = (): User[] => {
  const result = db.getAllSync<User>(`SELECT * FROM users ORDER BY role ASC;`);
  return result;
};

// Obtener un solo usuario por ID
export const getUserById = (id: number): User | undefined => {
  const result = db.getAllSync<User>(`SELECT * FROM users WHERE id = ?;`, [id]);
  return result[0];
};

// Tipo para actualizar usuario (password opcional)
type UpdateUserData = Omit<User, "password"> & { password?: string };

// Actualizar usuario
export const updateUser = async (user: UpdateUserData): Promise<void> => {
  if (!user.id) {
    throw new Error("El usuario debe tener un ID para actualizar");
  }
  // Si no se proporciona password, solo actualizamos los otros campos
  if (user.password) {
    await db.runAsync(
      `UPDATE users SET name=?, username=?, role=?, password=? WHERE id=?;`,
      [user.name, user.username, user.role, user.password, user.id]
    );
  } else {
    await db.runAsync(
      `UPDATE users SET name=?, username=?, role=? WHERE id=?;`,
      [user.name, user.username, user.role, user.id]
    );
  }
};

// Eliminar usuario
export const deleteUser = (id: number): void => {
  db.runSync(`DELETE FROM users WHERE id = ?;`, [id]);
};

//////////////////////////
// CLIENTES
//////////////////////////
export const addCliente = async (cliente: Cliente) => {
  const result = await db.runAsync(
    `INSERT INTO clientes (nombre, direccion, telefono, referencia) VALUES (?, ?, ?, ?)`,
    [cliente.nombre, cliente.direccion, cliente.telefono, cliente.referencia]
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

export const addEquipo = async (equipo: Equipo, cliente_id: number) => {
  const result = await db.runAsync(
    `INSERT INTO equipos (cliente_id, descripcion, marca, modelo, serie, ton_volt, area)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      cliente_id,
      equipo.descripcion,
      equipo.marca,
      equipo.modelo,
      equipo.serie,
      equipo.ton_volt,
      equipo.area,
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
  const query = "SELECT * FROM equipos WHERE cliente_id = ?;";
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
      cliente_id,
      equipo_id,
      reporte_numero,
      tecnico_nombre,
      fecha_ejecucion,
      orden_trabajo,
      compresor1_amps, compresor1_referencia, compresor1_baja, compresor1_alta, compresor1_aceite,
      compresor2_amps, compresor2_referencia, compresor2_baja, compresor2_alta, compresor2_aceite,
      compresor3_amps, compresor3_referencia, compresor3_baja, compresor3_alta, compresor3_aceite,
      motor1_amps, motor2_amps, motor3_amps, motor4_amps, motor5_amps, motor6_amps,
      linea_motor1_referencia, linea_motor2_referencia,
      evaporador_amps, evaporador_referencia, evaporador_banda, evaporador_medida, evaporador_filtro_retorno,
      voltaje, temp_int, temp_ext, ruidos_extranos, actividades_realizadas, recomendaciones, cobro_servicio,
      fotos,
      firma,
      pdfUri
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      reporte.cliente_id,
      reporte.equipo_id,
      reporte.reporte_numero,
      reporte.tecnico_nombre,
      reporte.fecha_ejecucion,
      reporte.orden_trabajo ?? null,
      reporte.compresor1_amps,
      reporte.compresor1_referencia,
      reporte.compresor1_baja,
      reporte.compresor1_alta,
      reporte.compresor1_aceite,
      reporte.compresor2_amps ?? null,
      reporte.compresor2_referencia ?? null,
      reporte.compresor2_baja ?? null,
      reporte.compresor2_alta ?? null,
      reporte.compresor2_aceite ?? null,
      reporte.compresor3_amps ?? null,
      reporte.compresor3_referencia ?? null,
      reporte.compresor3_baja ?? null,
      reporte.compresor3_alta ?? null,
      reporte.compresor3_aceite ?? null,
      reporte.motor1_amps,
      reporte.motor2_amps ?? null,
      reporte.motor3_amps ?? null,
      reporte.motor4_amps ?? null,
      reporte.motor5_amps ?? null,
      reporte.motor6_amps ?? null,
      reporte.linea_motor1_referencia ?? null,
      reporte.linea_motor2_referencia ?? null,
      reporte.evaporador_amps,
      reporte.evaporador_referencia,
      reporte.evaporador_banda,
      reporte.evaporador_medida,
      reporte.evaporador_filtro_retorno,
      reporte.voltaje,
      reporte.temp_int,
      reporte.temp_ext,
      reporte.ruidos_extranos,
      reporte.actividades_realizadas,
      reporte.recomendaciones,
      reporte.cobro_servicio,
      fotosJSON ?? null,
      reporte.firma,
      reporte.pdfUri,
    ]
  );
  return result.lastInsertRowId;
};

export const getReporte = (reporteId: number): Reporte | undefined => {
  const result = db.getAllSync<Reporte>(`SELECT * FROM reportes WHERE id = ?`, [reporteId]);
  const reporte = result[0];
  return reporte;
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

export async function buscarReportes(texto: string) {
  try {
    const like = `%${texto}%`;
    const query = `
      SELECT * FROM reportes r
      LEFT JOIN clientes c ON r.cliente_id = c.id
      LEFT JOIN equipos e ON e.id = r.equipo_id
      WHERE c.nombre LIKE ? 
         OR e.serie LIKE ? 
         OR r.fecha_ejecucion LIKE ? 
         OR r.tecnico_nombre LIKE ? 
         OR r.reporte_numero LIKE ?
      ORDER BY r.fecha DESC;
    `;
    const result = await db.getAllAsync(query, [like, like, like, like, like]);
    return result;
  } catch (err) {
    console.error("Error al buscar reportes:", err);
    return [];
  }
}

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
      clientes.referencia AS referencia,
      equipos.marca AS marca,
      equipos.modelo AS modelo,
      equipos.serie AS serie,
      equipos.descripcion AS descripcion,
      equipos.area AS area,
      equipos.ton_volt AS ton_volt
    FROM reportes
    INNER JOIN clientes ON reportes.cliente_id = clientes.id
    INNER JOIN equipos ON reportes.equipo_id = equipos.id
    ORDER BY reportes.id DESC;`
  
  );

  return result;
};