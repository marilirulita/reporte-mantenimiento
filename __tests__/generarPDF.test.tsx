import { generarPDF, normalizeFotos } from "../utils/generarPDF";

jest.mock("expo-print", () => ({
  printToFileAsync: jest.fn(() =>
    Promise.resolve({ uri: "file://test.pdf" })
  ),
}));

jest.mock("expo-sharing", () => ({
  isAvailableAsync: jest.fn(() => Promise.resolve(false)),
  shareAsync: jest.fn(),
}));

jest.mock("./getBase64Image", () =>
  jest.fn(() => Promise.resolve("base64-image"))
);

describe("normalizeFotos", () => {
  it("devuelve array si ya es array", () => {
    expect(normalizeFotos(["a", "b"])).toEqual(["a", "b"]);
  });

  it("parsea JSON string válido", () => {
    expect(normalizeFotos('["a","b"]')).toEqual(["a", "b"]);
  });

  it("devuelve [] si JSON es inválido", () => {
    expect(normalizeFotos("no-json")).toEqual([]);
  });

  it("devuelve [] si fotos es null", () => {
    expect(normalizeFotos(null)).toEqual([]);
  });

  it("genera un PDF y retorna el uri", async () => {
  const reporteMock: any = {
    fotos: ["file://foto1.jpg"],
  };

  const uri = await generarPDF(reporteMock, false);

  expect(uri).toBe("file://test.pdf");
});

});
