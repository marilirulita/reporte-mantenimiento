import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HistorialScreen from "../app/historial";

// --- MOCK expo-router ---
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// --- MOCK expo-linear-gradient ---
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: any) => <>{children}</>,
}));

// --- MOCK base de datos ---
const mockGetReportes = jest.fn();
const mockDeleteReporte = jest.fn();

jest.mock("@/db/databaseActions", () => ({
  getReportesConCliente: () => mockGetReportes(),
  deleteReporte: (id: number) => mockDeleteReporte(id),
}));

// --- MOCK generarPDF ---
const mockGenerarPDF = jest.fn();
jest.mock("../utils/generarPDF", () => ({
  generarPDF: (...args: any) => mockGenerarPDF(...args),
}));

// --- MOCK alert ---
global.alert = jest.fn();

// --- MOCK íconos ---
jest.mock("lucide-react-native", () => {
  const MockIcon = () => null;
  return {
    Calendar: MockIcon,
    ClipboardList: MockIcon,
    Download: MockIcon,
    FileText: MockIcon,
    Search: MockIcon,
    Trash2: MockIcon,
    User: MockIcon,
  };
});

describe("HistorialScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra mensaje vacío si no hay reportes", async () => {
    mockGetReportes.mockResolvedValueOnce([]);

    const { getByText } = render(<HistorialScreen />);

    await waitFor(() => {
      expect(getByText("No hay reportes guardados")).toBeTruthy();
    });
  });

  test("carga y muestra reportes", async () => {
    mockGetReportes.mockResolvedValueOnce([
      {
        id: 1,
        nombre: "María",
        fecha: "2025-01-02",
        tecnico: "Luis",
        tipoEquipo: "Laptop",
        marca: "HP",
        modelo: "Pavilion",
      },
    ]);

    const { getByText } = render(<HistorialScreen />);

    await waitFor(() => {
      expect(getByText("María")).toBeTruthy();
      expect(getByText("Técnico: Luis")).toBeTruthy();
    });
  });

  test("filtra reportes por nombre", async () => {
    mockGetReportes.mockResolvedValueOnce([
      { id: 1, nombre: "Carlos", fecha: "2025-01-01" },
      { id: 2, nombre: "María", fecha: "2025-01-02" },
    ]);

    const { getByPlaceholderText, queryByText } = render(<HistorialScreen />);

    const searchInput = getByPlaceholderText(
      "Buscar por cliente, técnico, marca..."
    );

    await waitFor(() => {});

    fireEvent.changeText(searchInput, "mar");

    await waitFor(() => {
      expect(queryByText("María")).toBeTruthy();
      expect(queryByText("Carlos")).toBeNull();
    });
  });

  test("ejecuta generarPDF al presionar botón de descargar", async () => {
    mockGetReportes.mockResolvedValueOnce([
      { id: 10, nombre: "Reporte prueba", fecha: "2025-01-10" },
    ]);

    const { getByTestId } = render(<HistorialScreen />);

    await waitFor(() => {});

    const botonDescargar = getByTestId("btn-descargar-10");

    fireEvent.press(botonDescargar);

    await waitFor(() => {
      expect(mockGenerarPDF).toHaveBeenCalled();
    });
  });

  test("elimina un reporte", async () => {
    mockGetReportes.mockResolvedValue([
      {
        id: 5,
        nombre: "Cliente Test",
        fecha: "2025-01-01",
      },
    ]);

    const { getByTestId } = render(<HistorialScreen />);

    await waitFor(() => {});

    const botonEliminar = getByTestId("btn-eliminar-5");

    fireEvent.press(botonEliminar);

    await waitFor(() => {
      expect(mockDeleteReporte).toHaveBeenCalledWith(5);
    });
  });
});
