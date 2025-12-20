export interface PdfReporte {
  cliente: {
    nombre: string;
    direccion: string;
    telefono?: string;
    email?: string;
  };
  equipo: {
    marca: string;
    modelo: string;
    numeroSerie?: string;
    tipoEquipo: string;
    ubicacionEquipo?: string;
  };
  servicio: {
    fecha: string;
    tecnico: string;
    estadoEquipo: string;
  };
  mediciones: {
    tipoRefrigerante?: string;
    presion?: string;
    temperaturaAmbiente?: string;
    temperaturaEquipo?: string;
    voltaje?: string;
    amperaje?: string;
  };
  trabajoRealizado: string;
  observaciones?: string;
  recomendaciones?: string;

  fotos: string[];
  firma?: string;
}
