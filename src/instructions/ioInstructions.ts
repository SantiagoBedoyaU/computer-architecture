import { InstruccionesControl } from "../interfaces/CODOP";
import { PCComponent } from "../interfaces/Component";
import { DataMemory } from "../interfaces/DataMemory";
import { Register } from "../interfaces/RegisterBank";
import { TypeOperand } from "../store/createProgramSlice";
import useStore from "../store/useStore";
import { functionTime, getBinary, waitForInputSend } from "../utils/actions";
import { Alert } from "../utils/swal";

export const ioInstructions = async (
  codop: "INPUT" | "OUTPUT",
  operand1: string,
  type1: TypeOperand,
) => {
  await functionTime(() => {
    // 2- Iluminar arista UC, CB
    useStore.getState().setComponents("UC", "CB");
    // 3- mostrar en el MAR la dirección “0 - 127” de memoria de datos en donde se guardará

    useStore
      .getState()
      .setControlBusValue(
        codop === "INPUT"
          ? InstruccionesControl.input
          : InstruccionesControl.output,
      );
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }
  await functionTime(() => {
    useStore.getState().setComponents("CB", "IO");
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }
  if (codop === "INPUT") {
    // INPUT
    await functionTime(() => {
      useStore.getState().setCurrentCycle("EI");
      useStore.getState().setComponents("IO", "KB");
      useStore.getState().setRequestInput(true);
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }
    // Esperar a que se envíe el input
    await waitForInputSend(() => {
      const store = useStore.getState();
      store.setComponents("KB", "IO");
      store.setInputSend(false);
      store.setRequestInput(false);
    });

    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }
    await functionTime(() => {
      useStore.getState().setComponents("IO", "DB");
      useStore.getState().setDataBusValue({
        codop,
        operand1,
        operand2: useStore.getState().COMPUTER.inputValue.toString(),
      });
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }
    await functionTime(() => {
      useStore.getState().setComponents("DB", "MBR");
      useStore.getState().setMBRValue({
        codop,
        operand1,
        operand2: getBinary(useStore.getState().COMPUTER.inputValue),
      });
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }
    await functionTime(() => {
      // 4- Iluminar arista MBR, AB
      useStore.getState().setComponents("MBR", "UC");
      // 5- Mostrar en el bus de direcciones la dirección “0 - 127” de memoria de datos en donde se guardará
      useStore.getState().setUCValue({
        codop,
        operand1,
        operand2: useStore.getState().COMPUTER.inputValue.toString(),
      });
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }
    await functionTime(() => {
      useStore.getState().setCurrentCycle("WO");
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }
    if (type1 === "NUMBER") {
      // 6- Iluminar arista UC, MAR
      await functionTime(() => {
        useStore.getState().setComponents("UC", "CB");
        useStore
          .getState()
          .setControlBusValue(InstruccionesControl.WriteMemory);
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
        useStore.getState().setComponents("UC", "MAR");
        // 7- Mostrar en el MAR la dirección “0 - 127” de memoria de datos en donde se guardará
        useStore.getState().setMARValue(Number(operand1));
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        // 8- Iluminar arista MAR, AB
        useStore.getState().setComponents("MAR", "AB");
        // 9- Mostrar en el bus de direcciones la dirección “0 - 127” de memoria de datos en donde se guardará
        useStore.getState().setAddressBusValue(Number(operand1));
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        // 10- Iluminar arista AB, DM
        useStore.getState().setComponents("AB", "DM");
        // 11- Se muestra el dato en memoria de datos ej: | 0  | 12  | (en binario)
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        // 12- Iluminar arista DM, UC
        useStore.getState().setComponents("UC", "DB");
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        // 13- Iluminar arista DB, DM
        useStore.getState().setComponents("DB", "DM");
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        // 14- Se muestra el dato en memoria de datos ej: | 0  | 12  | (en binario)
        useStore.getState().setComponents("DM", operand1);
        useStore.getState().updateDataItem({
          operand1: operand1 as DataMemory,
          operand2: useStore.getState().COMPUTER.inputValue,
        });
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
    } else {
      // Si el operando1 es un registro del BR:
      // 6- Iluminar arista UC, B.R
      await functionTime(() => {
        useStore.getState().setComponents("UC", operand1 as PCComponent);
        useStore
          .getState()
          .setRegisterBankValue(
            operand1 as Register,
            useStore.getState().COMPUTER.inputValue,
          );
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
    }
  } else {
    // OUTPUT
    if (type1 === "NUMBER") {
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
        useStore.getState().setMARValue(Number(operand1));
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }

      await functionTime(() => {
        // 9- Iluminar arista MAR, bus de direcciones
        useStore.getState().setComponents("MAR", "AB");
        // 10- Mostrar en el bus de direcciones la #dir del dataMemory
        useStore.getState().setAddressBusValue(Number(operand1));
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
        useStore.getState().setComponents("DM", operand1);
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }

      const dataMemoryValue = useStore
        .getState()
        .dataMemory.find((item) => item.operand1 === operand1);

      if (!dataMemoryValue) {
        Alert({
          text: `No se encontró ningún valor en la dirección de memoria: ${operand1}`,
        });
      }

      await functionTime(() => {
        // 12.1-
        useStore.getState().setComponents(operand1, "DM");
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
          operand2: dataMemoryValue?.operand1.toString() ?? "0",
        });
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        useStore.getState().setComponents("UC", "CB");
        useStore.getState().setControlBusValue(InstruccionesControl.output);
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        useStore.getState().setComponents("CB", "IO");
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        // 15- Iluminar arista Bus de datos, IO
        useStore.getState().setComponents("DB", "IO");
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        // 16- Se muestra el dato en IO
        useStore.getState().setComponents("IO", "Display");
        useStore
          .getState()
          .setOutputValue(dataMemoryValue?.operand2.toString() ?? "0");
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
    } else {
      await functionTime(() => {
        useStore.getState().setComponents("UC", operand1 as PCComponent);
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        useStore.getState().setComponents(operand1 as PCComponent, "MBR");
        useStore.getState().setMBRValue({
          codop,
          operand1,
          operand2: useStore
            .getState()
            .COMPUTER.RegisterBank[operand1 as Register].toString(),
        });
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        useStore.getState().setComponents("MBR", "DB");
        useStore.getState().setDataBusValue({
          codop,
          operand1,
          operand2: useStore
            .getState()
            .COMPUTER.RegisterBank[operand1 as Register].toString(),
        });
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        useStore.getState().setComponents("UC", "CB");
        useStore.getState().setControlBusValue(InstruccionesControl.output);
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        useStore.getState().setComponents("CB", "IO");
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        // 15- Iluminar arista Bus de datos, IO
        useStore.getState().setComponents("DB", "IO");
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
      await functionTime(() => {
        // 16- Se muestra el dato en IO
        useStore.getState().setComponents("IO", "Display");
        useStore
          .getState()
          .setOutputValue(
            useStore
              .getState()
              .COMPUTER.RegisterBank[operand1 as Register].toString(),
          );
      });
      if (!useStore.getState().cancelProgram) {
        useStore.getState().setPCValue(useStore.getState().items.length - 1);
        return;
      }
    }
  }
  return;
};
