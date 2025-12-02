import React, { ReactNode, CSSProperties } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PantallaInicio from "../app/index";

// --- MOCKS ---

// 1. Mock de expo-router
// Creamos una función espía (jest.fn) para vigilar cuando se llame a 'push'
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// 2. Mock de expo-linear-gradient
// Reemplazamos el gradiente por una View simple para evitar errores nativos
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

// Mock de LinearGradient (evita errores al renderizar)
/*jest.mock("expo-linear-gradient", () => {
  return {
    LinearGradient: (props: any) => <div {...props} />,
  };
});*/

// Mock de íconos para evitar errores
jest.mock("lucide-react-native", () => {
  return {
    Snowflake: () => <div />,
    ClipboardList: () => <div />,
    History: () => <div />,
  };
});

// --- TESTS ---

describe("<PantallaInicio />", () => {
  // Antes de cada test, limpiamos el contador de las funciones espía
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renderiza correctamente los textos principales", () => {
    const { getByText } = render(<PantallaInicio />);

    // Verificamos que el título y subtítulo existen en la pantalla
    expect(getByText("App de Mantenimiento")).toBeTruthy();
    expect(getByText("Sistema de Reportes de Mantenimiento")).toBeTruthy();
  });

  it("muestra los botones de navegación", () => {
    const { getByText } = render(<PantallaInicio />);

    expect(getByText("Nuevo Reporte")).toBeTruthy();
    expect(getByText("Historial")).toBeTruthy();
  });

  it('navega a la pantalla de reporte al presionar "Nuevo Reporte"', () => {
    const { getByText } = render(<PantallaInicio />);

    // Buscacamos el botón por su texto
    const botonReporte = getByText("Nuevo Reporte");

    // Simulamos el evento de presionar (press)
    fireEvent.press(botonReporte);

    // Verificamos que router.push haya sido llamado con la ruta correcta
    expect(mockPush).toHaveBeenCalledWith("./reporte");
  });

  it('navega al historial al presionar "Historial"', () => {
    const { getByText } = render(<PantallaInicio />);

    const botonHistorial = getByText("Historial");

    fireEvent.press(botonHistorial);

    expect(mockPush).toHaveBeenCalledWith("./historial");
  });

  it("muestra la versión correcta de la app", () => {
    const { getByText } = render(<PantallaInicio />);

    // Usamos una expresión regular para buscar parte del texto si es muy largo
    expect(getByText(/Versión 1.0/i)).toBeTruthy();
  });

  it("coincide con el snapshot", () => {
    const tree = render(<PantallaInicio />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
