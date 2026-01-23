import { useReporte } from "../context/ReporteContext";
import { TabName } from "../types/navigation";

export const useNextSection = (nextScreenName: TabName) => {
  const { setReporte } = useReporte();

  const handleNext = (sectionKey: TabName, sectionData: any) => {
    // Guardar datos de la sección actual
    setReporte((prev) => ({
      ...prev,
      [sectionKey]: sectionData,
      activeTab: nextScreenName,
    }));
  };

  return { handleNext };
};
