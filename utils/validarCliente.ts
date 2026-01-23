// validators/clienteValidators.ts
import { Cliente, Equipo } from "@/models/Reporte";

export function validateCliente(cliente: Cliente): string | null {
  if (!cliente.nombre.trim() || !cliente.telefono?.trim() || !cliente.direccion.trim()) {
    return "Completa nombre, teléfono y dirección.";
  }
  return null;
}

export function validateEquipo(equipo: Equipo): string | null {
  if (!equipo.marca.trim() || !equipo.modelo.trim() || !equipo.tipoEquipo.trim()) {
    return "Completa marca, modelo y tipo de equipo.";
  }
  return null;
}
