import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import TecnicoScreen from "../components/TecnicoScreen/tecnico";

// Mock CustomInput
jest.mock("../components/ui/custom-input", () => {
  const React = require("react");
  const { TextInput } = require("react-native");

  const MockInput = ({ value, setValue, placeholder }: any) => (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      testID={placeholder}
    />
  );

  MockInput.displayName = "MockCustomInput";
  return MockInput;
});

// Mock Botton
jest.mock("../components/ui/button", () => {
  const { TouchableOpacity } = require("react-native");
  return {
    Botton: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
    ),
  };
});

// Mock Picker
jest.mock("@react-native-picker/picker", () => {
  const { View } = require("react-native");
  return {
    Picker: ({ children }: any) => <View>{children}</View>,
    PickerItem: () => null,
  };
});

// Mock hooks
const mockHandleNext = jest.fn();
jest.mock("../hooks/useNextSection", () => ({
  useNextSection: () => ({
    handleNext: mockHandleNext,
  }),
}));

const mockSetReporte = jest.fn();
jest.mock("../context/ReporteContext", () => ({
  useReporte: () => ({
    reporte: { activeTab: "tecnico" },
    setReporte: mockSetReporte,
  }),
}));

// Mock Alert
jest.spyOn(require("react-native").Alert, "alert");

describe("TecnicoScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders main sections", () => {
    const { getByText } = render(<TecnicoScreen />);

    expect(getByText("Información del Servicio")).toBeTruthy();
    expect(getByText("Mediciones Técnicas")).toBeTruthy();
    expect(getByText("Detalles del Servicio")).toBeTruthy();
  });

  test("shows alert if required fields are missing", () => {
    const { getByText } = render(<TecnicoScreen />);

    fireEvent.press(getByText("Siguiente"));

    expect(require("react-native").Alert.alert).toHaveBeenCalledWith(
      "Campos requeridos",
      expect.any(String)
    );

    expect(mockHandleNext).not.toHaveBeenCalled();
  });

  test("calls handleNext when required fields are filled", () => {
    const { getByPlaceholderText, getByText } = render(<TecnicoScreen />);

    fireEvent.changeText(
      getByPlaceholderText("Carlos López"),
      "Juan Técnico"
    );

    fireEvent.changeText(
      getByPlaceholderText("Descripción detallada del trabajo realizado..."),
      "Mantenimiento general"
    );

    // Simulamos selección de estado del equipo
    mockHandleNext.mockClear();

    fireEvent.press(getByText("Siguiente"));

    expect(mockHandleNext).toHaveBeenCalledWith(
      "tecnico",
      expect.objectContaining({
        nombreTecnico: "Juan Técnico",
        trabajoRealizado: "Mantenimiento general",
      })
    );
  });

  test("goes back to cliente when pressing Anterior", () => {
    const { getByText } = render(<TecnicoScreen />);

    fireEvent.press(getByText("Anterior"));

    expect(mockSetReporte).toHaveBeenCalledWith(
      expect.objectContaining({ activeTab: "cliente" })
    );
  });
});
