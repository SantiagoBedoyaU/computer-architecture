import { Handle, Position } from "@xyflow/react";
import React from "react";
import { cycleStrokeColors } from "../interfaces/Cycles";
import useStore from "../store/useStore";
import { getBinary } from "../utils/actions";

type ComputerNodeProps = {
  data: {
    label: string;
    value: string;
    active: boolean;
    visible?: boolean;
    sourceHandleTop?: number;
    targetHandleTop?: number;
    sourceHandleSide?: string;
    targetHandleSide?: string;
  };
};

const globalNodeStyle: React.CSSProperties = {
  padding: "8px",
  borderRadius: "5px",
  width: "100px",
  textAlign: "center",
};

export const CPUNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    position: "relative",
    width: "480px",
    height: "600px",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
    </div>
  );
};

export const PSWNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { label, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    backgroundColor: `${active ? cycleStrokeColors[currentCycle] : "white"}`,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    position: "relative",
    height: "160px",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
    </div>
  );
};

export const FlagNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { PSW } = useStore((store) => store.COMPUTER);
  const { label } = data;

  if (label === "ZERO") {
    const nodeStyle: React.CSSProperties = {
      ...globalNodeStyle,
      backgroundColor: `2px solid ${PSW.zero ? "red" : "green"}`,
      border: `2px solid ${PSW.zero ? "red" : "green"}`,
      position: "relative",
      width: "80px",
    };

    return (
      <div style={nodeStyle}>
        <strong>{label}</strong>
      </div>
    );
  }

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    backgroundColor: `2px solid ${PSW.nan ? "red" : "green"}`,
    border: `2px solid ${PSW.nan ? "red" : "green"}`,
    position: "relative",
    width: "80px",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
    </div>
  );
};

export const ALUComponent: React.FC<ComputerNodeProps> = ({ data }) => {
  // const { currentCycle } = useStore((store) => store.COMPUTER);
  const { ALU } = useStore((store) => store.COMPUTER);
  const { label } = data;

  if (label === "A") {
    const nodeStyle: React.CSSProperties = {
      ...globalNodeStyle,
      width: "170px",
      display: "flex",
      flexDirection: "row",

      justifyContent: "space-between",
    };

    return (
      <div style={nodeStyle}>
        <strong>{label}</strong>
        <div>{getBinary(ALU.A)}</div>
      </div>
    );
  }

  if (label === "B") {
    const nodeStyle: React.CSSProperties = {
      ...globalNodeStyle,
      width: "170px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    };

    return (
      <div style={nodeStyle}>
        <strong>{label}</strong>
        <div>{getBinary(ALU.B)}</div>
      </div>
    );
  }

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    width: "170px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  return (
    <div style={nodeStyle}>
      <div>{label}</div>
      <div>{getBinary(ALU.result)}</div>
    </div>
  );
};

export const ALUNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { label, active } = data;

  // Estilos para el contenedor principal de la ALU
  const aluContainerStyle: React.CSSProperties = {
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    position: "relative",
    width: "190px",
    height: "200px",
  };

  // Estilo para la forma de la ALU
  // const aluStyle: React.CSSProperties = {
  //   width: "100%",
  //   height: "100%",
  //   backgroundColor: `${active ? cycleStrokeColors[currentCycle] : "white"}`,
  //   position: "relative",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "center",
  // };

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    top: "8px",
    left: "50%",
    transform: "translateX(-50%)",
    fontWeight: "bold",
  };

  return (
    <div style={aluContainerStyle}>
      <div style={labelStyle}>{label}</div>
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
    </div>
  );
};

export const RegisterNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    backgroundColor: `${active ? cycleStrokeColors[currentCycle] : "white"}`,
    width: "140px",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      <Handle type="source" position={Position.Right} id="sourceHandle" />
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" />
    </div>
  );
};

export const AddressNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { label, value, active, visible } = data;

  if (!visible) return null;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    backgroundColor: `${active ? cycleStrokeColors[currentCycle] : "white"}`,
    width: "320px",
    height: "48px",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" />
    </div>
  );
};

export const RegisterBankNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    width: "190px",
    height: "300px",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
    </div>
  );
};

export const MemoryNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    width: "360px",
    height: "428px",
    overflowY: "auto",
    overflowX: "hidden",
  };

  return (
    <div className="overflow-y-auto" style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      <Handle type="source" position={Position.Left} id="sourceHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" />
    </div>
  );
};

export const PrincipalMemoryNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    width: "420px",
    height: "940px",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      {/* <Handle type="source" position={Position.Right} id="sourceHandle" />
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" /> */}
    </div>
  );
};

export const ComputerNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    backgroundColor: `${active ? cycleStrokeColors[currentCycle] : "white"}`,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      <Handle type="source" position={Position.Right} id="sourceHandle" />
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" />
    </div>
  );
};

export const PCNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { PC } = useStore((store) => store.COMPUTER);
  const { label, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    backgroundColor: `${active ? cycleStrokeColors[currentCycle] : "white"}`,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{PC === -1 ? getBinary(0) : getBinary(PC)}</div>
      <Handle type="source" position={Position.Right} id="sourceHandle" />
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" />
    </div>
  );
};

export const BusNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const {
    label,
    value,
    active,
    sourceHandleTop,
    sourceHandleSide,
    targetHandleTop,
    targetHandleSide,
  } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    backgroundColor: active ? cycleStrokeColors[currentCycle] : "white",
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    width: "100px",
    height: "940px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div style={{ marginTop: "auto", marginBottom: "auto" }}>{value}</div>

      {/* Source Handle dinámico */}
      <Handle
        type="source"
        position={sourceHandleSide === "left" ? Position.Left : Position.Right}
        id="sourceHandle"
        style={{
          top: sourceHandleTop ?? 500,
          [sourceHandleSide ?? "right"]: "0px",
        }}
      />

      {/* Target Handle dinámico */}
      <Handle
        type="target"
        position={targetHandleSide === "left" ? Position.Left : Position.Right}
        id="targetHandle"
        style={{
          top: targetHandleTop ?? 200,
          [targetHandleSide ?? "left"]: "0px",
        }}
      />
    </div>
  );
};
