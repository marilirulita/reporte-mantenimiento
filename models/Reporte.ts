export interface Cliente {
  id?: number;                // clave primaria
  nombre: string;            // obligatorio
  direccion: string;         // obligatorio
  telefono?: string;         // opcional
  email?: string;            // opcional
}

export interface Equipo {
  id?: number;                // clave primaria
  idCliente: number;         // relación con Cliente
  marca: string;             // marca del equipo
  modelo: string;            // obligatorio
  numeroSerie?: string;      // opcional
  tipoEquipo: string;
  ubicacionEquipo?: string;  
}

export interface Reporte {
  id?: number;                // clave primaria
  idCliente: number;         // relación con Cliente
  idEquipo: number;          // relación con Equipo
  fecha: string;             // fecha del reporte
  tecnico: string;           // nombre tecnico
  estadoEquipo: string;
  tipoRefrigerante?: string;
  presion?: string;
  temperaturaAmbiente?: string;
  temperaturaEquipo?: string;
  voltaje?: string;
  amperaje?: string;
  trabajoRealizado: string;  // detalles del reporte
  observaciones?: string;    // campo opcional
  recomendaciones?: string;
  fotos: string[];
  firma: string;
  pdfUri: string;           // ruta local del PDF generado
} 
