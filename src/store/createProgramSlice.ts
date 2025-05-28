import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";
import { CODOPS } from "../interfaces/CODOP";
import { DataMemory } from "../interfaces/DataMemory";
import { Alert } from "../utils/swal";

export type TypeOperand = "NUMBER" | "REGISTER" | "ASIGNFUNCTION" | "FUNCTION";

export interface ProgramItem {
  codop: keyof typeof CODOPS;
  id: string;
  operand1: string;
  operand2: string;
  type1: TypeOperand;
  type2: TypeOperand;
}

export interface DataItem {
  operand1: DataMemory;
  operand2: number;
}

interface CreateItem {
  codop: keyof typeof CODOPS;
  operand1?: string;
  operand2?: string;
  type1?: TypeOperand;
  type2?: TypeOperand;
}

interface UpdateDataItem {
  operand1: DataMemory;
  operand2: number;
}

export interface ProgramSlice {
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  isStepMode: boolean;
  setIsStepMode: (stepMode: boolean) => void;
  stepRequested: boolean;
  requestStep: () => void;
  clearStepRequest: () => void;
  dataMemory: DataItem[];
  items: ProgramItem[];
  activeItem: ProgramItem | null;
  cancelProgram: boolean;
  isProgamRunning: boolean;
  throwConfetti: boolean;
  createItem: (props: CreateItem) => void;
  handleRemove: (id: string) => void;
  handleClear: () => void;
  moveItem: (fromIndex: number, toIndex: number) => void;
  setActiveItem: (item: ProgramItem | null) => void;
  setCancelProgram: (cancelProgram: boolean) => void;
  setIsProgamRunning: (isProgamRunning: boolean) => void;
  setOperand: (
    id: string,
    field: "operand1" | "operand2",
    newValue: string,
  ) => void;
  setType: (
    id: string,
    field: "type1" | "type2",
    newValue: TypeOperand,
  ) => void;
  setThrowConfetti: () => void;
  updateDataItem: (props: UpdateDataItem) => void;
}

const createProgramSlice: StateCreator<ProgramSlice> = (set) => ({
  dataMemory: [],
  items: [],
  activeItem: null,
  cancelProgram: true,
  isProgamRunning: false,
  throwConfetti: false,
  isPaused: true,
  setIsPaused: (isPaused) => set(() => ({ isPaused })),

  isStepMode: false,
  setIsStepMode: (isStepMode) => set(() => ({ isStepMode })),

  stepRequested: false,
  requestStep: () => set(() => ({ stepRequested: true })),
  clearStepRequest: () => set(() => ({ stepRequested: false })),

  // Crear un nuevo item y agregarlo al estado
  createItem: ({
    codop,
    operand1 = "AL",
    type1 = "REGISTER",
    operand2 = "0",
    type2 = "NUMBER",
  }) => {
    set((state) => {
      if (state.items.length >= 128) {
        Alert({
          text: "No puedes agregar más de 128 instrucciones.",
        });
        return state;
      }
      const newItem = {
        id: uuidv4(),
        codop,
        operand1,
        type1,
        operand2,
        type2,
      };
      return {
        items: [...state.items, newItem],
      };
    });
  },

  handleClear: () => {
    set((state) => ({
      items: [],
    }));
  },

  // Eliminar un item por id
  handleRemove: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  // Mover un item dentro del array
  moveItem: (fromIndex, toIndex) => {
    set((state) => {
      const items = [...state.items];
      const [movedItem] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, movedItem);
      return { items };
    });
  },

  setIsProgamRunning: (isProgamRunning) => {
    set(() => ({ isProgamRunning }));
  },

  setCancelProgram: (cancelProgram) => {
    set(() => ({ cancelProgram }));
  },

  // Establecer el item activo al iniciar el arrastre
  setActiveItem: (item) => {
    set({ activeItem: item });
  },

  // Actualizar operandos según el id y el campo
  setOperand: (id, field, newValue) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, [field]: newValue } : item,
      );

      return { items: updatedItems };
    });
  },

  // Actualizar tipos según el id y el campo
  setType: (id, field, newValue) => {
    set((state) => {
      const type = field === "type1" ? "operand1" : "operand2";

      switch (newValue) {
        case "FUNCTION":
          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, [field]: newValue, [type]: "" }
                : item,
            ),
          };

        case "NUMBER":
          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, [field]: newValue, [type]: "0" }
                : item,
            ),
          };
        case "REGISTER":
          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, [field]: newValue, [type]: "AL" }
                : item,
            ),
          };

        default:
          return state;
      }
    });
  },

  setThrowConfetti: () => {
    set((state) => ({ throwConfetti: !state.throwConfetti }));
  },

  updateDataItem: ({ operand1, operand2 }) => {
    const newItem = {
      operand1,
      operand2,
    };

    set((state) => {
      // Si la lista está vacía, insertar directamente el nuevo elemento
      if (state.dataMemory.length === 0) {
        return { dataMemory: [newItem] };
      }

      // Verificar si ya existe un elemento con el mismo `operand1`
      const existingIndex = state.dataMemory.findIndex(
        (item) => item.operand1 === operand1,
      );

      // Si existe, actualizar el elemento
      if (existingIndex !== -1) {
        const updatedDataMemory = [...state.dataMemory];
        updatedDataMemory[existingIndex] = newItem; // Reemplaza el elemento
        return { dataMemory: updatedDataMemory };
      }

      // Si no existe, insertar en el índice correspondiente
      const updatedDataMemory = [...state.dataMemory];
      const addressIndex = parseInt(operand1, 10);
      updatedDataMemory[addressIndex] = newItem;

      // Garantizar que no existan "huecos" en el array
      const normalizedDataMemory = updatedDataMemory.map(
        (item) => item || null,
      );

      return { dataMemory: normalizedDataMemory };
    });
  },
});

export default createProgramSlice;
