import { db } from "../db/database";
import { addCliente } from "../db/reportes.repo";

jest.mock("expo-sqlite");
jest.mock("../db/database", () => {
  const actualDatabase = jest.requireActual("../db/database");
  return {
    db: {
      ...actualDatabase.db,
      runAsync: jest.fn(),
      getAllAsync: jest.fn(),
    },
  };
});

describe("Database Actions - Clientes", () => {
  const mockCliente = {
    id: 1,
    nombre: "Cliente Test",
    direccion: "Direccion Test",
    telefono: "123456789",
    email: "cliente@test.com",
  };

  it("inserta un cliente correctamente", async () => {
    await addCliente(mockCliente);
    expect(db.runAsync).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO clientes"),
      expect.any(Array)
    );
  });
});
