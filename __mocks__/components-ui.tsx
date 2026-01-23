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