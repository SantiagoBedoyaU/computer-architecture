import React, { useEffect, useState } from "react";
import { ProgramItem, TypeOperand } from "../../store/createProgramSlice";
import useStore from "../../store/useStore";

interface ItemProps {
  children?: React.ReactNode;
  id: string;
}

export function Item({ children, id }: ItemProps) {
  const items = useStore((store) => store.items);
  const setOperand = useStore((store) => store.setOperand);
  const setType = useStore((store) => store.setType);
  const [currentItem, setCurrentItem] = useState<ProgramItem | undefined>();
  const isProgamRunning = useStore((store) => store.isProgamRunning);

  useEffect(() => {
    setCurrentItem(items.find((item) => item.id === id));
  }, [items, id]);

  if (!currentItem) return;

  const buttons = React.Children.toArray(children);

  const DefaultItem = ({
    className,
    children,
    noCodop,
  }: {
    className: string;
    children?: React.ReactNode;
    noCodop?: boolean;
  }) => {
    return (
      <div
        className={`${className} flex h-12 w-full items-center gap-2 rounded-md border-2 px-2 text-white shadow-md`}
      >
        {buttons[0]}
        {!noCodop && <span className="font-bold">{currentItem.codop}</span>}
        {children}
        {buttons[1]}
      </div>
    );
  };

  const registerOptions = ["AL", "BL", "CL", "DL"];

  switch (currentItem.codop) {
    case "ADD":
      return (
        <DefaultItem className="border-green-600 bg-green-400">
          <select
            className="text-black"
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            defaultValue={currentItem.operand1}
            disabled={isProgamRunning}
          >
            {registerOptions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
          <select
            className="text-black"
            defaultValue={currentItem.type2}
            onChange={(e) =>
              setType(id, "type2", e.target.value as TypeOperand)
            }
            disabled={isProgamRunning}
          >
            <option value="REGISTER">REGISTER</option>
            <option value="NUMBER">NUMBER</option>
          </select>
          {currentItem.type2 === "REGISTER" && (
            <select
              className="text-black"
              defaultValue={currentItem.operand2}
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              disabled={isProgamRunning}
            >
              {registerOptions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          )}
          {currentItem.type2 === "NUMBER" && (
            <input
              className="w-12 text-black"
              defaultValue={currentItem.operand2}
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              type="number"
              max={127}
              min={-127}
              disabled={isProgamRunning}
            />
          )}
        </DefaultItem>
      );

    case "DEC":
      return (
        <DefaultItem className="border-yellow-600 bg-yellow-400">
          <select
            className="text-black"
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            defaultValue={currentItem.operand1}
            disabled={isProgamRunning}
          >
            {registerOptions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
          <select
            className="text-black"
            defaultValue={currentItem.type2}
            onChange={(e) =>
              setType(id, "type2", e.target.value as TypeOperand)
            }
            disabled={isProgamRunning}
          >
            <option value="REGISTER">REGISTER</option>
            <option value="NUMBER">NUMBER</option>
          </select>
          {currentItem.type2 === "REGISTER" && (
            <select
              className="text-black"
              defaultValue={currentItem.operand2}
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              disabled={isProgamRunning}
            >
              {registerOptions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          )}
          {currentItem.type2 === "NUMBER" && (
            <input
              className="w-12 text-black"
              defaultValue={currentItem.operand2}
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              type="number"
              max={127}
              min={-127}
              disabled={isProgamRunning}
            />
          )}
        </DefaultItem>
      );

    case "DIV":
      return (
        <DefaultItem className="border-red-600 bg-red-400">
          <select
            className="text-black"
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            defaultValue={currentItem.operand1}
            disabled={isProgamRunning}
          >
            {registerOptions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
          <select
            className="text-black"
            defaultValue={currentItem.type2}
            onChange={(e) =>
              setType(id, "type2", e.target.value as TypeOperand)
            }
            disabled={isProgamRunning}
          >
            <option value="REGISTER">REGISTER</option>
            <option value="NUMBER">NUMBER</option>
          </select>
          {currentItem.type2 === "REGISTER" && (
            <select
              className="text-black"
              defaultValue={currentItem.operand2}
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              disabled={isProgamRunning}
            >
              {registerOptions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          )}
          {currentItem.type2 === "NUMBER" && (
            <input
              className="w-12 text-black"
              defaultValue={currentItem.operand2}
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              type="number"
              max={127}
              min={-127}
              disabled={isProgamRunning}
            />
          )}
        </DefaultItem>
      );

    case "JMP":
      return (
        <DefaultItem className="border-purple-600 bg-purple-400">
          <input
            className="text-black"
            defaultValue={currentItem.operand1}
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            disabled={isProgamRunning}
          />
        </DefaultItem>
      );

    case "JNZ":
      return (
        <DefaultItem className="border-teal-600 bg-teal-400">
          <input
            className="text-black"
            defaultValue={currentItem.operand1}
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            disabled={isProgamRunning}
          />
        </DefaultItem>
      );

    case "JZ":
      return (
        <DefaultItem className="border-pink-600 bg-pink-400">
          <input
            className="text-black"
            defaultValue={currentItem.operand1}
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            disabled={isProgamRunning}
          />
        </DefaultItem>
      );

    case "MOV":
      return (
        <DefaultItem className="border-orange-600 bg-orange-400">
          <select
            className="text-black"
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            defaultValue={currentItem.operand1}
            disabled={isProgamRunning}
          >
            {registerOptions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
          <input
            className="w-12 text-black"
            defaultValue={currentItem.operand2}
            onChange={(e) => setOperand(id, "operand2", e.target.value)}
            type="number"
            max={127}
            min={-127}
            disabled={isProgamRunning}
          />
        </DefaultItem>
      );

    case "MUL":
      return (
        <DefaultItem className="border-indigo-600 bg-indigo-400">
          <select
            className="text-black"
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            defaultValue={currentItem.operand1}
            disabled={isProgamRunning}
          >
            {registerOptions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
          <select
            className="text-black"
            defaultValue={currentItem.type2}
            onChange={(e) =>
              setType(id, "type2", e.target.value as TypeOperand)
            }
            disabled={isProgamRunning}
          >
            <option value="REGISTER">REGISTER</option>
            <option value="NUMBER">NUMBER</option>
          </select>
          {currentItem.type2 === "REGISTER" && (
            <select
              className="text-black"
              defaultValue={currentItem.operand2}
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              disabled={isProgamRunning}
            >
              {registerOptions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          )}
          {currentItem.type2 === "NUMBER" && (
            <input
              className="w-12 text-black"
              defaultValue={currentItem.operand2}
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              type="number"
              max={127}
              min={-127}
              disabled={isProgamRunning}
            />
          )}
        </DefaultItem>
      );

    case "LOAD":
      return (
        <DefaultItem className="border-lime-600 bg-lime-400">
          <select
            className="text-black"
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            defaultValue={currentItem.operand1}
            disabled={isProgamRunning}
          >
            {registerOptions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>

          <select
            className="text-black"
            defaultValue={currentItem.operand2}
            onChange={(e) => setOperand(id, "operand2", e.target.value)}
            disabled={isProgamRunning}
          >
            {Array.from({ length: 128 }, (_, i) => (
              <option value={`${i}`}>{i}</option>
            ))}
          </select>
        </DefaultItem>
      );

    case "STORE":
      return (
        <DefaultItem className="border-cyan-600 bg-cyan-400">
          <select
            className="text-black"
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            defaultValue={currentItem.operand1}
            disabled={isProgamRunning}
          >
            {Array.from({ length: 128 }, (_, i) => (
              <option value={`${i}`}>{i}</option>
            ))}
          </select>
          <select
            className="text-black"
            defaultValue={currentItem.type2}
            onChange={(e) =>
              setType(id, "type2", e.target.value as TypeOperand)
            }
            disabled={isProgamRunning}
          >
            <option value="REGISTER">REGISTER</option>
            <option value="NUMBER">NUMBER</option>
          </select>
          {currentItem.type2 === "REGISTER" && (
            <select
              className="text-black"
              defaultValue={currentItem.operand2}
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              disabled={isProgamRunning}
            >
              {registerOptions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          )}
          {currentItem.type2 === "NUMBER" && (
            <input
              className="w-12 text-black"
              defaultValue={currentItem.operand2}
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              type="number"
              max={127}
              min={-127}
              disabled={isProgamRunning}
            />
          )}
        </DefaultItem>
      );

    case "MALUMA":
      return (
        <DefaultItem className="border-amber-600 bg-amber-400" noCodop>
          <input
            className="text-black"
            defaultValue={currentItem.operand1}
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            disabled={isProgamRunning}
          />
        </DefaultItem>
      );

    default:
      return (
        <div
          className={`flex h-12 w-full items-center gap-2 rounded-md border-2 border-gray-400 bg-gray-600 px-2 text-black shadow-md`}
        >
          <span className="font-bold">unknown</span>
          {buttons[1]}
        </div>
      );
  }
}
