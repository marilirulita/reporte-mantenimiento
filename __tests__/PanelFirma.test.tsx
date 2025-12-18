import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PanelFirma from "../app/PanelFirma";
import { Text } from "react-native";

// Mock de react-navigation
const mockGoBack = jest.fn();
const mockOnSave = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: {
      onSave: mockOnSave,
    },
  }),
}));

// Mock del componente Signature
const clearMock = jest.fn();
const readMock = jest.fn();
const mockClearSignature = jest.fn();
const mockReadSignature = jest.fn();

jest.mock("react-native-signature-canvas", () => {
  const React = require("react");
  const { Text } = require('react-native');

   const MockSignature = React.forwardRef((props: any, ref: any) => {
    // Permite acceder a métodos desde el test
    React.useImperativeHandle(ref, () => ({
      clearSignature: mockClearSignature,
      readSignature: mockReadSignature,
    }));

    return <Text testID="mock-signature">SignaturePad</Text>;
  });

  MockSignature.displayName = "MockSignatureCanvas";

  return MockSignature;
});

describe("PanelFirma", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the text", () => {
    const { getByText } = render(<PanelFirma />);

    expect(
      getByText(
        "Solicite al cliente que firme en el recuadro con su dedo o stylus"
      )
    ).toBeTruthy();
    expect(getByText("SignaturePad")).toBeTruthy();
  });

  test("should call onSave and goBack when signature is saved", () => {
    const { UNSAFE_getAllByType } = render(<PanelFirma />);

    // obtener acceso al Signature mock
    const signaturePad = UNSAFE_getAllByType(Text)[0];

    // Simular onOK callback
    signaturePad.props.onOK?.("FAKE_SIGNATURE");

    expect(mockOnSave).toHaveBeenCalledWith("FAKE_SIGNATURE");
    expect(mockGoBack).toHaveBeenCalled();
  });

  test("should clear the signature when pressing Limpiar", () => {
    const { getByText } = render(<PanelFirma />);

    const clearButton = getByText("Limpiar");
    fireEvent.press(clearButton);

    expect(mockClearSignature).toHaveBeenCalled();
  });

  test("should read signature when pressing Guardar", () => {
    const { getByText } = render(<PanelFirma />);

    const saveButton = getByText("Guardar");
    fireEvent.press(saveButton);

    expect(mockReadSignature).toHaveBeenCalled();
  });
});
