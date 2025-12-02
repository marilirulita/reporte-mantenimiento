export const templaitPDF = (reporte: {
  cliente: {
    cliente: {
      nombre: string;
      direccion: any;
      telefono: any;
      correo: string;
    };
    equipo: {
      marca: any;
      modelo: any;
      numeroSerie: any;
      tipoEquipo: any;
      ubicacion: any;
    };
  };
  tecnico: {
    fechaServicio: any;
    nombreTecnico: any;
    estadoEquipo: any;
    tipoRefrigerante: any;
    presion: any;
    temperaturaAmbiente: any;
    temperaturaEquipo: any;
    voltaje: any;
    amperaje: any;
    trabajoRealizado: any;
    observaciones: any;
    observacionesAdicionales: any;
  };
  fotos: any[];
  firma: any;
}) => {
  const dateToday = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeNow = new Date().toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const safe = (value: any) => value ?? ""; // usa nullish coalescing

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reporte de Mantenimiento</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f8fafc;
      color: #111827;
      margin: 0;
      padding: 0;
    }

    .page {
      width: 100%;
      margin: auto;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
      overflow: hidden;
    }

    /* Encabezado */
    .header {
      background-color: #414650ff;
      color: white;
      padding: 20px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 22px;
    }

    .header p {
      margin: 5px 0 0;
      font-size: 14px;
      color: #dbeafe;
    }

    /* Secciones */
    .section {
      margin: 20px;
      border-radius: 6px;
      overflow: hidden;
      background: #ffffff;
    }

    .row {
        display: grid;
        gap: 10px 20px; /* espacio entre campos */
      }

      .row-2 {
        grid-template-columns: repeat(2, 1fr); /* dos columnas iguales */
      }

      .row-3 {
        grid-template-columns: repeat(3, 1fr); /* dos columnas iguales */
      }

    .section-title {
      background-color: #e2e8f0;
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #111827;
    }

    .field {
      display: flex;
      padding: 6px 10px;
      font-size: 14px;
      border-bottom: 1px solid #f1f5f9;
    }

    .field:last-child {
      border-bottom: none;
    }

    .field label {
      margin-right: 10px;
      font-weight: 600;
      color: #374151;
    }

    .field-tecnico label {
      flex: 0 0 220px;
      font-weight: 600;
      color: #374151;
    }

    .field span {
      flex: 1;
      color: #111827;
    }

    /* Texto largo */
    .long-text {
      padding: 10px;
      font-size: 14px;
      line-height: 1.5;
    }

    /* Fotos */
    .fotos {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 16px;
    }

    .foto img {
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #ccc;    
      aspect-ratio: 1 / 1;  
      display: block;
    }

    /* Firma */
    .signature {
      padding: 20px;
      text-align: center;
    }

    .signature img {
      width: 200px;
      height: auto;
      border-bottom: 1px solid #000;
      margin-bottom: 5px;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      padding: 10px;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Encabezado -->
    <div class="header">
      <h1>REPORTE DE MANTENIMIENTO</h1>
      <p>Servicio de Refrigeración</p>
    </div>

    <!-- Sección: Cliente -->
    <div class="section">
    
      <div class="section-title">DATOS DEL CLIENTE</div>
      <div class="row row-2">
        <div class="field"><label>Nombre:</label><span>${safe(
          reporte.cliente.cliente.nombre
        )}</span></div>
        <div class="field"><label>Email:</label><span>${safe(
          reporte.cliente.cliente.correo
        )}</span></div>
      </div>
      <div class="row row-2">
        <div class="field"><label>Dirección:</label><span>${safe(
          reporte.cliente.cliente.direccion
        )}</span></div>
        <div class="field"><label>Teléfono:</label><span>${safe(
          reporte.cliente?.cliente?.telefono
        )}
      </span></div>
      </div>
    </div> 

    <!-- Sección: Equipo -->
    <div class="section">
      <div class="section-title">DATOS DEL EQUIPO</div>
      <div class="row row-3">
      <div class="field"><label>Marca:</label><span>${safe(
        reporte.cliente.equipo.marca
      )}</span></div>
      <div class="field"><label>Modelo:</label><span>${safe(
        reporte.cliente.equipo.modelo
      )}</span></div>
      <div class="field"><label>Serie:</label><span>${safe(
        reporte.cliente.equipo.numeroSerie
      )}</span></div>
      </div>
      <div class="row row-3">
      <div class="field"><label>Tipo:</label><span>${safe(
        reporte.cliente.equipo.tipoEquipo
      )}</span></div>
      <div class="field"><label>Ubicación:</label><span>${safe(
        reporte.cliente.equipo.ubicacion
      )}</span></div>
      <div class="field"><label></label><span></span></div>
      </div>
    </div>

    <!-- Sección: Servicio -->
    <div class="section">
      <div class="section-title">DATOS DEL SERVICIO</div>
      <div class="row row-3">
        <div class="field"><label>Fecha:</label><span>${safe(
          reporte.tecnico.fechaServicio
        )}</span></div>
        <div class="field"><label>Técnico:</label><span>${safe(reporte.tecnico.nombreTecnico)}</span></div>
        <div class="field"><label>Estado del equipo:</label><span>${safe(
          reporte.tecnico.estadoEquipo
        )}</span></div>
      </div>
    </div>

    <!-- Sección: Mediciones -->
    <div class="section">
      <div class="section-title">MEDICIONES TÉCNICAS</div>
      <div class="row row-3">
      <div class="field"><label>Tipo de Refrigerante:</label><span>${safe(
        reporte.tecnico.tipoRefrigerante
      )}</span></div>
      <div class="field"><label>Presión:</label><span>${safe(
        reporte.tecnico.presion
      )+" psi"}</span></div>
      <div class="field"><label>Temp. Ambiente:</label><span>${safe(
        reporte.tecnico.temperaturaAmbiente
      )+"°C"}</span></div>
      </div>
      <div class="row row-3">
      <div class="field"><label>Temp. Equipo:</label><span>${safe(
        reporte.tecnico.temperaturaEquipo
      )+"°C"}</span></div>
      <div class="field"><label>Voltaje:</label><span>${safe(
        reporte.tecnico.voltaje
      )+"V"}</span></div>
      <div class="field"><label>Amperaje:</label><span>${safe(
        reporte.tecnico.amperaje
      )+"A"}</span></div>
      </div>
    </div>

    <!-- Sección: Trabajo Realizado -->
    <div class="section">
      <div class="section-title">TRABAJO REALIZADO</div>
      <div class="long-text">
        ${safe(reporte.tecnico.trabajoRealizado)}
      </div>
    </div>

    <!-- Sección: Observaciones -->
    <div class="section">
      <div class="section-title">OBSERVACIONES</div>
      <div class="long-text">
        ${safe(reporte.tecnico.observaciones)}
      </div>
    </div>

    <!-- Sección: Recomendaciones -->
    <div class="section">
      <div class="section-title">RECOMENDACIONES</div>
      <div class="long-text">
        ${safe(reporte.tecnico.observacionesAdicionales)}
      </div>
    </div>

    <!-- Sección: Fotos -->
    <div class="section">
    <div class="section-title">FOTOGRAFÍAS DEL EQUIPO</div>
        <div class="fotos">
          ${reporte.fotos
            .map(
              (foto, i) =>
                `<div class="foto">
              <img src="${foto}" alt="Foto ${i + 1}" />
            </div>`
            )
            .join("")}
        </div>
    </div>

    <!-- Sección: Firma -->
    <div class="section">
      <div class="section-title">FIRMA DEL CLIENTE</div>
      <div class="signature">
      ${
        reporte.firma
          ? `<img src="${reporte.firma}" style="width:200px; height:100px;" />
          <p>${reporte.cliente.cliente.nombre}</p>`
          : "<p>No se registró firma</p>"
      }
      </div>
    </div>

    <!-- Pie de página -->
    <div class="footer">
      <p>Generado el ${dateToday}<strong> Hora:</strong> ${timeNow}</p>
    </div>
  </div>
</body>
</html>`;
};
