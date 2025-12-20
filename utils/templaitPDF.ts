import { PdfReporte } from "../models/ReportePDF";

export const templatePDF = (reporte: PdfReporte) => {
  const safe = (v?: string) => v ?? "";
  const dateToday = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeNow = new Date().toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const field = (label: string, value: any) =>
    `<div class="field"><label>${label}:</label><span>${safe(
      value
    )}</span></div>`;

  const longField = (label: string, value: any) =>
    `<div class="section-title">${label}</div><div class="long-text">${safe(
      value
    )}</div>`;

  const withUnit = (value: any, unit: string) =>
    value ? `${value} ${unit}` : "";

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
      padding: 50px;
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
      margin: 30px 20px;
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
      ${field("Nombre", reporte.cliente.nombre)}
      ${field("Email", reporte.cliente.email)}
      </div>
      <div class="row row-2">
      ${field("Dirección", reporte.cliente.direccion)}
      ${field("Teléfono", reporte.cliente.telefono)}
      </div>
    </div> 

    <!-- Sección: Equipo -->
    <div class="section">
      <div class="section-title">DATOS DEL EQUIPO</div>
      <div class="row row-3">
      ${field("Marca", reporte.equipo.marca)}
      ${field("Modelo", reporte.equipo.modelo)}
      ${field("Serie", reporte.equipo.numeroSerie)}
      </div>
      <div class="row row-3">
      ${field("Tipo", reporte.equipo.tipoEquipo)}
      ${field("Ubicación", reporte.equipo.ubicacionEquipo)}
      <div class="field"><label></label><span></span></div>
      </div>
    </div>

    <!-- Sección: Servicio -->
    <div class="section">
      <div class="section-title">DATOS DEL SERVICIO</div>
      <div class="row row-3">
      ${field("Fecha", reporte.servicio.fecha)}
      ${field("Técnico", reporte.servicio.tecnico)}
      ${field("Estado del equipo", reporte.servicio.estadoEquipo)}
      </div>
    </div>

    <!-- Sección: Mediciones -->
    <div class="section">
      <div class="section-title">MEDICIONES TÉCNICAS</div>
      <div class="row row-3">
      ${field("Tipo de Refrigerante", reporte.mediciones.tipoRefrigerante)}
      ${field(
        "Presión",
        withUnit(reporte.mediciones.presion, "psi")
      )}
      ${field(
        "Temp. Ambiente",
        withUnit(reporte.mediciones.temperaturaAmbiente, "°C")
      )}
      </div>
      <div class="row row-3">
      ${field(
        "Temp. Equipo",
        withUnit(reporte.mediciones.temperaturaEquipo, "°C")
      )}
      ${field("Voltaje", withUnit(reporte.mediciones.voltaje, "V"))}
      ${field(
        "Amperaje",
        withUnit(reporte.mediciones.amperaje, "A")
      )}
      </div>
    </div>

    <!-- Sección: Trabajo Realizado -->
    <div class="section">
    ${longField("TRABAJO REALIZADO", reporte.trabajoRealizado)}
    </div>

    <!-- Sección: Observaciones -->
    <div class="section">
      ${longField("OBSERVACIONES", reporte.observaciones)}
    </div>

    <!-- Sección: Recomendaciones -->
    <div class="section">
      ${longField("RECOMENDACIONES", reporte.recomendaciones)}
    </div>

    <!-- Sección: Fotos -->
    <div class="section section-fotos">
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
