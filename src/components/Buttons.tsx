import { CODOPS } from "../interfaces/CODOP";
import useStore from "../store/useStore";
import "./program/customScrollbar.css";

export const Buttons = () => {
  const createItem = useStore((store) => store.createItem);
  const isProgamRunning = useStore((store) => store.isProgamRunning);

  const buttonsItems = [
    {
      title: "Almacenamiento",
      items: [
        { codop: "MOV", color: "border-orange-600 bg-orange-400" },
        { codop: "STORE", color: "border-cyan-600 bg-cyan-400" },
        { codop: "LOAD", color: "border-lime-600 bg-lime-400" },
      ],
    },
    {
      title: "Control",
      items: [
        { codop: "MALUMA", color: "border-amber-600 bg-amber-400" },
        { codop: "JMP", color: "border-purple-600 bg-purple-400" },
        { codop: "JNZ", color: "border-teal-600 bg-teal-400" },
        { codop: "JZ", color: "border-pink-600 bg-pink-400" },
      ],
    },
    {
      title: "Procesamiento",
      items: [
        { codop: "ADD", color: "border-green-600 bg-green-400" },
        { codop: "DEC", color: "border-yellow-600 bg-yellow-400" },
        { codop: "MUL", color: "border-indigo-600 bg-indigo-400" },
        { codop: "DIV", color: "border-red-600 bg-red-400" },
      ],
    },
  ];

  const handleCreate = (codop: keyof typeof CODOPS) => {
    switch (codop) {
      case "MALUMA":
        {
          createItem({ codop, type1: "ASIGNFUNCTION", operand1: "function" });
        }
        break;
      case "JNZ":
        {
          createItem({ codop, type1: "FUNCTION", operand1: "function" });
        }
        break;
      case "JZ":
        {
          createItem({ codop, type1: "FUNCTION", operand1: "function" });
        }
        break;
      case "STORE":
        {
          createItem({ codop, type1: "NUMBER", operand1: "0" });
        }
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

      default:
        {
          createItem({ codop });
        }
        break;
    }
  };

  return (
    <div className="flex h-[90vh] flex-col">
      <div className="w-fit rounded-t-lg bg-stone-500 p-2">
        <h1 className="text-xl font-bold">Instrucciones</h1>
      </div>
      <div className="custom-scrollbar flex flex-col gap-5 overflow-y-auto rounded-b-lg rounded-tr-lg bg-stone-500 p-2">
        {buttonsItems.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">{item.title}</h1>
            {item.items.map((sub, index) => (
              <button
                key={sub.codop + index}
                onClick={() => handleCreate(sub.codop as keyof typeof CODOPS)}
                className={`rounded-lg border-2 bg-gradient-to-r ${isProgamRunning ? "border-gray-600 bg-gray-400" : sub.color} px-5 py-2.5 font-medium text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                disabled={isProgamRunning}
              >
                {sub.codop}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
