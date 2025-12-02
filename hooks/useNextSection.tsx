import { useReporte } from "../context/ReporteContext"

export const useNextSection = (nextScreenName: string) => {
  const { setReporte } = useReporte();

  const handleNext = (sectionKey: string, sectionData: any) => {
    // Guardar datos de la sección actual
    setReporte((prev) => ({
      ...prev,
      [sectionKey]: sectionData,
      activeTab: nextScreenName,
    }));
  };

  return { handleNext };
};
