import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import BotonFinalizar from "@/components/BotonFinalizar";
import { Alert } from "react-native";

// Mocks
jest.mock("@/context/ReporteContext", () => ({
  useReporte: jest.fn(),
}));

jest.mock("@/utils/generarPDF", () => ({
  generarPDF: jest.fn(() => Promise.resolve("file://test.pdf")),
}));

jest.mock("@/db/databaseActions", () => ({
  addReporte: jest.fn(() => Promise.resolve()),
}));

jest.spyOn(Alert, "alert");

const mockReporteBase = {
  firma: "firmaBase64",
  cliente: {
    cliente: { id: 1 },
    equipo: { id: 2 },
  },
  tecnico: {
    fechaServicio: "2024-01-01",
    nombreTecnico: "Juan",
    estadoEquipo: "OK",
    tipoRefrigerante: "R134",
    presion: "10",
    temperaturaAmbiente: "20",
    temperaturaEquipo: "5",
    voltaje: "220",
    amperaje: "5",
    trabajoRealizado: "Mantenimiento",
    observaciones: "Ninguna",
    observacionesAdicionales: "Todo bien",
  },
  fotos: ["foto1"],
};

describe("BotonFinalizar", () => {
  const useReporteMock = require("@/context/ReporteContext").useReporte;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders button text", () => {
    useReporteMock.mockReturnValue({ reporte: mockReporteBase });

    const { getByText } = render(<BotonFinalizar />);
    expect(getByText("Finalizar")).toBeTruthy();
  });

  test("shows alert if firma is missing", async () => {
    useReporteMock.mockReturnValue({
      reporte: { ...mockReporteBase, firma: null },
    });

    const { getByText } = render(<BotonFinalizar />);
    fireEvent.press(getByText("Finalizar"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Requisito Firma",
      "Nesesita agregar una firma"
    );
  });

  test("generates PDF and saves report when valid", async () => {
    useReporteMock.mockReturnValue({ reporte: mockReporteBase });

    const { getByText } = render(<BotonFinalizar />);
    fireEvent.press(getByText("Finalizar"));

    await waitFor(() => {
      expect(require("@/utils/generarPDF").generarPDF).toHaveBeenCalled();
      expect(require("@/db/databaseActions").addReporte).toHaveBeenCalled();
    });
  });
});
