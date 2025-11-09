import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { templaitPDF } from "./templaitPDF";
import { templaitPDFDowload } from "./templaitePDF-download";
import getBase64Image from "./getBase64Image";

export const generarPDF = async (reporte: any, download: boolean) => {

  console.log(reporte)
  // Aseguramos que fotos siempre sea un array
  let fotosArray: string[] = [];

  if (Array.isArray(reporte.fotos)) {
    fotosArray = reporte.fotos;
  } else if (typeof reporte.fotos === "string") {
    try {
      fotosArray = JSON.parse(reporte.fotos);
    } catch {
      fotosArray = [];
    }
  } else {
    fotosArray = [];
  }

  // Convierte todas las fotos del reporte a Base64
  const fotosBase64 = await Promise.all(
    fotosArray.map(async (uri:string) => await getBase64Image(uri))
  );
   // Crea una nueva versión del objeto reporte con las fotos convertidas
  const reporteConFotos = {
    ...reporte,
    fotos: fotosBase64,
  };

  const html = download ? templaitPDFDowload(reporteConFotos) : templaitPDF(reporteConFotos);

  const { uri } = await Print.printToFileAsync({ html });
  console.log("PDF generado en:", uri);

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri);
  } else {
    alert("PDF guardado en: " + uri);
  }

  return uri;
};
