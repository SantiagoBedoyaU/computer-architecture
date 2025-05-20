// CODOPS
export enum CODOPS {
  START = "00000000",
  MOV = "00000001",
  STORE = "00000010",
  LOAD = "00000011",
  ADD = "00000100",
  DEC = "00000101",
  MUL = "00000110",
  DIV = "00000111",
  JMP = "00001001",
  JNZ = "00001010",
  JZ = "00001011",
  MALUMA = "00001100",
}

// Instrucciones que tiene la UC para enviar al bus de control
export const InstruccionesControl = {
  GetInstruction: 0,
  GetDatum: 1,
  WriteMemory: 2,
};
