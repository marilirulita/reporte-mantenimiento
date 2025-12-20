import { addCliente, buscarClientesPorNombre } from "@/db/clientes.repo";
import { addEquipo } from "@/db/equipos.repo";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";
import ClienteScreen from "../components/ClienteScreen/cliente";

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

jest.mock("../components/ui/button", () => {
  const React = require("react");
  const { TouchableOpacity, Text } = require("react-native");

  return {
    Botton: ({ children, onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
  };
});

const mockHandleNext = jest.fn();

jest.mock("../hooks/useNextSection", () => ({
  useNextSection: () => ({
    handleNext: mockHandleNext,
  }),
}));

jest.mock("@/db/databaseActions", () => ({
  addCliente: jest.fn(),
  addEquipo: jest.fn(),
  buscarClientesPorNombre: jest.fn(),
  getEquiposByClienteId: jest.fn(),
}));


jest.spyOn(Alert, "alert");

describe("ClienteScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders main sections", () => {
    const { getByText } = render(<ClienteScreen />);

    expect(getByText("Datos del Cliente")).toBeTruthy();
    expect(getByText("Datos del Equipo")).toBeTruthy();
  });

  test("searches clients when typing name", async () => {
    (buscarClientesPorNombre as jest.Mock).mockResolvedValue([
      { id: 1, nombre: "Juan Perez", direccion: "Calle 1" },
    ]);

    const { getByPlaceholderText, getByText } = render(<ClienteScreen />);

    fireEvent.changeText(
      getByPlaceholderText("Juan Pérez"),
      "Juan"
    );

    await waitFor(() => {
      expect(getByText("Juan Perez")).toBeTruthy();
    });
  });

  test("shows alert if required client fields are missing", async () => {
    const { getByText } = render(<ClienteScreen />);

    fireEvent.press(getByText("Siguiente"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Cliente",
        expect.any(String)
      );
    });
  });

  test("creates new client and equipment and goes next", async () => {
    (addCliente as jest.Mock).mockResolvedValue(10);
    (addEquipo as jest.Mock).mockResolvedValue(20);

    const { getByPlaceholderText, getByText } = render(<ClienteScreen />);

    fireEvent.changeText(getByPlaceholderText("Juan Pérez"), "Juan");
    fireEvent.changeText(getByPlaceholderText("555-123-4567"), "555");
    fireEvent.changeText(
      getByPlaceholderText("Calle Principal #123, Ciudad"),
      "Calle 1"
    );

    fireEvent.changeText(
      getByPlaceholderText("Samsung, LG, etc."),
      "LG"
    );
    fireEvent.changeText(
      getByPlaceholderText("ABC-123"),
      "XYZ"
    );
    fireEvent.changeText(
      getByPlaceholderText("Aire Acondicionado, Refrigerador, etc."),
      "Aire"
    );

    fireEvent.press(getByText("Siguiente"));

    await waitFor(() => {
      expect(addCliente).toHaveBeenCalled();
      expect(addEquipo).toHaveBeenCalled();
      expect(mockHandleNext).toHaveBeenCalledWith(
        "cliente",
        expect.objectContaining({
          cliente: expect.any(Object),
          equipo: expect.any(Object),
        })
      );
    });
  });
});
