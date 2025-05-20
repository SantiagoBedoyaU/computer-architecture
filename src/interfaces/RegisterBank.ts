export type Register = "AL" | "BL" | "CL" | "DL";

export const RegisterAddress: Record<Register, string> = {
  AL: "00000000",
  BL: "00000001",
  CL: "00000010",
  DL: "00000011",
};
