export function createContext({ req }: any) {
  // Aquí puedes realizar cualquier lógica para configurar el contexto
  return {
    headers: req.headers,
    // Otros campos del contexto si es necesario
  };
}
