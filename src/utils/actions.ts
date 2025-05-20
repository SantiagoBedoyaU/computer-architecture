import useStore from "../store/useStore";

export const functionTime = (thisfunction: () => void) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      thisfunction();
      resolve(true);
    }, useStore.getState().COMPUTER.timeout);
  });
};

export const getBinary = (number: string | number): string => {
  if (typeof number === "number") {
    return `${(number & 0xff).toString(2).padStart(8, "0")}`;
  }
  return `${(Number(number) & 0xff).toString(2).padStart(8, "0")}`;
};
