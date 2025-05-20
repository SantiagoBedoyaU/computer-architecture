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
    height: "500px",
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
      width: "80px",
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
      width: "80px",
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
    width: "80px",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{getBinary(ALU.result)}</div>
    </div>
  );
};

export const ALUNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { currentCycle } = useStore((store) => store.COMPUTER);
  const { label, active } = data;

  // Estilos para el contenedor principal de la ALU
  const aluContainerStyle: React.CSSProperties = {
    position: "relative",
    width: "190px",
    height: "140px",
  };

  // Estilo para la forma de la ALU
  const aluStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: `${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    clipPath:
      "polygon(0% 0%, 35% 0%, 50% 30%, 65% 0%, 100% 0%, 100% 60%, 50% 100%, 0% 60%)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={aluContainerStyle}>
      <div style={aluStyle}>
        <strong style={{ marginBottom: "40px" }}>{label}</strong>
      </div>
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
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
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
    width: "180px",
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
    width: "820px",
    height: "500px",
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

  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? cycleStrokeColors[currentCycle] : "gray"}`,
    width: "1320px",
    height: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Right} id="targetHandle" />
    </div>
  );
};
