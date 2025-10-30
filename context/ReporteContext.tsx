// context/ReporteContext.tsx
import { createContext, useContext, useState } from "react";

interface ReporteData {
  activeTab: string;
  cliente: any;
  tecnico: any;
  fotos: string[];
  firma: null;
}

interface ReporteContextType {
  reporte: ReporteData;
  setReporte: React.Dispatch<React.SetStateAction<ReporteData>>;
}

const ReporteContext = createContext<ReporteContextType | null>(null);

export const ReporteProvider = ({ children }: { children: React.ReactNode }) => {
  const [reporte, setReporte] = useState<ReporteData>({
    activeTab: "cliente",
    cliente: {},
    tecnico: {},
    fotos: [],
    firma: null,
  });

  return (
    <ReporteContext.Provider value={{ reporte, setReporte }}>
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
