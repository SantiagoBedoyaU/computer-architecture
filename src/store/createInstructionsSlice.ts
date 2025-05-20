import { StateCreator } from "zustand";
import { CODOPS } from "../interfaces/CODOP";
import { PCComponent } from "../interfaces/Component";
import { Cycles } from "../interfaces/Cycles";
import { Register } from "../interfaces/RegisterBank";

export interface InstructionComp {
  codop: keyof typeof CODOPS;
  operand1: string;
  operand2: string;
}

export interface COMPUTER {
  ALU: { A: number; B: number; result: number };
  IR: InstructionComp;
  MAR: number;
  MBR: InstructionComp;
  PC: number;
  PSW: { nan: boolean; zero: boolean };
  UC: InstructionComp;
  RegisterBank: Record<Register, number>;
  AB: number;
  CB: number;
  DB: InstructionComp;
  currentComponent: PCComponent | string;
  currentCycle: Cycles;
  lastComponent: PCComponent | string;
  timeout: number;
}

// funciones y variables que se van a utilizar
export interface InstructionsSlice {
  COMPUTER: COMPUTER;
  setAddressBusValue: (newAddressBus: number) => void;
  setALUValue: (to: "A" | "B" | "result", newALU: number) => void;
  setComponents: (
    toComponent: PCComponent | string,
    fromComponent: PCComponent | string,
  ) => void;
  setControlBusValue: (newControlBus: number) => void;
  setCurrentCycle: (value: Cycles) => void;
  setDataBusValue: (newDataBus: InstructionComp) => void;
  setIRValue: (newIR: InstructionComp) => void;
  setMARValue: (newMAR: number) => void;
  setMBRValue: (newMBR: InstructionComp) => void;
  setPCValue: (newPC: number) => void;
  setPSWValue: (to: "nan" | "zero", newPSW: boolean) => void;
  setRegisterBankValue: (register: Register, value: number) => void;
  setTimeout: (value: number) => void;
  setUCValue: (newUC: InstructionComp) => void;
  resetCOMPUTER: () => void;
}

// valores iniciales de las variables
const initialInstructions: COMPUTER = {
  AB: 0,
  CB: 0,
  DB: {
    codop: "START",
    operand1: "",
    operand2: "",
  },
  RegisterBank: { AL: 0, BL: 0, CL: 0, DL: 0 },
  ALU: {
    A: 0,
    B: 0,
    result: 0,
  },
  IR: {
    codop: "START",
    operand1: "",
    operand2: "",
  },
  MAR: 0,
  MBR: {
    codop: "START",
    operand1: "",
    operand2: "",
  },
  PC: -1,
  PSW: {
    nan: false,
    zero: false,
  },
  UC: {
    codop: "START",
    operand1: "",
    operand2: "",
  },
  currentComponent: "",
  currentCycle: "FI",
  lastComponent: "",
  timeout: 1000,
};

const createInstructionsSlice: StateCreator<InstructionsSlice> = (set) => ({
  COMPUTER: initialInstructions,

  // Setear los componentes que se van a iluminar en ese momento
  setComponents: (toComponent, fromComponent) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        lastComponent: toComponent,
        currentComponent: fromComponent,
      },
    })),

  // Setear el valor del AddressBus
  setAddressBusValue: (newAddressBus) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        AB: newAddressBus,
      },
    })),

  // Setear el valor del ControlBus
  setControlBusValue: (newControlBus) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        CB: newControlBus,
      },
    })),

  // Setear el valor del DataBus
  setDataBusValue: (newDataBus) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        DB: newDataBus,
      },
    })),

  // Setear el valor del MAR
  setMARValue: (newMAR) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        MAR: newMAR,
      },
    })),

  // Setear el valor del MBR
  setMBRValue: (newMBR) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        MBR: newMBR,
      },
    })),

  // Setear el valor del IR
  setIRValue: (newIR) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        IR: newIR,
      },
    })),

  // Setear el valor del PC
  setPCValue: (newPC) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        PC: newPC,
      },
    })),

  // Setear el valor de la ALU
  setALUValue: (to, newALU) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        ALU: {
          ...state.COMPUTER.ALU,
          [to]: newALU,
        },
      },
    })),

  // Setear el valor del PSW
  setPSWValue: (to, newPSW) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        PSW: {
          ...state.COMPUTER.PSW,
          [to]: newPSW,
        },
      },
    })),

  // Setear el valor del UC
  setUCValue: (newUC) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        UC: newUC,
      },
    })),

  // Setear en qué velocidad se mostrarán los pasos de la instrucción
  setTimeout: (value) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        timeout: value,
      },
    })),

  // Setear en cuál ciclo de instrucción va la instrucción (FI, DI, CO, FO...)
  setCurrentCycle: (value) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        currentCycle: value,
      },
    })),

  // Setear el valor de los registros VU (AL, BL, CL, DL)
  setRegisterBankValue: (register, value) =>
    set((state) => ({
      COMPUTER: {
        ...state.COMPUTER,
        RegisterBank: {
          ...state.COMPUTER.RegisterBank,
          [register]: value,
        },
      },
    })),

  // Resetear el valor del PC
  resetCOMPUTER: () =>
    set((state) => ({
      COMPUTER: { ...initialInstructions, timeout: state.COMPUTER.timeout },
    })),
});

export default createInstructionsSlice;
