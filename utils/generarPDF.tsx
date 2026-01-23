import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { templatePDF } from "./templaitPDF";
import { mapDbReporteToPdf } from "./mapDbReporteToPdf";
import { mapReporteToPdf } from "./mapReporteToPdf";
import getBase64Image from "./getBase64Image";

export const generarPDF = async (reporte: any, download: boolean) => {
  // Aseguramos que fotos siempre sea un array
  const fotosArray = normalizeFotos(reporte.fotos);

  // Convierte todas las fotos del reporte a Base64
  const fotosBase64 = await Promise.all(
    fotosArray.map(async (uri:string) => await getBase64Image(uri))
  );
   // Crea una nueva versión del objeto reporte con las fotos convertidas
  const reporteConFotos = {
    ...reporte,
    fotos: fotosBase64,
  };

  const html = download ? templatePDF(mapDbReporteToPdf(reporteConFotos)) : templatePDF(mapReporteToPdf(reporteConFotos));

  const { uri } = await Print.printToFileAsync({ html });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri);
  }

  return uri;
};

export const normalizeFotos = (fotos: unknown): string[] => {
  if (Array.isArray(fotos)) return fotos;

  if (typeof fotos === "string") {
    try {
      const parsed = JSON.parse(fotos);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};
