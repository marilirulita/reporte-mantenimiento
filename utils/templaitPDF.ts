export const templaitPDF = (reporte: {
  cliente: {
    nombre: any;
    direccion: any;
    telefono: any;
    correo: any;
    marca: any;
    modelo: any;
    numeroSerie: any;
    tipoEquipo: any;
    ubicacion: any;
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
      width: 800px;
      margin: 40px auto;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
      border-radius: 8px;
      overflow: hidden;
    }

    /* Encabezado */
    .header {
      background-color: #2563eb;
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
      flex: 0 0 180px;
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
    .photos {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 10px;
      justify-content: start;
    }

    .photos img {
      width: 180px;
      height: 120px;
      object-fit: cover;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
    }

    .fotos {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 16px;
    }

    .foto img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #ccc;
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
      <div class="field"><label>Nombre:</label><span>${reporte.cliente.nombre
    }</span></div>
      <div class="field"><label>Dirección:</label><span>${reporte.cliente.direccion
    }</span></div>
      <div class="field"><label>Teléfono:</label><span>${reporte.cliente.telefono
    }</span></div>
      <div class="field"><label>Email:</label><span>${reporte.cliente.correo
    }</span></div>
    </div> 

    <!-- Sección: Equipo -->
    <div class="section">
      <div class="section-title">DATOS DEL EQUIPO</div>
      <div class="field"><label>Marca:</label><span>${reporte.cliente.marca
    }</span></div>
      <div class="field"><label>Modelo:</label><span>${reporte.cliente.modelo
    }</span></div>
      <div class="field"><label>Serie:</label><span>${reporte.cliente.numeroSerie
    }</span></div>
      <div class="field"><label>Tipo:</label><span>${reporte.cliente.tipoEquipo
    }</span></div>
      <div class="field"><label>Ubicación:</label><span>${reporte.cliente.ubicacion
    }</span></div>
    </div>

    <!-- Sección: Servicio -->
    <div class="section">
      <div class="section-title">DATOS DEL SERVICIO</div>
      <div class="field field-tecnico"><label>Fecha:</label><span>${reporte.tecnico.fechaServicio
    }</span></div>
      <div class="field field-tecnico"><label>Técnico:</label><span>
      ${reporte.tecnico.nombreTecnico}</span></div>
      <div class="field field-tecnico"><label>Estado del equipo:</label><span>${reporte.tecnico.estadoEquipo
    }</span></div>
    </div>

    <!-- Sección: Mediciones -->
    <div class="section">
      <div class="section-title">MEDICIONES TÉCNICAS</div>
      <div class="field field-tecnico"><label>Tipo de Refrigerante:</label><span>${reporte.tecnico.tipoRefrigerante
    }</span></div>
      <div class="field field-tecnico"><label>Presión (psi):</label><span>${reporte.tecnico.presion
    }</span></div>
      <div class="field field-tecnico"><label>Temp. Ambiente (°C):</label><span>${reporte.tecnico.temperaturaAmbiente
    }</span></div>
      <div class="field field-tecnico"><label>Temp. Equipo (°C):</label><span>${reporte.tecnico.temperaturaEquipo
    }</span></div>
      <div class="field field-tecnico"><label>Voltaje (V):</label><span>${reporte.tecnico.voltaje
    }</span></div>
      <div class="field field-tecnico"><label>Amperaje (A):</label><span>${reporte.tecnico.amperaje
    }</span></div>
    </div>

    <!-- Sección: Trabajo Realizado -->
    <div class="section">
      <div class="section-title">TRABAJO REALIZADO</div>
      <div class="long-text">
        ${reporte.tecnico.trabajoRealizado}
      </div>
    </div>

    <!-- Sección: Observaciones -->
    <div class="section">
      <div class="section-title">OBSERVACIONES</div>
      <div class="long-text">
        ${reporte.tecnico.observaciones}
      </div>
    </div>

    <!-- Sección: Recomendaciones -->
    <div class="section">
      <div class="section-title">RECOMENDACIONES</div>
      <div class="long-text">
        ${reporte.tecnico.observacionesAdicionales}
      </div>
    </div>

    <!-- Sección: Fotos -->
    <div class="section">
      <div class="section-title">FOTOGRAFÍAS DEL EQUIPO</div>
      <div class="photos">
        <div class="fotos">
          ${reporte.fotos.map((foto, i) => 
            `<div class="foto">
              <img src="${foto}" alt="Foto ${i + 1}" />
            </div>`).join("")}
        </div>
      </div>
    </div>
    <!-- Sección: Firma -->
    <div class="section">
      <div class="section-title">FIRMA DEL CLIENTE</div>
      <div class="signature">
      ${reporte.firma
      ? `<img src="${reporte.firma}" style="width:200px; height:100px;" />
          <p>${reporte.cliente.nombre}</p>`
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
