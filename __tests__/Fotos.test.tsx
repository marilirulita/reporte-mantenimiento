import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Fotos from "../components/FotosScreen/fotos";
import { Alert, Text } from "react-native";

/* ---------------- MOCKS ---------------- */

// Mock Botton
jest.mock("../components/ui/button", () => ({
  Botton: ({ children, onPress }: any) => (
    <Text onPress={onPress}>{children}</Text>
  ),
}));

// Mock useNextSection
const mockHandleNext = jest.fn();
jest.mock("../hooks/useNextSection", () => ({
  useNextSection: () => ({
    handleNext: mockHandleNext,
  }),
}));

// Mock ReporteContext
const mockSetReporte = jest.fn();
jest.mock("../context/ReporteContext", () => ({
  useReporte: () => ({
    reporte: { activeTab: "fotos" },
    setReporte: mockSetReporte,
  }),
}));

// Mock Alert
jest.spyOn(Alert, "alert");

// Mock Expo ImagePicker
jest.mock("expo-image-picker", () => ({
  requestCameraPermissionsAsync: jest.fn(() =>
    Promise.resolve({ granted: true })
  ),
  requestMediaLibraryPermissionsAsync: jest.fn(() =>
    Promise.resolve({ granted: true })
  ),
  launchCameraAsync: jest.fn(() =>
    Promise.resolve({
      canceled: false,
      assets: [{ uri: "foto1.jpg" }],
    })
  ),
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({
      canceled: false,
      assets: [{ uri: "foto1.jpg" }],
    })
  ),
}));

describe("Fotos Section", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders empty state initially", () => {
    const { getByText } = render(<Fotos />);

    expect(getByText("No hay fotos agregadas")).toBeTruthy();
    expect(getByText("0 de 4 fotos agregadas")).toBeTruthy();
  });

  test("shows alert if trying to continue with less than 2 photos", () => {
    const { getByText } = render(<Fotos />);

    fireEvent.press(getByText("Siguiente"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Requisito Fotos",
      "Nesesita agregar al menos 2 fotos"
    );
  });

  test("adds a photo from camera", async () => {
    const { getByText, findByText } = render(<Fotos />);

    fireEvent.press(getByText("Tomar Foto"));

    expect(await findByText("1 de 4 fotos agregadas")).toBeTruthy();
  });

  test("prevents adding more than 4 photos", async () => {
    const { getByText } = render(<Fotos />);

    for (let i = 0; i < 5; i++) {
      fireEvent.press(getByText("Subir Imagen"));
    }

    expect(Alert.alert).toHaveBeenCalledWith(
      "Límite alcanzado",
      "Solo puedes agregar 4 fotos."
    );
  });

  test("calls handleNext when photos are valid", async () => {
    const { getByText, findByText } = render(<Fotos />);

    fireEvent.press(getByText("Tomar Foto"));
    fireEvent.press(getByText("Subir Imagen"));

    await findByText("2 de 4 fotos agregadas");

    fireEvent.press(getByText("Siguiente"));

    expect(mockHandleNext).toHaveBeenCalledWith(
      "fotos",
      expect.arrayContaining(["foto1.jpg"])
    );
  });

  test("goes back to tecnico when pressing Anterior", () => {
    const { getByText } = render(<Fotos />);

    fireEvent.press(getByText("Anterior"));

    expect(mockSetReporte).toHaveBeenCalledWith(
      expect.objectContaining({ activeTab: "tecnico" })
    );
  });
});
