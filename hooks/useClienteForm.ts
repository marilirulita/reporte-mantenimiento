import { addCliente, buscarClientesPorNombre } from "@/db/clientes.repo";
import { addEquipo, getEquiposByClienteId } from "@/db/equipos.repo";
import { Cliente, Equipo } from "@/models/Reporte";
import { useEffect, useState } from "react";

export function useClienteForm() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<Cliente[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);

  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const [equipo, setEquipo] = useState<Equipo>({
    id: 0,
    idCliente: 0,
    marca: "",
    modelo: "",
    numeroSerie: "",
    tipoEquipo: "",
    ubicacionEquipo: "",
  });

  // 🔍 Buscar clientes
  useEffect(() => {
    if (busqueda.trim().length < 2) {
      setResultados([]);
      return;
    }

    buscarClientesPorNombre(busqueda).then((data) =>
      setResultados(data as Cliente[])
    );
  }, [busqueda]);

  const cargarEquipos = async (clienteId?: number) => {
    if (!clienteId) return;
    const data = await getEquiposByClienteId(clienteId);
    setEquipos(data);
  };

  const saveCliente = async (): Promise<number> => {
    if (cliente.id) return cliente.id;
    const id = await addCliente(cliente);
    setCliente((prev) => ({ ...prev, id }));
    return id;
  };

  const saveEquipo = async (clienteId: number): Promise<number> => {
    if (equipo.id) return equipo.id;
    const id = await addEquipo(equipo, clienteId);
    setEquipo((prev) => ({ ...prev, id }));
    return id;
  };

  return {
    cliente,
    setCliente,
    equipo,
    setEquipo,
    busqueda,
    setBusqueda,
    resultados,
    equipos,
    setEquipos,
    cargarEquipos,
    saveCliente,
    saveEquipo,
  };
}
