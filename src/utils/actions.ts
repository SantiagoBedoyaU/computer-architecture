import useStore from "../store/useStore";

export const functionTime = async (thisfunction: () => void) => {
  const { timeout } = useStore.getState().COMPUTER;

  const waitUntilReady = async () => {
    return new Promise<void>((resolve) => {
      const check = () => {
        const { isPaused, isStepMode, stepRequested, clearStepRequest } =
          useStore.getState();

        if (!isPaused || (isStepMode && stepRequested)) {
          if (isStepMode && stepRequested) {
            clearStepRequest(); // Consumes step
          }
          resolve();
        } else {
          setTimeout(check, 500);
        }
      };
      check();
    });
  };

  await waitUntilReady();
  await new Promise((resolve) => setTimeout(resolve, timeout)); // Respeta el delay
  thisfunction();
};

export const waitForInputSend = async (callback: () => void) => {
  return new Promise<void>((resolve) => {
    const check = () => {
      const { inputSend } = useStore.getState().COMPUTER;

      if (inputSend) {
        callback();
        resolve();
      } else {
        setTimeout(check, 300);
      }
    };
    check();
  });
};

export const getBinary = (number: string | number): string => {
  if (typeof number === "number") {
    return `${(number & 0xff).toString(2).padStart(8, "0")}`;
  }
  return `${(Number(number) & 0xff).toString(2).padStart(8, "0")}`;
};
export const getDecimal = (binary: string): number => {
  return parseInt(binary, 2) & 0xff;
};
