import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export const generarPDF = async (reporte: { cliente: { nombre: any; direccion: any; }; tecnico: { nombre: any; }; fotos: any[]; firma: any; }) => {
  const html = `
  <html>
    <body style="font-family: sans-serif; padding: 20px;">
      <h1 style="color: #2563EB;">Reporte de Mantenimiento</h1>
      <h2>Cliente</h2>
      <p><b>Nombre:</b> ${reporte.cliente.nombre}</p>
      <p><b>Dirección:</b> ${reporte.cliente.direccion}</p>
      
      <h2>Técnico</h2>
      <p><b>Nombre:</b> ${reporte.tecnico.nombre}</p>

      <h2>Fotos</h2>
      ${reporte.fotos
        .map(
          (foto) =>
            `<img src="${foto}" style="width:150px; height:150px; object-fit:cover; margin:5px;" />`
        )
        .join("")}

      <h2>Firma del Cliente</h2>
      ${
        reporte.firma
          ? `<img src="${reporte.firma}" style="width:200px; height:100px;" />`
          : "<p>No se registró firma</p>"
      }
    </body>
  </html>`;

  const { uri } = await Print.printToFileAsync({ html });
  console.log("PDF generado en:", uri);

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri);
  } else {
    alert("PDF guardado en: " + uri);
  }
};
