import * as FileSystem from "expo-file-system/legacy";
import { Asset } from "expo-asset";

export const templaitPDF = async (reporte: {
  cliente: {
    nombre: string;
    direccion: any;
    telefono: any;
    referencia: string;
  };
  equipo: {
    marca: any;
    modelo: any;
    serie: any;
    descripcion: any;
    ton_volt: any;
    area: any,
  };
  tecnico: {
    fecha_ejecucion: any,
    tecnico_nombre: any,
    reporte_numero: any,

    compresor1_amps: any,
    compresor1_referencia: any,
    compresor1_baja: any,
    compresor1_alta: any,
    compresor1_aceite: any,

    compresor2_amps: any,
    compresor2_referencia: any,
    compresor2_baja: any,
    compresor2_alta: any,
    compresor2_aceite: any,

    compresor3_amps: any,
    compresor3_referencia: any,
    compresor3_baja: any,
    compresor3_alta: any,
    compresor3_aceite: any,

    motor1_amps: any,
    motor2_amps: "",
    motor3_amps: "",
    motor4_amps: "",
    motor5_amps: "",
    motor6_amps: "",
    linea_motor1_referencia: "",
    linea_motor2_referencia: "",

    evaporador_amps: "",
    evaporador_referencia: "",
    evaporador_banda: "",
    evaporador_medida: "",
    evaporador_filtro_retorno: "",

    temp_int: "",
    temp_ext: "",
    voltaje: "",
    ruidos_extranos: "",

    actividades_realizadas: "",
    recomendaciones: "",
    cobro_servicio: "",
  };
  fotos: any[];
  firma: any;
}) => {
// Obtén la ruta absoluta del logo usando expo-asset
const logoAsset = Asset.fromModule(require("../assets/images/logo.jpg"));
await logoAsset.downloadAsync();
const logoUri = logoAsset.localUri || logoAsset.uri;

// Ahora, lee el archivo y conviértelo a base64
const logoBase64 = await FileSystem.readAsStringAsync(logoUri, {
  encoding: FileSystem.EncodingType.Base64,
});

  const dateToday = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const safe = (value: any) => value ?? ""; // usa nullish coalescing

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Reporte de Servicio</title>
<style>
  body {
    font-family: "Helvetica Neue", Arial, sans-serif;
    background: #eaf9f9;
    margin: 20px;
    color: #033;
  }

  .page {
    background: #fff;
    max-width: 900px;
    margin: auto;
    padding: 20px 25px;
    border: 1px solid #cce8e6;
    border-radius: 8px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .logo {
    flex: 0.5;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 18px;
  }

  .logo img {
    width: 100%;
    height: auto;
  }

  .title {
    text-align: center;
    flex: 1;
  }

  .title h1 {
    margin: 0;
    font-size: 20px;
  }

  .title p {
    margin: 2px 0;
    font-size: 13px;
    color: #555;
  }

  .report-box {
    text-align: left;
    font-size: 13px;
  }

  .report-number {
    border: 2px solid #bfe9e8;
    padding: 8px 10px;
    border-radius: 6px;
    background: #f6ffff;
  }

  hr {
    border: none;
    border-top: 1px solid #cce8e6;
    margin: 15px 0;
  }

  h3 {
    font-size: 16px;
    color: #1b6f7a;
    margin-bottom: 8px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .card {
    background: #f9ffff;
    border: 1px solid #cce8e6;
    border-radius: 6px;
    padding: 10px 15px;
  }

  .label {
    font-size: 13px;
    color: #666;
    font-weight: bold;
  }

  .value {
    font-size: 14px;
    padding-bottom: 5px;
  }

  .section {
    margin-top: 20px;
  }

  .cond-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
  }

  .cond-table th, .cond-table td {
    border: 1px solid #d9f0ef;
    padding: 6px 8px;
    font-size: 13px;
    text-align: center;
  }

  .cond-table th {
    background: #f1fdfd;
  }

  .textarea {
    border: 1px solid #cce8e6;
    background: #f9ffff;
    padding: 10px;
    border-radius: 6px;
    min-height: 80px;
    white-space: pre-wrap;
  }


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

  footer {
    text-align: center;
    font-size: 12px;
    color: #666;
    margin-top: 20px;
  }

  @media print {
    body { background: #fff; margin: 0; }
    .page { border: none; border-radius: 0; }
  }
</style>
</head>
<body>
  <div class="page">
    <header>
      <div class="logo">
      <img src="data:image/jpeg;base64,${logoBase64}" alt="Logo" />
      </div>
      <div class="title">
        <h1>Aire Acondicionado</h1>
        <p>Venta · Instalación · Servicio</p>
        <p>Doméstica · Comercial · Industrial</p>
        <h3>Reporte de Servicio</h3>
      </div>
      <div class="report-box">
        <div>REPORTE No.</div>
        <div class="report-number"><strong></strong>${safe(reporte.tecnico.reporte_numero)}</div>
        <div>Tel: 686-390-1797</div>
        <div>Tecnico: ${safe(reporte.tecnico.tecnico_nombre)}</div>
      </div>
    </header>

    <hr>

    <div class="grid">
      <div class="card">
        <h3>Datos del Cliente</h3>
        <div><span class="label">Nombre:</span> ${safe(reporte.cliente.nombre)}</div>
        <div><span class="label">Dirección:</span> ${safe(reporte.cliente.direccion)}</div>
        <div><span class="label">Teléfono:</span> ${safe(reporte.cliente.telefono)}</div>
        <div><span class="label">Referencia:</span> ${safe(reporte.cliente.referencia)}</div>
        <div><span class="label">Fecha Ejecución:</span> ${safe(reporte.tecnico.fecha_ejecucion)}</div>
      </div>

      <div class="card">
        <h3>Datos Generales del Equipo</h3>
        <div><span class="label">Descripción:</span> ${safe(reporte.equipo.descripcion)}</div>
        <div><span class="label">Marca:</span> ${safe(reporte.equipo.marca)}</div>
        <div><span class="label">Modelo:</span> ${safe(reporte.equipo.modelo)}</div>
        <div><span class="label">Serie:</span> ${safe(reporte.equipo.serie)}</div>
        <div><span class="label">Ton./Voltaje:</span> ${safe(reporte.equipo.ton_volt)}</div>
        <div><span class="label">Área:</span> ${safe(reporte.equipo.area)}</div>
      </div>
    </div>

    <hr>

    <div class="section">
      <h3>Condiciones Generales de Operación</h3>
      <table class="cond-table">
        <thead>
          <tr>
            <th>Compresor</th>
            <th>Amps</th>
            <th>Referencia PSI</th>
            <th>Baja PSI</th>
            <th>Alta</th>
            <th>Aceite</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>No. 1</td>
            <td>${safe(reporte.tecnico.compresor1_amps)}</td>
            <td>${safe(reporte.tecnico.compresor1_referencia)}</td>
            <td>${safe(reporte.tecnico.compresor1_baja)}</td>
            <td>${safe(reporte.tecnico.compresor1_alta)}</td>
            <td>${safe(reporte.tecnico.compresor1_aceite)}</td>
          </tr>
          <tr>
            <td>No. 2</td>
            <td>${safe(reporte.tecnico.compresor2_amps)}</td>
            <td>${safe(reporte.tecnico.compresor2_referencia)}</td>
            <td>${safe(reporte.tecnico.compresor2_baja)}</td>
            <td>${safe(reporte.tecnico.compresor2_alta)}</td>
            <td>${safe(reporte.tecnico.compresor2_aceite)}</td>
          </tr>
          <tr>
            <td>No. 3</td>
            <td>${safe(reporte.tecnico.compresor3_amps)}</td>
            <td>${safe(reporte.tecnico.compresor3_referencia)}</td>
            <td>${safe(reporte.tecnico.compresor3_baja)}</td>
            <td>${safe(reporte.tecnico.compresor3_alta)}</td>
            <td>${safe(reporte.tecnico.compresor3_aceite)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h3>Motores de condenzador</h3>
      <table class="cond-table">
        <thead>
          <tr>
            <th>No. Motor</th>
            <th>Amps</th>
            <th>No. Motor</th>
            <th>Amps</th>
            <th>No. Motor</th>
            <th>Amps</th>
            <th>Referencia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>${safe(reporte.tecnico.motor1_amps)}</td>
            <td>2</td>
            <td>${safe(reporte.tecnico.motor2_amps)}</td>
            <td>3</td>
            <td>${safe(reporte.tecnico.motor3_amps)}</td>
            <td>${safe(reporte.tecnico.linea_motor1_referencia)}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>${safe(reporte.tecnico.motor4_amps)}</td>
            <td>5</td>
            <td>${safe(reporte.tecnico.motor5_amps)}</td>
            <td>6</td>
            <td>${safe(reporte.tecnico.motor6_amps)}</td>
            <td>${safe(reporte.tecnico.linea_motor2_referencia)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h3>Evaporador</h3>
      <table class="cond-table">
        <thead>
          <tr>
            <th>Amps</th>
            <th>Referencia</th>
            <th>Banda</th>
            <th>Medida</th>
            <th>Filtro de Retorno</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${safe(reporte.tecnico.evaporador_amps)}</td>
            <td>${safe(reporte.tecnico.evaporador_referencia)}</td>
            <td>${safe(reporte.tecnico.evaporador_banda)}</td>
            <td>${safe(reporte.tecnico.evaporador_medida)}</td>
            <td>${safe(reporte.tecnico.evaporador_filtro_retorno)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h3>Generales</h3>
      <table class="cond-table">
        <thead>
          <tr>
            <th>Voltaje</th>
            <th>Temp. Interior</th>
            <th>Temp. Exterior</th>
            <th>Ruidos Extraños</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${safe(reporte.tecnico.voltaje)}</td>
            <td>${safe(reporte.tecnico.temp_int)}</td>
            <td>${safe(reporte.tecnico.temp_ext)}</td>
            <td>${safe(reporte.tecnico.ruidos_extranos)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h3>Actividades Realizadas</h3>
      <div class="textarea">${safe(reporte.tecnico.actividades_realizadas)}</div>
    </div>

    <div class="section">
      <h3>Recomendaciones</h3>
      <div class="textarea">${safe(reporte.tecnico.recomendaciones)}</div>
    </div>

    <div class="section">
      <div><span class="label">Cobro por Servicio:</span> $${safe(reporte.tecnico.cobro_servicio)}</div>
    </div>

    <!-- Sección: Firma -->
    <div class="fotos-section">
      <div class="signature">
        <img src="${reporte.firma}" style="width:200px; height:100px;" />
        <div class="signature">Firma de Conformidad</div>
      </div>
    </div>

    <!-- Sección: Fotos -->
    <div class="fotos-section">
    <h3>Fotografias del Equipo</h3>

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

    <hr>
    
    <footer>
      Av. Bustamita No.1404 · Fracc. Valle del Pedregal · C.P. 21395 · Mexicali, B.C.  
      · E-mail: conforttotal@prodigy.net.mx
    </footer>
  </div>
</body>
</html>`;
};
