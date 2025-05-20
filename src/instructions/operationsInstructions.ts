import { PCComponent } from "../interfaces/Component";
import { Register } from "../interfaces/RegisterBank";
import { TypeOperand } from "../store/createProgramSlice";
import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";

// INSTRUCCIÓN ADD
export const operationsInstructions = async (
  codop: "ADD" | "DEC" | "DIV" | "MUL",
  operand1: string,
  operand2: string,
  type2: TypeOperand,
) => {
  //CO-FO primer dato
  //-1 Iluminar arista UC, BR primer dato
  await functionTime(() => {
    // EI - Execute Instruction
    useStore.getState().setCurrentCycle("EI");
    useStore.getState().setComponents("UC", operand1 as PCComponent);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  await functionTime(() => {
    useStore.getState().setComponents(operand1 as PCComponent, "ALU");
    useStore
      .getState()
      .setALUValue(
        "A",
        useStore.getState().COMPUTER.RegisterBank[operand1 as Register],
      );
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  //CO-FO segundo dato
  // Si es un registro -->
  // -2 Iluminar arista UC, BR segundo dato
  // Si es un dato directo -->
  // No hacer nada

  //Si el segundo operando que le entró al ADD es un registro ->
  switch (type2) {
    case "REGISTER":
      {
        await functionTime(() => {
          useStore.getState().setComponents("UC", operand2 as PCComponent);
        });
        if (!useStore.getState().cancelProgram) {
          useStore.getState().setPCValue(useStore.getState().items.length - 1);
          return;
        }

        // -3 setear ciclo EI
        // -4 Iluminar arista BR, ALU
        // -5 Dentro de la ALU, mostrar el valor de “primer dato” (con el valor en binario de AL)
        // -6 Dentro de la ALU, mostrar el valor de “segundo dato” (con el valor en binario de BL)
        // -7 se muestra el resultado de la suma en la cajita de resultado de la ALU
        // -8 Si el resultado es igual a cero, poner en true la flag de zero e iluminar arista ALU, PSW
        // -9 Si el resultado es mayor a 255, poner en true la flag de nan e iluminar arista ALU, PSW
        await functionTime(() => {
          useStore.getState().setComponents(operand2 as PCComponent, "ALU");
          useStore
            .getState()
            .setALUValue(
              "B",
              useStore.getState().COMPUTER.RegisterBank[operand2 as Register],
            );
        });
        if (!useStore.getState().cancelProgram) {
          useStore.getState().setPCValue(useStore.getState().items.length - 1);
          return;
        }
      }
      break;
    case "NUMBER":
      {
        await functionTime(() => {
          useStore.getState().setComponents("UC", "ALU");
          useStore.getState().setALUValue("B", Number(operand2));
        });
        if (!useStore.getState().cancelProgram) {
          useStore.getState().setPCValue(useStore.getState().items.length - 1);
          return;
        }
      }
      break;
    default:
      break;
  }
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  switch (codop) {
    case "ADD":
      {
        useStore
          .getState()
          .setALUValue(
            "result",
            useStore.getState().COMPUTER.ALU.A +
              useStore.getState().COMPUTER.ALU.B,
          );

        // Actualizar el valor del operando1 con el reultado

        // - Si el resultado es igual a cero, poner en true la flag de zero y se ilumina el PSW
        // - Si el resultado es mayor a 255, poner en true la flag de nan y se ilumina el PSW
      }
      break;
    case "DEC":
      {
        useStore
          .getState()
          .setALUValue(
            "result",
            useStore.getState().COMPUTER.ALU.A -
              useStore.getState().COMPUTER.ALU.B,
          );
      }
      break;
    case "DIV":
      {
        useStore
          .getState()
          .setALUValue(
            "result",
            useStore.getState().COMPUTER.ALU.A /
              useStore.getState().COMPUTER.ALU.B,
          );
      }
      break;
    case "MUL":
      {
        useStore
          .getState()
          .setALUValue(
            "result",
            useStore.getState().COMPUTER.ALU.A *
              useStore.getState().COMPUTER.ALU.B,
          );
      }
      break;
  }
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  // Actualizar el valor del operando1 con el reultado
  useStore
    .getState()
    .setRegisterBankValue(
      operand1 as Register,
      useStore.getState().COMPUTER.ALU.result,
    );
  // - Si el resultado es igual a cero, poner en true la flag de zero y se ilumina el PSW
  // - Si el resultado es mayor a 255, poner en true la flag de nan y se ilumina el PSW
  if (useStore.getState().COMPUTER.ALU.result === 0) {
    useStore.getState().setPSWValue("zero", true);
    await functionTime(() => {
      useStore.getState().setComponents("ALU", "PSW");
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }
  } else {
    useStore.getState().setPSWValue("zero", false);
  }

  if (
    useStore.getState().COMPUTER.ALU.result > 127 ||
    useStore.getState().COMPUTER.ALU.result < -127
  ) {
    useStore.getState().setPSWValue("nan", true);
    await functionTime(() => {
      useStore.getState().setComponents("ALU", "PSW");
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }
  } else {
    useStore.getState().setPSWValue("nan", false);
  }

  await functionTime(() => {
    // WO
    useStore.getState().setCurrentCycle("WO");
    useStore.getState().setComponents("ALU", operand1 as PCComponent);
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  return;
};

/*
CO-FO primer dato
-1 Iluminar arista UC, BR primer dato

CO-FO segundo dato

Si es un registro -->
-2 Iluminar arista UC, BR segundo dato

Si es un dato directo -->
No hacer nada

EI

Si el segundo operando que le entró al ADD es un registro —>
-3 setear ciclo EI
-4 Iluminar arista BR, ALU
-5 Dentro de la ALU, mostrar el valor de “primer dato” (con el valor en binario de AL)
-6 Dentro de la ALU, mostrar el valor de “segundo dato” (con el valor en binario de BL)
-7 se muestra el resultado de la suma en la cajita de resultado de la ALU
-8 Si el resultado es igual a cero, poner en true la flag de zero e iluminar arista ALU, PSW
-9 Si el resultado es mayor a 255, poner en true la flag de nan e iluminar arista ALU, PSW 

Si el segundo operando que le entró al ADD es un dato inmediato—>
-3 setear ciclo EI
-4 Iluminar arista BR, ALU
-5 Dentro de la ALU, mostrar el valor de “primer dato” (con el valor en binario de AL)
-5.5 Iluminar arista UC, ALU
-6 Dentro de la ALU, mostrar el valor de “segundo dato” (con el valor en binario de BL)
-7 se muestra el resultado de la suma en la cajita de resultado de la ALU
-8 Si el resultado es igual a cero, poner en true la flag de zero y se ilumina el PSW
-9 Si el resultado es mayor a 255, poner en true la flag de nan y se ilumina el PSW

WO
-10 setear ciclo WO
-11 iluminar arista ALU, BR
-12 se actualiza el valor del primer operando de la instrucción con el valor del resultado: | AL  | valor resultado operacion |
*/
