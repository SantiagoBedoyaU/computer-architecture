import Editor, { Monaco } from "@monaco-editor/react"
import { useRef } from "react"
import useStore from "../store/useStore";
import { Alert } from "../utils/swal";

export const CodeEditor = () => {
    const createItem = useStore((store) => store.createItem);
    const handleClear = useStore((store) => store.handleClear);
    const editorRef = useRef(null);
    const handleEditorDidMount = (editor: any, _monaco: Monaco) => {
        editorRef.current = editor;
    }
    const registerOptions = ["AL", "BL", "CL", "DL"];
    const loadProgram = () => {
        handleClear()
        const code: string = editorRef.current.getValue();
        const lines = code.split('\n')
        lines.filter(line => line.trim().length > 0).forEach(line => {
            const [codop, parameters] = line.trim().toUpperCase().split(" ")
            switch (codop) {
                case "MOV":
                    {
                        const operands = parameters.split(",");
                        if (operands.length < 2) {
                            Alert({
                                text: "Para el CODOP MOV se necesitan 2 operandos"
                            })
                            break
                        }
                        const register = operands[0];
                        const value = parseInt(operands[1])
                        if (!registerOptions.includes(register)) {
                            Alert({
                                text: "No se puede utilizar este registro"
                            })
                            break
                        }
                        if (value > 127 || value < -127) {
                            Alert({
                                text: "El valor no puede ser mayor a 127 ni menor a -127"
                            })
                        }
                        createItem({ codop, operand1: register, operand2: value.toString() })
                    }
                    break;
                case "ADD":
                    {
                        const operands = parameters.split(",");
                        if (operands.length < 2) {
                            Alert({
                                text: "Para el CODOP ADD se necesitan 2 operandos"
                            })
                            break
                        }
                        const register = operands[0];
                        const value = operands[1]
                        if (!registerOptions.includes(register)) {
                            Alert({
                                text: "No se puede utilizar este registro" + ": " + value
                            })
                            break
                        }
                        const nValue = parseInt(value)
                        if (Number.isNaN(nValue)) {
                            // it's a register
                            if (!registerOptions.includes(value)) {
                                Alert({
                                    text: "No se puede utilizar este registro" + ": " + value
                                })
                            }
                            createItem({ codop, operand1: register, operand2: value, type2: "REGISTER" })
                        } else {
                            // it's a number
                            createItem({ codop, operand1: register, operand2: nValue.toString() })
                        }
                    }
                    break;
                case "DEC":
                    {
                        const operands = parameters.split(",");
                        if (operands.length < 2) {
                            Alert({
                                text: "Para el CODOP ADD se necesitan 2 operandos"
                            })
                            break
                        }
                        const register = operands[0];
                        const value = operands[1]
                        if (!registerOptions.includes(register)) {
                            Alert({
                                text: "No se puede utilizar este registro"
                            })
                            break
                        }
                        const nValue = parseInt(value)
                        if (Number.isNaN(nValue)) {
                            // it's a register
                            if (!registerOptions.includes(value)) {
                                Alert({
                                    text: "No se puede utilizar este registro" + ": " + value
                                })
                            }
                            createItem({ codop, operand1: register, operand2: value, type2: "REGISTER" })
                        } else {
                            // it's a number
                            createItem({ codop, operand1: register, operand2: nValue.toString() })
                        }
                    }
                    break;
                case "DIV":
                    {
                        const operands = parameters.split(",");
                        if (operands.length < 2) {
                            Alert({
                                text: "Para el CODOP ADD se necesitan 2 operandos"
                            })
                            break
                        }
                        const register = operands[0];
                        const value = operands[1]
                        if (!registerOptions.includes(register)) {
                            Alert({
                                text: "No se puede utilizar este registro"
                            })
                            break
                        }
                        const nValue = parseInt(value)
                        if (Number.isNaN(nValue)) {
                            // it's a register
                            if (!registerOptions.includes(value)) {
                                Alert({
                                    text: "No se puede utilizar este registro" + ": " + value
                                })
                            }
                            createItem({ codop, operand1: register, operand2: value, type2: "REGISTER" })
                        } else {
                            // it's a number
                            createItem({ codop, operand1: register, operand2: nValue.toString() })
                        }
                    }
                    break;
                case "MUL":
                    {
                        const operands = parameters.split(",");
                        if (operands.length < 2) {
                            Alert({
                                text: "Para el CODOP ADD se necesitan 2 operandos"
                            })
                            break
                        }
                        const register = operands[0];
                        const value = operands[1]
                        if (!registerOptions.includes(register)) {
                            Alert({
                                text: "No se puede utilizar este registro"
                            })
                            break
                        }
                        const nValue = parseInt(value)
                        if (Number.isNaN(nValue)) {
                            // it's a register
                            if (!registerOptions.includes(value)) {
                                Alert({
                                    text: "No se puede utilizar este registro" + ": " + value
                                })
                            }
                            createItem({ codop, operand1: register, operand2: value, type2: "REGISTER" })
                        } else {
                            // it's a number
                            createItem({ codop, operand1: register, operand2: nValue.toString() })
                        }
                    }
                    break;
                case "JMP":
                    {
                        const operands = parameters.split(",")
                        if (operands.length < 2) {
                            Alert({
                                text: "Para el CODOP JMP se necesita 1 operando"
                            })
                            break
                        }
                        const value = operands[0];
                        createItem({ codop, operand1: value })
                    }
                    break;
                case "JNZ":
                    createItem({ codop, type1: "FUNCTION", operand1: "function" });
                    break;
                case "JZ":
                    createItem({ codop, type1: "FUNCTION", operand1: "function" });
                    break;
                case "LOAD":
                    {
                        createItem({
                            codop,
                            type1: "REGISTER",
                            operand1: "AL",
                            type2: "NUMBER",
                            operand2: "0",
                        });
                    }
                    break;
                case "STORE":
                    createItem({ codop, type1: "NUMBER", operand1: "0" });
                    break;
                default:
                    Alert({
                        text: "CODOP no soportado"
                    })
                    break;
            }
        })
    }

    // const handleCreate = (codop: keyof typeof CODOPS) => {
    //     switch (codop) {
    //         case "MALUMA":
    //             {
    //                 createItem({ codop, type1: "ASIGNFUNCTION", operand1: "function" });
    //             }
    //             break;
    //         case "JNZ":
    //             {
    //                 createItem({ codop, type1: "FUNCTION", operand1: "function" });
    //             }
    //             break;
    //         case "JZ":
    //             {
    //                 createItem({ codop, type1: "FUNCTION", operand1: "function" });
    //             }
    //             break;
    //         case "STORE":
    //             {
    //                 createItem({ codop, type1: "NUMBER", operand1: "0" });
    //             }
    //             break;
    //         case "LOAD":
    //             {
    //                 createItem({
    //                     codop,
    //                     type1: "REGISTER",
    //                     operand1: "AL",
    //                     type2: "NUMBER",
    //                     operand2: "0",
    //                 });
    //             }
    //             break;

    //         default:
    //             {
    //                 createItem({ codop });
    //             }
    //             break;
    //     }
    // };

    return (
        <div className="flex h-[90vh] flex-col">
            <div className="w-fit rounded-t-lg bg-stone-500 p-2">
                <h1 className="text-xl font-bold">Instrucciones</h1>
            </div>
            <div className="custom-scrollbar flex flex-col gap-5 overflow-y-auto rounded-b-lg rounded-tr-lg bg-stone-500 p-2">
                <Editor height="90vh" width="40vw" defaultLanguage="asm" theme="vs-dark" defaultValue="// some comment" onMount={handleEditorDidMount} />
                <button onClick={loadProgram}>Load instructions</button>
            </div>
        </div>
    )
}