import { PCComponent } from "../interfaces/Component";
import { Register } from "../interfaces/RegisterBank";
import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";

// INSTRUCCION MOVE
export const moveInstruction = async (operand1: string, operand2: string) => {
  await functionTime(() => {
    // EI - Execute Instruction
    useStore.getState().setCurrentCycle("EI");
    // 18- se ilumina el banco de registros
    // 19- aparece el dato en el banco de registros (00000000 | 00000101) que seria "|AL | 5 |"
    // finalmente se asigna el valor de AL y se guarda
    useStore.getState().setComponents("UC", operand1 as PCComponent);
    useStore
      .getState()
      .setRegisterBankValue(operand1 as Register, Number(operand2));
  });
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  return;
};
