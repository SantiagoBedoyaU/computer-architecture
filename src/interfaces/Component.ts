export type PCComponent =
  | "PC"
  | "MAR"
  | "MBR"
  | "UC"
  | "AB" // BUS DE DIRECCIONES
  | "DB" // BUS DE DATOS
  | "CB" // BUS DE CONTROL
  | "AL" // Registro AL
  | "BL" // Registro BL
  | "CL" // Registro CL
  | "DL" // Registro DL
  | "ALU"
  | "PSW"
  | "PM" // PROGRAM MEMORY
  | "DM" // DATA MEMORY
  | "IR";
