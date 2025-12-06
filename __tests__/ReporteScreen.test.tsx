import React, { ReactNode, CSSProperties } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Reporte from "../app/reporte";

// 1. Mock de LinearGradient
type LinearGradientProps = {
  children?: ReactNode;
  style?: CSSProperties | any; // React Native usa "ViewStyle", pero en tests puedes dejarlo flexible
};

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children, style }: LinearGradientProps) => (
    <div data-testid="mock-linear-gradient" style={style}>
      {children}
    </div>
  ),
}));
// Mocks de componentes hijos para no cargar lógica extra
jest.mock("../components/cliente", () => {
  const { Text } = require("react-native");
  const MockCliente = () => <Text>ClienteScreen</Text>;
  MockCliente.displayName = "MockCliente";
  return MockCliente;
});

jest.mock("../components/equipo", () => {
  const { Text } = require("react-native");
  const MockEquipo = () => <Text>EquipoScreen</Text>;
  MockEquipo.displayName = "MockEquipo";
  return MockEquipo;
});

jest.mock("../components/fotos", () => {
  const { Text } = require("react-native");
  const MockFotos = () => <Text>FotosScreen</Text>;
  MockFotos.displayName = "MockFotos";
  return MockFotos;
});

jest.mock("../components/firma", () => {
  const { Text } = require("react-native");
  const MockFirma = () => <Text>FirmaScreen</Text>;
  MockFirma.displayName = "MockFirma";
  return MockFirma;
});

// Mock de useReporte
const mockSetReporte = jest.fn();

const mockUseReporte = jest.fn().mockReturnValue({
  reporte: { activeTab: "cliente" },
  setReporte: mockSetReporte,
});

jest.mock("@/context/ReporteContext", () => ({
  useReporte: () => mockUseReporte(),
}));

describe("NuevoReporteScreen", () => {
  afterEach(() => {
    mockSetReporte.mockClear();
  });

  test("renders header text", () => {
    const { getByText } = render(<Reporte />);

    expect(getByText("Reporte de Mantenimiento")).toBeTruthy();
    expect(getByText("Servicio de Refrigeración")).toBeTruthy();
  });

  test("renders all tab buttons", () => {
    const { getByText } = render(<Reporte />);

    expect(getByText("cliente")).toBeTruthy();
    expect(getByText("tecnico")).toBeTruthy();
    expect(getByText("fotos")).toBeTruthy();
    expect(getByText("firma")).toBeTruthy();
  });

  test("renders Cliente component when activeTab is cliente", () => {
    const { getByText, queryByText } = render(<Reporte />);

    expect(getByText("ClienteScreen")).toBeTruthy();
    // NO debe mostrar los otros
    expect(queryByText("EquipoScreen")).toBeNull();
  });

  test("changes tab when button is pressed", () => {
    const { getByText } = render(<Reporte />);

    const tecnicoTab = getByText("tecnico");
    fireEvent.press(tecnicoTab);

    expect(mockSetReporte).toHaveBeenCalled();
    const callArg = mockSetReporte.mock.calls[0][0];

    // Si setReporte recibe un objeto directamente
    if (typeof callArg === "object") {
      expect(callArg).toEqual({ activeTab: "tecnico" });
    }

    // Si setReporte recibe una función estilo setState(prev => ...)
    if (typeof callArg === "function") {
      const result = callArg({ activeTab: "cliente" });
      expect(result).toEqual({ activeTab: "tecnico" });
    }
  });

  test("renders correct component when tab changes", () => {
    // Simulamos que activeTab cambia dinámicamente
    mockUseReporte.mockReturnValue({
      reporte: { activeTab: "fotos" },
      setReporte: mockSetReporte,
    });

    const { getByText, queryByText } = render(<Reporte />);

    expect(getByText("FotosScreen")).toBeTruthy();
    expect(queryByText("ClienteScreen")).toBeNull();
  });

  test("renders Equipo component when tab changes", () => {
    // Simulamos que activeTab cambia dinámicamente
    mockUseReporte.mockReturnValue({
      reporte: { activeTab: "tecnico" },
      setReporte: mockSetReporte,
    });

    const { getByText, queryByText } = render(<Reporte />);

    expect(getByText("EquipoScreen")).toBeTruthy();
    expect(queryByText("ClienteScreen")).toBeNull();
  });

  test("renders Firma component when tab changes", () => {
    // Simulamos que activeTab cambia dinámicamente
    mockUseReporte.mockReturnValue({
      reporte: { activeTab: "firma" },
      setReporte: mockSetReporte,
    });

    const { getByText, queryByText } = render(<Reporte />);

    expect(getByText("FirmaScreen")).toBeTruthy();
    expect(queryByText("ClienteScreen")).toBeNull();
  });
});
