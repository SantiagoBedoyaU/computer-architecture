export type Cycles = "FI" | "DI" | "CO" | "FO" | "EI" | "WO" | "INTERRUPTION";

export const cycleBgColors: Record<Cycles, string> = {
  FI: "bg-blue-500", // Azul
  DI: "bg-green-500", // Verde
  CO: "bg-yellow-500", // Amarillo
  FO: "bg-teal-500", // Turquesa
  EI: "bg-purple-500", // Morado
  WO: "bg-orange-500", // Naranja
  INTERRUPTION: "bg-red-500", // Rojo
};

export const cycleStrokeColors: Record<Cycles, string> = {
  FI: "rgb(59, 130, 246)", // Azul (text-blue-500)
  DI: "rgb(34, 197, 94)", // Verde (text-green-500)
  CO: "rgb(234, 179, 8)", // Amarillo (text-yellow-500)
  FO: "rgb(20, 184, 166)", // Turquesa (text-teal-500)
  EI: "rgb(168, 85, 247)", // Morado (text-purple-500)
  WO: "rgb(249, 115, 22)", // Naranja (text-orange-500)
  INTERRUPTION: "rgb(239, 68, 68)", // Rojo (text-red-500)
};
