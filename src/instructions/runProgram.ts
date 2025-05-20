import { InstruccionesControl } from "../interfaces/CODOP";
import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";
import { interruption } from "./interruption";
import { jumpsInstructions } from "./jumpsInstructions";
import { loadInstruction } from "./loadInstruction";
import { malumaInstruction } from "./malumaInstruction";
import { moveInstruction } from "./moveInstruction";
import { operationsInstructions } from "./operationsInstructions";
import { storeInstruction } from "./storeInstruction";

export const run = async () => {
  const instructions = useStore.getState().items;

  useStore.getState().resetCOMPUTER();

  do {
    // Siguiente instrucción
    await functionTime(() => {
      useStore.getState().setComponents("UC", "PC");
      useStore.getState().setPCValue(useStore.getState().COMPUTER.PC + 1);
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    const instruction = instructions[useStore.getState().COMPUTER.PC];
    const { id, codop, operand1, operand2, type2 } = instruction;

    await functionTime(() => {
      // FI - Fetch Instruction
      useStore.getState().setCurrentCycle("FI");
      // 1- Iluminar PC
      // 2- Mostrar #dirección (del COODOP REGISTER, REGISTER) en cajita de PC (00000011)
      useStore.getState().setComponents("PC", "MAR");
      useStore.getState().setMARValue(useStore.getState().COMPUTER.PC);
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      // 9- iluminar MAR
      useStore.getState().setComponents("MAR", "AB");
      useStore.getState().setAddressBusValue(useStore.getState().COMPUTER.PC);
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      // 7- Iluminar UC
      useStore.getState().setComponents("UC", "CB");
      useStore.getState().setControlBusValue(InstruccionesControl.GetDatum);
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      // 7- Iluminar CB -> PM
      useStore.getState().setComponents("CB", "PM");
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      // 7- Iluminar AB -> PM
      useStore.getState().setComponents("AB", "PM");
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      useStore.getState().setComponents("PM", id);
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      useStore.getState().setComponents(id, "PM");
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      // 11- En la memoria del programa aparece la instrucción | # | ADD Operando1, Operando2 |
      useStore.getState().setComponents("PM", "DB");

      // Se muestra en el bus de datos lo que va a pasar al MBR,
      useStore.getState().setDataBusValue({ codop, operand1, operand2 });
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      // 12- Iluminar MBR
      useStore.getState().setComponents("DB", "MBR");
      useStore.getState().setMBRValue({ codop, operand1, operand2 });
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      // 14- Se ilumina el IR
      useStore.getState().setComponents("MBR", "IR");
      useStore.getState().setIRValue({ codop, operand1, operand2 });
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      // DI - Dicode Instruction
      useStore.getState().setCurrentCycle("DI");
      // 15- Iluminar UC
      // 16- mostrar la instrucción decodificada CODOP 00000000, 00000101”
      useStore.getState().setComponents("IR", "UC");
      useStore.getState().setUCValue({ codop, operand1, operand2 });
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    await functionTime(() => {
      // 99- La UC esta decodificando
      useStore.getState().setComponents("UC", "UC");
    });
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(instructions.length - 1);
      break;
    }

    switch (codop) {
      case "MOV":
        await moveInstruction(operand1, operand2);
        break;
      case "ADD":
        await operationsInstructions(codop, operand1, operand2, type2);
        break;
      case "DEC":
        await operationsInstructions(codop, operand1, operand2, type2);
        break;
      case "DIV":
        await operationsInstructions(codop, operand1, operand2, type2);
        break;
      case "MUL":
        await operationsInstructions(codop, operand1, operand2, type2);
        break;
      case "JMP":
        await jumpsInstructions(codop, operand1);
        break;
      case "JNZ":
        await jumpsInstructions(codop, operand1);
        break;
      case "JZ":
        await jumpsInstructions(codop, operand1);
        break;
      case "LOAD":
        await loadInstruction(codop, operand1, operand2);
        break;
      case "STORE":
        await storeInstruction(codop, operand1, operand2, type2);
        break;
      case "MALUMA":
        await malumaInstruction();
        break;

      default:
        break;
    }

    await functionTime(() => {
      // verificando si hay INTERRUPTION
      useStore.getState().setComponents("UC", "UC");
    });
    if (useStore.getState().throwConfetti) {
      await interruption();
    }

    if (useStore.getState().COMPUTER.PC === instructions.length - 1) {
      useStore.getState().setCancelProgram(false);
    }
  } while (
    useStore.getState().COMPUTER.PC !== instructions.length - 1 ||
    useStore.getState().cancelProgram
  );

  useStore.getState().setIsProgamRunning(false);
  useStore.getState().setCancelProgram(true);
};
