import { useReporte } from "../context/ReporteContext"

export const useNextSection = (nextScreenName: string) => {
  const { reporte, setReporte } = useReporte();

  const handleNext = (sectionKey: string, sectionData: any) => {
    // Guardar datos de la sección actual
    setReporte((prev) => ({
      ...prev,
      [sectionKey]: sectionData,
    }));

    // Ir a la siguiente sección
    console.log(reporte)
    console.log(nextScreenName)
  };

  return { handleNext };
};
