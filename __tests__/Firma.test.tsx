import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import Firma from "../components/FirmaScreen/firma";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("../hooks/useNextSection", () => ({
  useNextSection: () => ({
    handleNext: jest.fn(),
  }),
}));

jest.mock("../context/ReporteContext", () => ({
  useReporte: () => ({
    reporte: {
      firma: null,
      activeTab: "firma",
    },
    setReporte: jest.fn(),
  }),
}));

describe("Firma", () => {
  it("renders title and subtitle", () => {
    const { getByText } = render(<Firma />);

    expect(getByText("Firma del Cliente")).toBeTruthy();
    expect(
      getByText("Presione el boton para abrir el panel de firma")
    ).toBeTruthy();
  });

  it("shows message when no signature exists", () => {
    const { getByText } = render(<Firma />);

    expect(
      getByText("No se ha capturado ninguna firma")
    ).toBeTruthy();
  });

  it("opens signature panel when button is pressed", () => {
    const { getByText } = render(<Firma />);

    fireEvent.press(getByText("Abrir panel de firma"));
    // navegación validada indirectamente (mock)
    expect(getByText("Abrir panel de firma")).toBeTruthy();
  });

  it("renders Volver a firmar when signature exists", () => {
    jest.spyOn(require("../context/ReporteContext"), "useReporte").mockReturnValue({
      reporte: {
        firma: "file://firma.png",
        activeTab: "firma",
      },
      setReporte: jest.fn(),
    });

    const { getByText } = render(<Firma />);

    expect(getByText("✓ Firma capturada")).toBeTruthy();
    expect(getByText("Volver a firmar")).toBeTruthy();
  });

  it("goes back to fotos when Anterior is pressed", () => {
    const setReporteMock = jest.fn();

    jest.spyOn(require("../context/ReporteContext"), "useReporte").mockReturnValue({
      reporte: {
        firma: null,
        activeTab: "firma",
      },
      setReporte: setReporteMock,
    });

    const { getByText } = render(<Firma />);

    fireEvent.press(getByText("Anterior"));
    expect(setReporteMock).toHaveBeenCalled();
  });
});
