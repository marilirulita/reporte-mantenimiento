import { renderHook, act } from "@testing-library/react-native";
import { ReporteProvider, useReporte } from "../context/ReporteContext";
import { useNextSection } from "../hooks/useNextSection";

const wrapper = ({ children }: any) => (
  <ReporteProvider>{children}</ReporteProvider>
);

describe("useNextSection", () => {
  it("actualiza la sección y cambia el activeTab", () => {
    const { result } = renderHook(() => {
      const next = useNextSection("fotos");
      const reporte = useReporte();
      return { ...next, ...reporte };
    }, { wrapper });

    act(() => {
      result.current.handleNext("cliente", { nombre: "Juan" });
    });

    expect(result.current.reporte.cliente).toEqual({ nombre: "Juan" });
    expect(result.current.reporte.activeTab).toBe("fotos");
  });
});
