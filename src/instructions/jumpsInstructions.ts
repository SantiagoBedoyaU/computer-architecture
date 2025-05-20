import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";
import { Alert } from "../utils/swal";

export const jumpsInstructions = async (
  codop: "JZ" | "JNZ" | "JMP",
  operand1: string,
) => {
  // Validar el operando
  if (!operand1 || operand1.trim() === "") {
    Alert({
      text: `El operando es inválido, asegúrate de que el operando no sea null o esté vacío.
INSTRUCCIÓN: ${codop}`,
    });
    console.error("Error: Operando inválido. INSTRUCCIÓN:", codop);
    return;
  }

  // Ciclo de instrucción: EI
  await functionTime(() => {
    useStore.getState().setCurrentCycle("EI");
    useStore.getState().setComponents("UC", "PSW");
  });

  // Verificar si el programa fue cancelado
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  // Verificar la condición del salto
  const isZero = useStore.getState().COMPUTER.PSW.zero;

  if (
    (codop === "JNZ" && !isZero) ||
    (codop === "JZ" && isZero) ||
    codop === "JMP"
  ) {
    await functionTime(async () => {
      const itemsFiltered = useStore
        .getState()
        .items.filter((instruction) => instruction.type1 === "ASIGNFUNCTION");

      // Verificar si existen funciones en la memoria
      if (itemsFiltered.length === 0) {
        Alert({
          text: `No se encontraron funciones en la memoria.
INSTRUCCIÓN: ${codop}, OPERANDO: ${operand1}`,
        });
        console.warn("No se encontraron funciones en la memoria.");
        return;
      }

      // Buscar función asociada al operando
      const item = itemsFiltered.find(
        (instruction) => instruction.operand1 === operand1,
      );
      if (!item) {
        Alert({
          text: `No se encontró la función asociada al operando.
INSTRUCCIÓN: ${codop}, OPERANDO: ${operand1}`,
        });
        console.warn(
          "No se encontró la función asociada al operando:",
          operand1,
        );
        return;
      }

      // Buscar la dirección de memoria de la función
      const newAddress = useStore
        .getState()
        .items.findIndex((instruction) => instruction.id === item.id);

      if (newAddress === -1) {
        Alert({
          text: `No se encontró la dirección de memoria de la función.
INSTRUCCIÓN: ${codop}, OPERANDO: ${operand1}, FUNCIÓN: ${item.id}`,
        });
        console.error(
          "No se encontró la dirección de memoria para la función:",
          item.id,
        );
        return;
      }

      // Actualizar el PC y los componentes
      useStore.getState().setComponents("UC", "PC");
      useStore.getState().setPCValue(newAddress);
    });

    // Verificar si el programa fue cancelado después de actualizar el PC
    if (!useStore.getState().cancelProgram) {
      useStore.getState().setPCValue(useStore.getState().items.length - 1);
      return;
    }
  } else {
    console.error(
      `El salto no fue realizado. INSTRUCCIÓN: ${codop}, Zero Flag: ${isZero}`,
    );
  }
};

/*
EI (JNZ)

(Por debajo) Se verifica si la flag “zero” de la instrucción anterior está en true
Iluminar arista UC, PSW
Si la flag Zero es True: 
(Por debajo) Se debe actualizar el valor del PC a la dirección de la “función + 1” para que continúe ejecutando la instrucción desde ahí.
Iluminar arista UC, PC
Empezar a ejecutar desde la instrucción con dirección “función + 1”

Si la flag Zero es False:
Continuar con la siguiente instrucción

A tener en cuenta con el JNZ

// Si existe el JNZ, debe existir la manera de declarar “funciones” con nombre para saltar a ellas o a su “posición de memoria”

Además, el JNZ debe verificar la instrucción anterior para ver si tiene la flag “ZF o zero flag”

*/
