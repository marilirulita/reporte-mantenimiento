import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TabButton from "../components/ui/TabButton";
import { Text } from "react-native";

// Mock del ícono
const MockIcon = () => <Text>Icon</Text>;

describe("TabButton", () => {
  test("renders tab name", () => {
    const { getByText } = render(
      <TabButton
        tab={{ name: "cliente", icon: MockIcon }}
        active={false}
        onPress={jest.fn()}
      />
    );

    expect(getByText("cliente")).toBeTruthy();
  });

  test("calls onPress when pressed", () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <TabButton
        tab={{ name: "tecnico", icon: MockIcon }}
        active={false}
        onPress={onPressMock}
      />
    );

    fireEvent.press(getByText("tecnico"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test("renders active state correctly", () => {
    const { getByText } = render(
      <TabButton
        tab={{ name: "fotos", icon: MockIcon }}
        active={true}
        onPress={jest.fn()}
      />
    );

    expect(getByText("fotos")).toBeTruthy();
  });
});
