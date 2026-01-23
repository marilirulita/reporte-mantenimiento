import React from "react";
import { Text, Animated } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Botton } from "../components/ui/button";

// Mock de Animated.spring para evitar errores en Jest
jest.spyOn(Animated, "spring").mockImplementation(() => {
  return {
    start: jest.fn(),
  } as any;
});

describe("Botton component", () => {
  test("renders children correctly", () => {
    const { getByText } = render(
      <Botton classname={{}}>
        <Text>Guardar</Text>
      </Botton>
    );

    expect(getByText("Guardar")).toBeTruthy();
  });

  test("calls onPress when pressed", () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <Botton testID="botton-touchable" onPress={onPressMock}>
        <Text>Guardar</Text>
      </Botton>
    );

    //fireEvent.press(getByText("Enviar"));
    fireEvent.press(getByTestId("botton-touchable"));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test("triggers press in animation", () => {
    const { getByText } = render(
      <Botton classname={{}}>
        <Text>Presionar</Text>
      </Botton>
    );

    fireEvent(getByText("Presionar"), "pressIn");

    expect(Animated.spring).toHaveBeenCalled();
  });

  test("triggers press out animation", () => {
    const { getByText } = render(
      <Botton classname={{}}>
        <Text>Presionar</Text>
      </Botton>
    );

    fireEvent(getByText("Presionar"), "pressOut");

    expect(Animated.spring).toHaveBeenCalled();
  });
});
