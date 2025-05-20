import useStore from "../store/useStore";

export const malumaInstruction = async () => {
  if (!useStore.getState().cancelProgram) {
    useStore.getState().setPCValue(useStore.getState().items.length - 1);
    return;
  }

  return;
};
