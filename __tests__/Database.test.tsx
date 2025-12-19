import { createTables, db } from "../db/database";

describe("Database schema", () => {
  test("creates tables without crashing", async () => {
    await expect(createTables()).resolves.not.toThrow();
  });
});

test("clientes table exists", async () => {
  const result = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='clientes';"
  );
  expect(result.length).toBe(1);
});
