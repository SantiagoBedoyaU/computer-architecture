import { InstruccionesControl } from "../interfaces/CODOP";
import { Register } from "../interfaces/RegisterBank";
import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";
import { Alert } from "../utils/swal";

// INSTRUCCION LOAD
export const loadInstruction = async (
  codop: "LOAD",
  operand1: string,
  operand2: string,
) => {
  await functionTime(() => {
    // 1- Cambiar a ciclo de instrucción “CO”
    useStore.getState().setCurrentCycle("CO");
    // 2- Iluminar arista UC, UC
    useStore.getState().setComponents("UC", "UC");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 3- Cambiar a ciclo de instrucción “FO”
    useStore.getState().setCurrentCycle("FO");
    // 4- Iluminar arista UC, bus de control
    useStore.getState().setComponents("UC", "CB");
    // 5- Mostrar en el bus de control  la instrucción “1” (Solicitar dato)
    useStore.getState().setControlBusValue(InstruccionesControl.GetDatum);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 6- Iluminar arista Bus de control, Memoria de datos
    useStore.getState().setComponents("CB", "DM");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 7- Iluminar arista UC, MAR
    useStore.getState().setComponents("UC", "MAR");
    // 8- Mostrar en la MAR la #dir del dataMemory
    useStore.getState().setMARValue(Number(operand2));
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 9- Iluminar arista MAR, bus de direcciones
    useStore.getState().setComponents("MAR", "AB");
    // 10- Mostrar en el bus de direcciones la #dir del dataMemory
    useStore.getState().setAddressBusValue(Number(operand2));
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 11- Iluminar arista Bus de direcciones, Memoria de datos
    useStore.getState().setComponents("AB", "DM");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 12- Se muestra el dato en memoria de datos ej: | #dir. DataMemory  | valor DataMemory  | (en binario)
    useStore.getState().setComponents("DM", operand2);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  const dataMemoryValue = useStore
    .getState()
    .dataMemory.find((item) => item.operand1 === operand2);

  if (!dataMemoryValue) {
    Alert({
      text: `No se encontró ningún valor en la dirección de memoria: ${operand2}`,
    });
  }

  await functionTime(() => {
    // 12.1-
    useStore.getState().setComponents(operand2, "DM");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 13- Iluminar arista Memoria de datos, bus de datos
    useStore.getState().setComponents("DM", "DB");
    // 14- Mostrar “| #dir  | valor dato  | ” en el bus de datos

    useStore.getState().setDataBusValue({
      codop,
      operand1: "0",
      operand2: dataMemoryValue?.operand2.toString() ?? "0",
    });
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 15- Iluminar arista Bus de datos, MBR
    useStore.getState().setComponents("DB", "MBR");
    // 16- Mostrar “| #dir  | valor dato  |” en el MBR
    useStore.getState().setMBRValue(useStore.getState().COMPUTER.DB);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 17- Cambiar a ciclo de instrucción “FO”
    useStore.getState().setCurrentCycle("FO");
    // 18- Iluminar arista MBR, B.R
    useStore.getState().setComponents("MBR", operand1);
    // 19- se actualiza el valor del registro del B.R (el seleccionado en el operando1) por ejemplo: | AL  | valor dato |
    useStore
      .getState()
      .setRegisterBankValue(
        operand1 as Register,
        dataMemoryValue?.operand2 ?? 0,
      );
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  return;
};
