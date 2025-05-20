import { Edge, MarkerType, Node } from "@xyflow/react";

const Memory: Node[] = [
  {
    id: "Memory",
    type: "PrincipalMemoryNode",
    position: { x: 500, y: 230 },
    data: { label: "Memory", active: false },
    draggable: false,
  },
  {
    id: "DM",
    type: "MemoryNode",
    position: { x: 30, y: 50 },
    data: { label: "DM", active: false },
    draggable: false,
    parentId: "Memory",
    extent: "parent",
  },
  {
    id: "PM",
    type: "MemoryNode",
    position: { x: 420, y: 50 },
    data: { label: "PM", active: false },
    draggable: false,
    parentId: "Memory",
    extent: "parent",
  },
];

const RegisterBank: Node[] = [
  {
    id: "RegisterBank",
    type: "RegisterBankNode",
    position: { x: 20, y: 180 },
    data: { label: "Register Bank", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "AL",
    type: "RegisterNode",
    position: { x: 20, y: 60 },
    data: { label: "AL", value: "00000000", active: false },
    draggable: false,
    parentId: "RegisterBank",
    extent: "parent",
  },
  {
    id: "BL",
    type: "RegisterNode",
    position: { x: 20, y: 120 },
    data: { label: "BL", value: "00000000", active: false },
    draggable: false,
    parentId: "RegisterBank",
    extent: "parent",
  },
  {
    id: "CL",
    type: "RegisterNode",
    position: { x: 20, y: 180 },
    data: { label: "CL", value: "00000000", active: false },
    draggable: false,
    parentId: "RegisterBank",
    extent: "parent",
  },
  {
    id: "DL",
    type: "RegisterNode",
    position: { x: 20, y: 240 },
    data: { label: "DL", value: "00000000", active: false },
    draggable: false,
    parentId: "RegisterBank",
    extent: "parent",
  },
];

const PSW: Node[] = [
  {
    id: "PSW",
    type: "PSWNode",
    position: { x: 230, y: 40 },
    data: { label: "PSW", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "ZERO",
    type: "FlagNode",
    position: { x: 10, y: 40 },
    data: { label: "ZERO" },
    draggable: false,
    parentId: "PSW",
    extent: "parent",
  },
  {
    id: "NAN",
    type: "FlagNode",
    position: { x: 10, y: 100 },
    data: { label: "NAN" },
    draggable: false,
    parentId: "PSW",
    extent: "parent",
  },
];

const ALU: Node[] = [
  {
    id: "ALU",
    type: "ALUNode",
    position: { x: 10, y: 20 },
    data: { label: "ALU", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "A",
    type: "ALUComponent",
    position: { x: 0, y: 0 },
    data: { label: "A" },
    draggable: false,
    parentId: "ALU",
    extent: "parent",
  },
  {
    id: "B",
    type: "ALUComponent",
    position: { x: 120, y: 0 },
    data: { label: "B" },
    draggable: false,
    parentId: "ALU",
    extent: "parent",
  },
  {
    id: "result",
    type: "ALUComponent",
    position: { x: 50, y: 60 },
    data: { label: "result" },
    draggable: false,
    parentId: "ALU",
    extent: "parent",
  },
];

const CPU: Node[] = [
  {
    id: "CPU",
    type: "CPUNode",
    position: { x: 0, y: 230 },
    data: { label: "CPU", active: false },
    draggable: false,
  },
  ...ALU,
  ...RegisterBank,
  ...PSW,
  {
    id: "IR",
    type: "ComputerNode",
    position: { x: 230, y: 220 },
    data: { label: "IR", value: "00000000", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "PC",
    type: "PCNode",
    position: { x: 230, y: 380 },
    data: { label: "PC", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "MAR",
    type: "ComputerNode",
    position: { x: 360, y: 40 },
    data: { label: "MAR", value: "00000000", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "MBR",
    type: "ComputerNode",
    position: { x: 360, y: 220 },
    data: { label: "MBR", value: "00000000", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "UC",
    type: "ComputerNode",
    position: { x: 360, y: 360 },
    data: { label: "UC", value: "00000000", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
];

export const initialNodes: Node[] = [
  ...Memory,
  ...CPU,
  {
    id: "DB",
    type: "BusNode",
    position: { x: 0, y: -10 },
    data: { label: "DB", value: "00000000", active: false },
    draggable: false,
  },
  {
    id: "AB",
    type: "BusNode",
    position: { x: 0, y: 70 },
    data: { label: "AB", value: "00000000", active: false },
    draggable: false,
  },
  {
    id: "CB",
    type: "BusNode",
    position: { x: 0, y: 150 },
    data: { label: "CB", value: "00000000", active: false },
    draggable: false,
  },
];

export const initialEdges: Edge[] = [
  {
    id: "initial",
    source: "PC",
    target: "PC",
    type: "smoothstep",
    animated: true,
    style: { stroke: "rgb(158, 118, 255)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  }, // PC -> MAR
];
