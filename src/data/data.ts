import { Edge, MarkerType, Node } from "@xyflow/react";

const Memory: Node[] = [
  {
    id: "Memory",
    type: "PrincipalMemoryNode",
    position: { x: 860, y: -10 },
    data: { label: "Memoria", active: false },
    draggable: false,
  },
  {
    id: "DM",
    type: "MemoryNode",
    position: { x: 30, y: 500 },
    data: { label: "Datos", active: false },
    draggable: false,
    parentId: "Memory",
    extent: "parent",
  },
  {
    id: "PM",
    type: "MemoryNode",
    position: { x: 30, y: 50 },
    data: { label: "Programa", active: false },
    draggable: false,
    parentId: "Memory",
    extent: "parent",
  },
];

const RegisterBank: Node[] = [
  {
    id: "RegisterBank",
    type: "RegisterBankNode",
    position: { x: 10, y: 270 },
    data: { label: "Registros", active: false },
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
    position: { x: 230, y: 50 },
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
    position: { x: 10, y: 50 },
    data: { label: "ALU", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "A",
    type: "ALUComponent",
    position: { x: 10, y: 50 },
    data: { label: "A ---->" },
    draggable: false,
    parentId: "ALU",
    extent: "parent",
  },
  {
    id: "B",
    type: "ALUComponent",
    position: { x: 10, y: 90 },
    data: { label: "B ---->" },
    draggable: false,
    parentId: "ALU",
    extent: "parent",
  },
  {
    id: "result",
    type: "ALUComponent",
    position: { x: 10, y: 130 },
    data: { label: "R ---->" },
    draggable: false,
    parentId: "ALU",
    extent: "parent",
  },
];

const CPU: Node[] = [
  {
    id: "CPU",
    type: "CPUNode",
    position: { x: 0, y: -10 },
    data: { label: "CPU", active: false },
    draggable: false,
  },
  ...ALU,
  ...RegisterBank,
  ...PSW,
  {
    id: "IR",
    type: "ComputerNode",
    position: { x: 230, y: 270 },
    data: { label: "IR", value: "00000000", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "PC",
    type: "PCNode",
    position: { x: 230, y: 500 },
    data: { label: "PC", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "MAR",
    type: "ComputerNode",
    position: { x: 360, y: 500 },
    data: { label: "MAR", value: "00000000", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "MBR",
    type: "ComputerNode",
    position: { x: 360, y: 270 },
    data: { label: "MBR", value: "00000000", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
  {
    id: "UC",
    type: "ComputerNode",
    position: { x: 360, y: 50 },
    data: { label: "UC", value: "00000000", active: false },
    draggable: false,
    parentId: "CPU",
    extent: "parent",
  },
];
const IO: Node[] = [
  {
    id: "IO",
    type: "IONode",
    position: { x: 0, y: 610 },
    data: {
      label: "Entrada/Salida",
      active: false,
      sourceHandleTop: 140,
      sourceHandleSide: "right", // o "left"
      targetHandleTop: 180,
      targetHandleSide: "right",
    },
    draggable: false,
  },
  {
    id: "KB",
    type: "IOComponentNode",
    position: { x: 40, y: 60 },
    data: { label: "Teclado", active: false },
    draggable: false,
    parentId: "IO",
    extent: "parent",
  },
  {
    id: "Display",
    type: "IOComponentNode",
    position: { x: 40, y: 190 },
    data: { label: "Monitor", active: false },
    draggable: false,
    parentId: "IO",
    extent: "parent",
  },
];

export const initialNodes: Node[] = [
  ...Memory,
  ...CPU,
  {
    id: "DB",
    type: "BusNode",
    position: { x: 500, y: -10 },
    data: {
      label: "Bus de datos",
      value: "00000000",
      active: false,
      sourceHandleTop: 325,
      sourceHandleSide: "left", // o "left"
      targetHandleTop: 500,
      targetHandleSide: "right",
    },
    draggable: false,
  },
  {
    id: "AB",
    type: "BusNode",
    position: { x: 620, y: -10 },
    data: {
      label: "Bus de direcciones",
      value: "00000000",
      active: false,
      sourceHandleTop: 260,
      sourceHandleSide: "right", // o "left"
      targetHandleTop: 530,
      targetHandleSide: "left",
    },
    draggable: false,
  },
  {
    id: "CB",
    type: "BusNode",
    position: { x: 740, y: -10 },
    data: {
      label: "Bus de control",
      value: "00000000",
      active: false,
      sourceHandleTop: 500,
      sourceHandleSide: "right", // o "left"
      targetHandleTop: 110,
      targetHandleSide: "left",
    },
    draggable: false,
  },
  ...IO,
];

export const initialEdges: Edge[] = [
  {
    id: "initial",
    source: "PC",
    target: "PC",
    type: "smoothstep",
    animated: false,
    style: { stroke: "rgb(158, 118, 255)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  }, // PC -> MAR
];
