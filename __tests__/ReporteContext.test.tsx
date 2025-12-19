import { renderHook, act } from "@testing-library/react-native";
import { ReporteProvider, useReporte, initialReporte } from "@/context/ReporteContext";

describe("ReporteContext", () => {
  test("provides initial reporte state", () => {
    const { result } = renderHook(() => useReporte(), {
      wrapper: ReporteProvider,
    });

    expect(result.current.reporte).toEqual(initialReporte);
  });

  test("updates reporte state", () => {
    const { result } = renderHook(() => useReporte(), {
      wrapper: ReporteProvider,
    });

    act(() => {
      result.current.setReporte((prev) => ({
        ...prev,
        activeTab: "fotos",
      }));
    });

    expect(result.current.reporte.activeTab).toBe("fotos");
  });

  test("throws error if used outside provider", () => {
    expect(() => renderHook(() => useReporte())).toThrow(
      "useReporte debe usarse dentro de un ReporteProvider"
    );
  });
});
