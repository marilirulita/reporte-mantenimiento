// hooks/useHistorial.ts
export const filtrarReportes = (reportes: any, busqueda: any) => {
  if (busqueda.trim().length <= 1) return reportes;

  const query = busqueda.toLowerCase();
  return reportes.filter((r: any) =>
    [r.nombre, r.numeroSerie, r.tecnico, r.tipoEquipo, r.fecha]
      .some(v => v?.toLowerCase?.().includes(query))
  );
};
