import { InstruccionesControl } from "../interfaces/CODOP";
import { PCComponent } from "../interfaces/Component";
import { DataMemory } from "../interfaces/DataMemory";
import { Register } from "../interfaces/RegisterBank";
import { TypeOperand } from "../store/createProgramSlice";
import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";

// INSTRUCCION STORE
export const storeInstruction = async (
  codop: "STORE",
  operand1: string,
  operand2: string,
  type2: TypeOperand,
) => {
  await functionTime(() => {
    // 1- Cambiar a ciclo de instrucción “EI”
    useStore.getState().setCurrentCycle("EI");
    // 2- Iluminar arista UC, MAR
    useStore.getState().setComponents("UC", "MAR");
    // 3- mostrar en el MAR la dirección “0 - 127” de memoria de datos en donde se guardará
    useStore.getState().setMARValue(Number(operand1));
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  // if (si el operando2 es un dato inmediato):
  // 4- Iluminar arista UC, MBR
  // 5- mostrar en el MBR el dato inmediato que se va a guardar
  if (type2 === "NUMBER") {
    await functionTime(() => {
      useStore.getState().setComponents("UC", "MBR");
      useStore.getState().setMBRValue({ codop, operand1, operand2 });
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }

    // else (si el operando2 es un registro del BR):
    // 4- Iluminar arista UC, B.R
    // 5- Iluminar arista B.R, MBR
    // 5.1- mostrar en el MBR el dato inmediato que se va a guardar
  } else {
    await functionTime(() => {
      useStore.getState().setComponents("UC", operand2 as PCComponent);
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }

    await functionTime(() => {
      useStore.getState().setComponents(operand2 as PCComponent, "MBR");
      useStore.getState().setMBRValue({
        codop,
        operand1,
        operand2: useStore
          .getState()
          .COMPUTER.RegisterBank[operand2 as Register].toString(),
      });
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }
  }

  // WO
  await functionTime(() => {
    // 6- Cambiar a ciclo de instrucción “WO”
    useStore.getState().setCurrentCycle("WO");
    // 7- Se ilumina la arista UC, Bus de Control
    useStore.getState().setComponents("UC", "CB");
    // 8- Mostrar en el bus de control  la instrucción “2” (escribir en memoria)
    useStore.getState().setControlBusValue(InstruccionesControl.WriteMemory);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  // 9- Iluminar arista MAR, bus de direcciones
  await functionTime(() => {
    useStore.getState().setComponents("MAR", "AB");
    // 10- Mostrar en el bus de direcciones la dirección “0 - 127” de memoria de datos en donde se guardará
    useStore.getState().setAddressBusValue(Number(operand1));
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 11- Iluminar arista MBR, bus de datos
    useStore.getState().setComponents("MBR", "DB");
    // 12- Mostrar en el bus de datos el el dato inmediato que se va a guardar
    useStore.getState().setDataBusValue({ codop, operand1, operand2 });
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  // 13- iluminar arista bus de control, memoria de datos
  await functionTime(() => {
    useStore.getState().setComponents("CB", "DM");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  // 14- iluminar arista bus de direcciones, memoria de datos
  await functionTime(() => {
    useStore.getState().setComponents("AB", "DM");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  // 15- iluminar arista bus de datos, memoria de datos
  await functionTime(() => {
    useStore.getState().setComponents("DB", "DM");
    // 16- Se muestra el dato en memoria de datos ej: | 0  | 12  | (en binario)
    if (type2 === "NUMBER") {
      useStore.getState().updateDataItem({
        operand1: operand1 as DataMemory,
        operand2: Number(operand2),
      });
      useStore.getState().setComponents("DM", operand2);
    } else {
      useStore.getState().updateDataItem({
        operand1: operand1 as DataMemory,
        operand2:
          useStore.getState().COMPUTER.RegisterBank[operand2 as Register],
      });
      useStore.getState().setComponents("DM", operand2);
    }
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  return;
};

/*
    EI

    1- Cambiar a ciclo de instrucción “EI”
    2- Iluminar arista UC, MAR
    3- mostrar en el MAR la dirección “0 - 127” de memoria de datos en donde se guardará

    if (si el operando2 es un dato inmediato):
    4- Iluminar arista UC, MBR
    5- mostrar en el MBR el dato inmediato que se va a guardar

    else (si el operando2 es un registro del BR):
    4- Iluminar arista UC, B.R
    5- Iluminar arista B.R, MBR
    5.1- mostrar en el MBR el dato inmediato que se va a guardar


    WO

    6- Cambiar a ciclo de instrucción “WO”
    7- Se ilumina la arista UC, Bus de Control
    8- Mostrar en el bus de control  la instrucción “2” (escribir en memoria)
    9- Iluminar arista MAR, bus de direcciones 
    10- Mostrar en el bus de direcciones la dirección “0 - 127” de memoria de datos en donde se guardará
    11- Iluminar arista MBR, bus de datos
    12- Mostrar en el bus de datos el el dato inmediato que se va a guardar
    13- iluminar arista bus de control, memoria de datos
    14- iluminar arista bus de direcciones, memoria de datos
    15- iluminar arista bus de datos, memoria de datos
    16- Se muestra el dato en memoria de datos ej: | 0  | 12  | (en binario) // utilizar funcion updateDataItem

*/
