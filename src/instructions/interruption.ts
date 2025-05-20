import JSConfetti from "js-confetti";
import { InstruccionesControl } from "../interfaces/CODOP";
import { DataMemory } from "../interfaces/DataMemory";
import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";
import { Alert } from "../utils/swal";

export const interruption = async () => {
  await functionTime(() => {
    // INTERRUPTION
    useStore.getState().setCurrentCycle("INTERRUPTION");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  const address = useStore.getState().dataMemory.length;

  await functionTime(() => {
    useStore.getState().setComponents("UC", "MAR");
    useStore.getState().setMARValue(address);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents("UC", "PC");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  const counterValue = useStore.getState().COMPUTER.PC;

  await functionTime(() => {
    useStore.getState().setComponents("UC", "MBR");
    useStore.getState().setMBRValue({
      codop: "START",
      operand1: `${counterValue}`,
      operand2: "0",
    });
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // Se ilumina la arista UC, Bus de Control
    useStore.getState().setComponents("UC", "CB");
    // Mostrar en el bus de control  la instrucción “2” (escribir en memoria)
    useStore.getState().setControlBusValue(InstruccionesControl.WriteMemory);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents("MAR", "AB");
    // Mostrar en el bus de direcciones la dirección “0 - 127” de memoria de datos en donde se guardará
    useStore.getState().setAddressBusValue(useStore.getState().COMPUTER.MAR);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 11- Iluminar arista MBR, bus de datos
    useStore.getState().setComponents("MBR", "DB");
    // 12- Mostrar en el bus de datos el el dato inmediato que se va a guardar
    useStore.getState().setDataBusValue(useStore.getState().COMPUTER.MBR);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents("CB", "DM");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents("AB", "DM");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents("DB", "DM");
    // 16- Se muestra el dato en memoria de datos ej: | 0  | 12  | (en binario)
    useStore.getState().updateDataItem({
      operand1: `${address}` as DataMemory,
      operand2: counterValue,
    });
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents("UC", "PC");
    useStore.getState().setPCValue(127);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents("UC", "UC");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  //! THOW CONFETTI
  const jsConfetti = new JSConfetti();
  await jsConfetti.addConfetti({
    confettiRadius: 6,
    confettiNumber: 300,
  });

  await functionTime(() => {
    useStore.getState().setComponents("UC", "MAR");
    useStore.getState().setMARValue(address);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // iluminar MAR
    useStore.getState().setComponents("MAR", "AB");
    useStore.getState().setAddressBusValue(counterValue);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 7- Iluminar UC
    useStore.getState().setComponents("UC", "CB");
    useStore.getState().setControlBusValue(InstruccionesControl.GetDatum);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 7- Iluminar CB -> DM
    useStore.getState().setComponents("CB", "DM");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 7- Iluminar AB -> DM
    useStore.getState().setComponents("AB", "DM");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents("DM", `${address}`);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents(`${address}`, "DM");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 11- En la memoria del programa aparece la instrucción | # | ADD Operando1, Operando2 |
    useStore.getState().setComponents("DM", "DB");

    const dataMemoryValue = useStore
      .getState()
      .dataMemory.find((item) => item.operand1 === `${address}`);

    if (!dataMemoryValue) {
      Alert({
        text: `No se encontró ningún valor en la dirección de memoria: ${address}`,
      });
      return;
    }

    // Se muestra en el bus de datos lo que va a pasar al MBR,
    useStore.getState().setDataBusValue({
      codop: "START",
      operand1: dataMemoryValue?.operand1,
      operand2: dataMemoryValue?.operand2.toString(),
    });
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    // 12- Iluminar MBR
    useStore.getState().setComponents("DB", "MBR");
    useStore.getState().setMBRValue(useStore.getState().COMPUTER.DB);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents("MBR", "PC");
    useStore.getState().setPCValue(counterValue);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  useStore.getState().setThrowConfetti();

  return;
};
