export interface Cliente {
  id?: number;
  nombre: string;
  direccion: string;
  telefono: string;
  referencia: string;
}

export interface Equipo {
  id?: number;
  cliente_id: number; // FK hacia Cliente
  descripcion: string;
  marca: string;
  modelo: string;
  serie: string;
  ton_volt: string;
  area: string;
}

export interface Reporte {
  id?: number;
  cliente_id: number; // FK hacia Cliente
  equipo_id: number;  // FK hacia Equipo
  reporte_numero: string;
  tecnico_nombre: string;
  fecha_ejecucion: string;
  orden_trabajo?: string;

  // Compresores
  compresor1_amps: string;
  compresor1_referencia: string;
  compresor1_baja: string;
  compresor1_alta: string;
  compresor1_aceite: string;

  compresor2_amps?: string;
  compresor2_referencia?: string;
  compresor2_baja?: string;
  compresor2_alta?: string;
  compresor2_aceite?: string;

  compresor3_amps?: string;
  compresor3_referencia?: string;
  compresor3_baja?: string;
  compresor3_alta?: string;
  compresor3_aceite?: string;

  // Motores
  motor1_amps: string;
  motor2_amps?: string;
  motor3_amps?: string;
  motor4_amps?: string;
  motor5_amps?: string;
  motor6_amps?: string;
  linea_motor1_referencia?: string;
  linea_motor2_referencia?: string;

  // Evaporador
  evaporador_amps: string;
  evaporador_referencia: string;
  evaporador_banda: string;
  evaporador_medida: string;
  evaporador_filtro_retorno: string;

  // Generales
  voltaje: string;
  temp_int: string;
  temp_ext: string;
  ruidos_extranos: string;

  // Otros
  actividades_realizadas: string;
  recomendaciones: string;
  cobro_servicio: string;

  // Firma, fotos, pdfUri
  firma: string;
  fotos: string[];
  pdfUri: string;
}
