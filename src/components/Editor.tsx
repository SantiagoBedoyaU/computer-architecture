import Editor, { Monaco } from "@monaco-editor/react";
import { useRef } from "react";
import { RiSave2Fill } from "react-icons/ri";
import useStore from "../store/useStore";
import { Alert } from "../utils/swal";

export const CodeEditor = () => {
  const createItem = useStore((store) => store.createItem);
  const handleClear = useStore((store) => store.handleClear);
  const editorRef = useRef(null);
  const handleEditorDidMount = (editor: any, _monaco: Monaco) => {
    editorRef.current = editor;
  };

  const registerOptions = ["AL", "BL", "CL", "DL"];

  const loadProgram = () => {
    handleClear();
    if (editorRef.current) {
      const code: string = editorRef.current.getValue();

      let lines = code.split("\n");
      lines = lines.filter((line) => line.trim().length > 0);
      let isSuccess = true;
      for (const line of lines) {
        const stms = line.trim().toUpperCase().split(" ");
        if (stms.length < 2) {
          Alert({
            text: `Operación incorrecta: "${line}"`,
          });
          isSuccess = false;
          break;
        }
        const [codop, parameters] = stms;
        switch (codop) {
          case "MOV":
            {
              const operands = parameters.split(",");
              if (operands.length < 2) {
                Alert({
                  text: "Para el CODOP MOV se necesitan 2 operandos",
                });
                isSuccess = false;
                break;
              }
              const register = operands[0];
              const value = parseInt(operands[1]);
              if (!registerOptions.includes(register)) {
                Alert({
                  text: "No se puede utilizar este registro",
                });
                isSuccess = false;
                break;
              }
              if (value > 127 || value < -127) {
                Alert({
                  text: "El valor no puede ser mayor a 127 ni menor a -127",
                });
                isSuccess = false;
              }
              createItem({
                codop,
                operand1: register,
                operand2: value.toString(),
              });
            }
            break;
          case "ADD":
            {
              const operands = parameters.split(",");
              if (operands.length != 2) {
                Alert({
                  text: "Para el CODOP ADD se necesitan 2 operandos",
                });
                isSuccess = false;
                break;
              }
              const register = operands[0];
              const value = operands[1];
              if (!registerOptions.includes(register)) {
                Alert({
                  text: "No se puede utilizar este registro" + ": " + value,
                });
                isSuccess = false;
                break;
              }
              const nValue = parseInt(value);
              if (Number.isNaN(nValue)) {
                // it's a register
                if (!registerOptions.includes(value)) {
                  Alert({
                    text: "No se puede utilizar este registro" + ": " + value,
                  });
                  isSuccess = false;
                }
                createItem({
                  codop,
                  operand1: register,
                  operand2: value,
                  type2: "REGISTER",
                });
              } else {
                // it's a number
                createItem({
                  codop,
                  operand1: register,
                  operand2: nValue.toString(),
                });
              }
            }
            break;
          case "DEC":
            {
              const operands = parameters.split(",");
              if (operands.length != 2) {
                Alert({
                  text: "Para el CODOP ADD se necesitan 2 operandos",
                });
                isSuccess = false;
                break;
              }
              const register = operands[0];
              const value = operands[1];
              if (!registerOptions.includes(register)) {
                Alert({
                  text: "No se puede utilizar este registro",
                });
                isSuccess = false;
                break;
              }
              const nValue = parseInt(value);
              if (Number.isNaN(nValue)) {
                // it's a register
                if (!registerOptions.includes(value)) {
                  Alert({
                    text: "No se puede utilizar este registro" + ": " + value,
                  });
                  isSuccess = false;
                }
                createItem({
                  codop,
                  operand1: register,
                  operand2: value,
                  type2: "REGISTER",
                });
              } else {
                // it's a number
                createItem({
                  codop,
                  operand1: register,
                  operand2: nValue.toString(),
                });
              }
            }
            break;
          case "DIV":
            {
              const operands = parameters.split(",");
              if (operands.length != 2) {
                Alert({
                  text: "Para el CODOP ADD se necesitan 2 operandos",
                });
                isSuccess = false;
                break;
              }
              const register = operands[0];
              const value = operands[1];
              if (!registerOptions.includes(register)) {
                Alert({
                  text: "No se puede utilizar este registro",
                });
                isSuccess = false;
                break;
              }
              const nValue = parseInt(value);
              if (Number.isNaN(nValue)) {
                // it's a register
                if (!registerOptions.includes(value)) {
                  Alert({
                    text: "No se puede utilizar este registro" + ": " + value,
                  });
                  isSuccess = false;
                }
                createItem({
                  codop,
                  operand1: register,
                  operand2: value,
                  type2: "REGISTER",
                });
              } else {
                // it's a number
                createItem({
                  codop,
                  operand1: register,
                  operand2: nValue.toString(),
                });
              }
            }
            break;
          case "MUL":
            {
              const operands = parameters.split(",");
              if (operands.length != 2) {
                Alert({
                  text: "Para el CODOP ADD se necesitan 2 operandos",
                });
                isSuccess = false;
                break;
              }
              const register = operands[0];
              const value = operands[1];
              if (!registerOptions.includes(register)) {
                Alert({
                  text: "No se puede utilizar este registro",
                });
                isSuccess = false;
                break;
              }
              const nValue = parseInt(value);
              if (Number.isNaN(nValue)) {
                // it's a register
                if (!registerOptions.includes(value)) {
                  Alert({
                    text: "No se puede utilizar este registro" + ": " + value,
                  });
                  isSuccess = false;
                  break;
                }
                createItem({
                  codop,
                  operand1: register,
                  operand2: value,
                  type2: "REGISTER",
                });
              } else {
                // it's a number
                createItem({
                  codop,
                  operand1: register,
                  operand2: nValue.toString(),
                });
              }
            }
            break;
          case "JMP":
            {
              const operands = parameters.split(",");
              if (operands.length != 1) {
                Alert({
                  text: "Para el CODOP JMP se necesita 1 operando",
                });
                isSuccess = false;
                break;
              }
              const value = operands[0];
              createItem({ codop, operand1: value });
            }
            break;
          case "JNZ": {
            const operands = parameters.split(",");
            if (operands.length != 1) {
              Alert({
                text: "Para el CODOP JNZ se necesita 1 operando",
              });
              isSuccess = false;
              break;
            }
            const value = operands[0];
            createItem({ codop, type1: "FUNCTION", operand1: value });
            break;
          }
          case "JZ": {
            const operands = parameters.split(",");
            if (operands.length != 1) {
              Alert({
                text: "Para el CODOP JZ se necesita 1 operando",
              });
              isSuccess = false;
              break;
            }
            const value = operands[0];
            createItem({ codop, type1: "FUNCTION", operand1: value });
            break;
          }
          case "LOAD":
            {
              const operands = parameters.split(",");
              if (operands.length != 2) {
                Alert({
                  text: "Para el CODOP LOAD se necesitan 2 operandos",
                });
                isSuccess = false;
                break;
              }
              const register = operands[0];
              const value = parseInt(operands[1]);
              if (!registerOptions.includes(register)) {
                Alert({
                  text: "No se puede utilizar este registro",
                });
                isSuccess = false;
                break;
              }
              if (value > 127 || value < 0) {
                Alert({
                  text: "El valor no puede ser mayor a 127 ni menor a 0",
                });
                isSuccess = false;
                break;
              }
              createItem({
                codop,
                type1: "REGISTER",
                operand1: register,
                type2: "NUMBER",
                operand2: value.toString(),
              });
            }
            break;
          case "STORE": {
            const operands = parameters.split(",");
            if (operands.length != 2) {
              Alert({
                text: "Para el CODOP STORE se necesitan 2 operandos",
              });
              isSuccess = false;
              break;
            }
            const value = parseInt(operands[0]);
            if (value < 0 || value > 127) {
              Alert({
                text: "El valor no puede ser mayor a 127 ni menor a 0",
              });
              isSuccess = false;
              break;
            }
            const value1 = operands[1];
            const value1Int = parseInt(value1);
            if (Number.isNaN(value1Int)) {
              // it's a register
              if (!registerOptions.includes(value1)) {
                Alert({
                  text: "No se puede utilizar este registro" + ": " + value,
                });
                isSuccess = false;
                break;
              }
              createItem({
                codop,
                operand1: value.toString(),
                type1: "NUMBER",
                operand2: value1,
                type2: "REGISTER",
              });
            } else {
              if (value1Int > 127 || value1Int < 0) {
                Alert({
                  text: "El valor no puede ser mayor a 127 ni menor a 0",
                });
                isSuccess = false;
                break;
              }
              // it's a number
              createItem({
                codop,
                operand1: value.toString(),
                operand2: value1Int.toString(),
              });
            }
            break;
          }
          case "FUNC": {
            const operands = parameters.split(",");
            if (operands.length != 1) {
              Alert({
                text: "Para el CODOP FNC se necesita un solo operando",
              });
              isSuccess = false;
              break;
            }
            createItem({
              codop,
              type1: "ASIGNFUNCTION",
              operand1: parameters,
            });
            break;
          }
          case "INPUT": {
            const operands = parameters.split(",");
            if (operands.length != 1) {
              Alert({
                text: "Para el CODOP STORE se necesita un solo operando",
              });
              isSuccess = false;
              break;
            }
            const value1 = parameters;
            const value1Int = parseInt(value1);
            if (Number.isNaN(value1Int)) {
              // it's a register
              if (!registerOptions.includes(value1)) {
                Alert({
                  text: "No se puede utilizar este registro" + ": " + value1,
                });
                isSuccess = false;
                break;
              }
              createItem({
                codop,
                operand1: value1.toString(),
                type1: "REGISTER",
              });
            } else {
              if (value1Int > 127 || value1Int < 0) {
                Alert({
                  text: "El valor no puede ser mayor a 127 ni menor a 0",
                });
                isSuccess = false;
                break;
              }
              // it's a number
              createItem({
                codop,
                operand1: value1Int.toString(),
                type1: "NUMBER",
              });
            }
            break;
          }
          case "OUTPUT": {
            const operands = parameters.split(",");
            if (operands.length != 1) {
              Alert({
                text: "Para el CODOP STORE se necesita un solo operando",
              });
              isSuccess = false;
              break;
            }
            const value1 = parameters;
            const value1Int = parseInt(value1);
            if (Number.isNaN(value1Int)) {
              // it's a register
              if (!registerOptions.includes(value1)) {
                Alert({
                  text: "No se puede utilizar este registro" + ": " + value1,
                });
                isSuccess = false;
                break;
              }
              createItem({
                codop,
                operand1: value1.toString(),
                type1: "REGISTER",
              });
            } else {
              if (value1Int > 127 || value1Int < 0) {
                Alert({
                  text: "El valor no puede ser mayor a 127 ni menor a 0",
                });
                isSuccess = false;
                break;
              }
              // it's a number
              createItem({
                codop,
                operand1: value1Int.toString(),
                type1: "NUMBER",
              });
            }
            break;
          }
          default:
            Alert({
              text: "CODOP no soportado",
            });
            break;
        }
      }

      if (isSuccess) {
        Alert({
          text: "Programa cargado correctamente",
          icon: "success",
          title: "Programa cargado",
        });
      } else {
        handleClear();
      }
    }
  };

  return (
    <div className="flex h-[100vh] w-fit flex-col items-center gap-2 bg-gray-300 py-2 text-black">
      <h1 className="text-xl font-bold">Instrucciones</h1>
      <Editor
        height="90vh"
        width="35vw"
        defaultLanguage="asm"
        theme="light"
        defaultValue={`INPUT 0
LOAD AL,0
MOV BL,1
FUNC fac
MUL BL,AL
DEC AL,1
JNZ fac
STORE 1,BL
OUTPUT 1`}
        onMount={handleEditorDidMount}
      />

      <button
        className={`bottom-2 flex max-w-[280px] items-center justify-center gap-2 rounded-lg bg-[#8045E6] px-4 py-2 font-medium text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50`}
        onClick={loadProgram}
      >
        <RiSave2Fill />
        Cargar Instrucciones
      </button>
    </div>
  );
};
