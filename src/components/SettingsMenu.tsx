import useStore from "../store/useStore";

interface SettingsMenuProps {
  children: React.ReactNode;
}

export const SettingsMenu = ({ children }: SettingsMenuProps) => {
  const currentCycle = useStore((store) => store.COMPUTER.currentCycle);

  return (
    <div className="m-4 flex justify-between">
      <div className="flex flex-col items-center justify-between gap-2">
        {children}
        <div>
          <div className="rounded-lg bg-orange-500 p-2 font-semibold text-black">
            <p>
              <span className="font-semibold">{currentCycle}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
