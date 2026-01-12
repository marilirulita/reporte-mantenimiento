// context/ReporteContext.tsx
import { createContext, useContext, useState } from "react";
import { TabName } from "../types/navigation";

interface ReporteData {
  activeTab: TabName;
  cliente: any;
  tecnico: any;
  fotos: string[];
  firma: string | null;
}

interface ReporteContextType {
  reporte: ReporteData;
  setReporte: React.Dispatch<React.SetStateAction<ReporteData>>;
  loadingPdf: boolean; 
  setLoadingPdf: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReporteContext = createContext<ReporteContextType | null>(null);

export const initialReporte: ReporteData = {
  activeTab: "cliente",
  cliente: {},
  tecnico: {},
  fotos: [],
  firma: null,
};

export const ReporteProvider = ({ children }: { children: React.ReactNode }) => {
  const [reporte, setReporte] = useState<ReporteData>(initialReporte);
  const [loadingPdf, setLoadingPdf] = useState(false); 
  return (
    <ReporteContext.Provider value={{ reporte, setReporte, loadingPdf, setLoadingPdf }}>
      {children}
    </ReporteContext.Provider>
  );
};

export const useReporte = () => {
  const context = useContext(ReporteContext);
  if (!context) {
    throw new Error("useReporte debe usarse dentro de un ReporteProvider");
  }
  return context;
};
