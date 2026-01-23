import * as FileSystem from "expo-file-system/legacy";
import getBase64Image from "../utils/getBase64Image";

jest.mock("expo-file-system/legacy", () => ({
  readAsStringAsync: jest.fn(),
}));

describe("getBase64Image", () => {
  it("convierte una imagen jpg a base64 con mime correcto", async () => {
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValue("FAKE_BASE64");

    const result = await getBase64Image("file:///test.jpg");

    expect(result).toBe("data:image/jpeg;base64,FAKE_BASE64");
  });

  it("detecta png correctamente", async () => {
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValue("PNG_BASE64");

    const result = await getBase64Image("file:///test.png");

    expect(result).toBe("data:image/png;base64,PNG_BASE64");
  });
});
