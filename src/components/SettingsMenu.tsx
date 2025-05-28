import { cycleBgColors } from "../interfaces/Cycles";
import useStore from "../store/useStore";

interface SettingsMenuProps {
  children: React.ReactNode;
}

export const SettingsMenu = ({ children }: SettingsMenuProps) => {
  // const isProgamRunning = useStore((store) => store.isProgamRunning);
  const currentCycle = useStore((store) => store.COMPUTER.currentCycle);
  // const throwConfetti = useStore((store) => store.throwConfetti);
  // const setThrowConfetti = useStore((store) => store.setThrowConfetti);

  return (
    <div className="m-4 flex justify-between">
      <div className="flex flex-col items-center justify-between gap-2">
        {children}

        <div
          className={`${cycleBgColors[currentCycle]} rounded-lg p-2 font-semibold text-white`}
        >
          <p>
            <span className="font-semibold">{currentCycle}</span>
          </p>
        </div>
      </div>
      {/* {isProgamRunning && (
        <button
          className={`bottom-2 mr-4 flex max-w-[280px] items-center justify-center gap-2 rounded-lg border px-4 py-2 font-medium text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${throwConfetti ? "border-gray-600 bg-gray-400" : "border-purple-800 bg-purple-600"}`}
          onClick={() => setThrowConfetti()}
          disabled={throwConfetti}
        >
          <RiErrorWarningFill />
          Interrumpir programa
        </button>
      )} */}
    </div>
  );
};
