import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomInput from "../components/ui/custom-input";

describe("CustomInput", () => {
  test("renders placeholder correctly", () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        placeholder="Nombre"
        value=""
        setValue={jest.fn()}
      />
    );

    expect(getByPlaceholderText("Nombre")).toBeTruthy();
  });

  test("shows initial value", () => {
    const { getByDisplayValue } = render(
      <CustomInput
        placeholder="Nombre"
        value="Juan"
        setValue={jest.fn()}
      />
    );

    expect(getByDisplayValue("Juan")).toBeTruthy();
  });

  test("calls setValue when text changes", () => {
    const setValueMock = jest.fn();

    const { getByPlaceholderText } = render(
      <CustomInput
        placeholder="Correo"
        value=""
        setValue={setValueMock}
        keyboardType="email-address"
      />
    );

    const input = getByPlaceholderText("Correo");
    fireEvent.changeText(input, "test@email.com");

    expect(setValueMock).toHaveBeenCalledWith("test@email.com");
  });

  test("handles focus and blur events", () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        placeholder="Teléfono"
        value=""
        setValue={jest.fn()}
      />
    );

    const input = getByPlaceholderText("Teléfono");

    fireEvent(input, "focus");
    fireEvent(input, "blur");

    // Si no truena, el estado y animaciones están bien manejadas
    expect(input).toBeTruthy();
  });

  test("supports multiline input", () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        placeholder="Comentarios"
        value=""
        setValue={jest.fn()}
        multiline
      />
    );

    const input = getByPlaceholderText("Comentarios");
    expect(input.props.multiline).toBe(true);
  });
});
