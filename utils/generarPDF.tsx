import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { templaitPDF } from "./templaitPDF";
import getBase64Image from "./getBase64Image";


export const generarPDF = async (reporte: any) => {
  // Convierte todas las fotos del reporte a Base64
  const fotosBase64 = await Promise.all(
    reporte.fotos.map(async (uri:string) => await getBase64Image(uri))
  );
   // Crea una nueva versión del objeto reporte con las fotos convertidas
  const reporteConFotos = {
    ...reporte,
    fotos: fotosBase64,
  };

  const html = templaitPDF(reporteConFotos);

  const { uri } = await Print.printToFileAsync({ html });
  console.log("PDF generado en:", uri);

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri);
  } else {
    alert("PDF guardado en: " + uri);
  }
};
