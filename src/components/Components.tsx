import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import {
  RiCloseFill,
  RiErrorWarningFill,
  RiPauseFill,
  RiPlayLargeFill,
  RiSpeedFill,
} from "react-icons/ri";
import { initialEdges, initialNodes } from "../data/data";
import { run } from "../instructions/runProgram";
import { CODOPS } from "../interfaces/CODOP";
import { DataMemoryAddress } from "../interfaces/DataMemory";
import { Register, RegisterAddress } from "../interfaces/RegisterBank";
import useStore from "../store/useStore";
import { getBinary } from "../utils/actions";
import { Alert } from "../utils/swal";
import {
  AddressNode,
  ALUComponent,
  ALUNode,
  BusNode,
  ComputerNode,
  CPUNode,
  FlagNode,
  IOComponentNode,
  IONode,
  MemoryNode,
  PCNode,
  PrincipalMemoryNode,
  PSWNode,
  RegisterBankNode,
  RegisterNode,
} from "./ComputerNode";
import { SettingsMenu } from "./SettingsMenu";

const nodeTypes = {
  AddressNode,
  ALUComponent,
  ALUNode,
  BusNode,
  ComputerNode,
  CPUNode,
  FlagNode,
  IONode,
  IOComponentNode,
  MemoryNode,
  PCNode,
  PrincipalMemoryNode,
  PSWNode,
  RegisterBankNode,
  RegisterNode,
};

export const Components = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const interruption = useStore((store) => store.interruption);
  const setInterruption = useStore((store) => store.setInterruption);
  // const cancelProgram = useStore((store) => store.cancelProgram);
  const COMPUTER = useStore((store) => store.COMPUTER);
  const { PC } = useStore((store) => store.COMPUTER);
  const dataMemory = useStore((store) => store.dataMemory);
  const isProgamRunning = useStore((store) => store.isProgamRunning);
  const items = useStore((store) => store.items);
  const setCancelProgram = useStore((store) => store.setCancelProgram);
  const setIsProgamRunning = useStore((store) => store.setIsProgamRunning);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        const updatedNode = { ...node };

        if (node.id === "RegisterBank") return node;

        updatedNode.data = {
          ...updatedNode.data,
          active:
            node.id === COMPUTER.currentComponent ||
            node.id === COMPUTER.lastComponent,
        };

        if (COMPUTER.currentCycle === "DI" && node.id === "UC") {
          const nodeValue = COMPUTER.UC;
          updatedNode.data = {
            ...updatedNode.data,
            value: `${nodeValue.codop} ${getBinary(nodeValue.operand1)} ${getBinary(nodeValue.operand2)}`,
          };
          return updatedNode;
        }

        if (["AL", "BL", "CL", "DL"].includes(node.id)) {
          const registerValue = COMPUTER.RegisterBank[node.id as Register];
          updatedNode.data = {
            ...updatedNode.data,
            value: getBinary(registerValue),
          };
        } else if (updatedNode.id in COMPUTER) {
          const nodeValue = COMPUTER[updatedNode.id as keyof typeof COMPUTER];

          if (nodeValue && typeof nodeValue === "number") {
            updatedNode.data = {
              ...updatedNode.data,
              value: getBinary(nodeValue),
            };
          } else if (nodeValue && typeof nodeValue === "object") {
            if ("codop" in nodeValue) {
              if (["AL", "BL", "CL", "DL"].includes(nodeValue.operand1)) {
                if (["AL", "BL", "CL", "DL"].includes(nodeValue.operand2)) {
                  updatedNode.data = {
                    ...updatedNode.data,
                    value: `${CODOPS[nodeValue.codop as keyof typeof CODOPS]} ${RegisterAddress[nodeValue.operand1 as Register]} ${RegisterAddress[nodeValue.operand2 as Register]}`,
                  };
                  return updatedNode;
                }
                updatedNode.data = {
                  ...updatedNode.data,
                  value: `${CODOPS[nodeValue.codop as keyof typeof CODOPS]} ${RegisterAddress[nodeValue.operand1 as Register]} ${getBinary(nodeValue.operand2)}`,
                };
                return updatedNode;
              } else if (
                ["AL", "BL", "CL", "DL"].includes(nodeValue.operand2)
              ) {
                updatedNode.data = {
                  ...updatedNode.data,
                  value: `${CODOPS[nodeValue.codop as keyof typeof CODOPS]} ${getBinary(nodeValue.operand1)} ${RegisterAddress[nodeValue.operand2 as Register]}`,
                };
                return updatedNode;
              }

              updatedNode.data = {
                ...updatedNode.data,
                value: `${CODOPS[nodeValue.codop as keyof typeof CODOPS]} ${getBinary(nodeValue.operand1)} ${getBinary(nodeValue.operand2)}`,
              };
            }
          }
        }

        return updatedNode;
      }),
    );
  }, [COMPUTER, setNodes]);

  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        source: COMPUTER.lastComponent ?? edge.source,
        target: COMPUTER.currentComponent ?? edge.target,
        style: {
          ...edge.style,
          strokeWidth: 4,
          stroke: "black",
          animated: false,
          type: "default",
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "black",
        },
      })),
    );
  }, [COMPUTER, setEdges]);

  useEffect(() => {
    const NODE_HEIGHT = 50;
    const NODE_MARGIN = 10;
    console.log("Data Memory:", dataMemory);
    const newNodes = dataMemory.map((item, index) => ({
      id: item.operand1,
      type: "AddressNode",
      position: {
        x: 30,
        y: index === 0 ? 50 : 50 + index * (NODE_HEIGHT + NODE_MARGIN),
      },
      data: {
        label: DataMemoryAddress[item.operand1],
        value: `${getBinary(item.operand2)}`,
        active: false,
        visible: true,
      },
      draggable: false,
      parentId: "DM",
    }));

    setNodes((prevNodes) => {
      // Filtra los nodos que NO son de dataMemory
      const nodesWithoutMemory = prevNodes.filter(
        (node) => node.parentId !== "DM",
      );

      // Reemplaza todos los AddressNode con los nuevos
      return [...nodesWithoutMemory, ...newNodes];
    });
  }, [dataMemory, setNodes]);

  const handleOnClick = () => {
    if (items.length === 0) {
      Alert({
        text: "Se debe ingresar por lo menos una instrucción al programa",
      });
      return;
    }

    const NODE_HEIGHT = 50;
    const NODE_MARGIN = 10;

    const newNodes = items.map((item, index) => ({
      id: item.id,
      type: "AddressNode",
      position: {
        x: 30,
        y: index === PC ? 50 : 50 + (index - PC) * (NODE_HEIGHT + NODE_MARGIN),
      },
      data: {
        label: getBinary(index),
        value: `${CODOPS[item.codop as keyof typeof CODOPS]} ${getBinary(item.operand1)} ${getBinary(item.operand2)}`,
        active: false,
        instructionIndex: index,
        visible: index >= PC && index < PC + 6,
      },
      draggable: false,
      parentId: "PM",
    }));

    setNodes(() => [...initialNodes, ...newNodes]);
    setIsProgamRunning(true);
    useStore.getState().setIsPaused(true); // Empieza pausado
    useStore.getState().setIsStepMode(true); // Modo paso a paso activo
    useStore.getState().clearStepRequest(); // Limpia pasos previos
    run();
  };

  const handleContinue = () => {
    useStore.getState().setIsPaused(!useStore.getState().isPaused);
    if (useStore.getState().isPaused) {
      useStore.getState().clearStepRequest();
    } else {
      useStore.getState().requestStep();
    }
  };

  useEffect(() => {
    const NODE_HEIGHT = 50;
    const NODE_MARGIN = 10;

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (
          node.parentId === "PM" &&
          typeof node.data?.instructionIndex === "number"
        ) {
          const index = node.data.instructionIndex;

          const newY =
            index === PC ? 50 : 50 + (index - PC) * (NODE_HEIGHT + NODE_MARGIN);

          return {
            ...node,
            position: {
              ...node.position,
              y: newY,
            },
            data: {
              ...node.data,
              visible: index >= PC && index < PC + 6,
            },
          };
        }

        return node;
      }),
    );
  }, [PC]);

  const handleCancel = () => {
    setCancelProgram(false);
  };

  return (
    <div className="flex h-[100vh] flex-col items-center bg-gray-300 text-black">
      <h1 className="text-xl font-bold">Computador</h1>
      <div className="flex h-full flex-row gap-2 rounded-b-lg rounded-tr-lg p-2">
        <div className="flox-row flex h-full w-[300px] rounded-md md:w-[800px]">
          <SettingsMenu>
            <div className="flex flex-col items-center gap-2">
              {!isProgamRunning && (
                <button
                  className="bottom-2 flex max-w-[280px] items-center justify-center gap-2 rounded-lg bg-[#00ff66] px-4 py-2 font-medium text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  onClick={handleOnClick}
                >
                  <RiPlayLargeFill />
                </button>
              )}

              {isProgamRunning && (
                <div className="flex flex-col gap-2">
                  <button
                    className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white"
                    onClick={handleContinue}
                  >
                    {useStore.getState().isPaused ? (
                      <>
                        <RiPlayLargeFill />
                      </>
                    ) : (
                      <>
                        <RiPauseFill />
                      </>
                    )}
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
                    onClick={useStore.getState().requestStep}
                  >
                    <RiSpeedFill />
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 rounded-lg border-purple-800 bg-purple-600 px-4 py-2 text-white"
                    onClick={() => setInterruption()}
                    disabled={interruption}
                  >
                    <RiErrorWarningFill />
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white"
                    onClick={handleCancel}
                  >
                    <RiCloseFill />
                  </button>
                </div>
              )}
            </div>
          </SettingsMenu>
          <ReactFlow
            className="w-full bg-white"
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            nodeTypes={nodeTypes}
            nodesDraggable={false}
          >
            <Controls style={{ color: "black" }} showInteractive={false} />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};
