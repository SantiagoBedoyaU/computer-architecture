import { create } from "zustand";
import createInstructionsSlice, {
  InstructionsSlice,
} from "./createInstructionsSlice";
import createProgramSlice, { ProgramSlice } from "./createProgramSlice";

const useStore = create<InstructionsSlice & ProgramSlice>()((...a) => ({
  ...createInstructionsSlice(...a),
  ...createProgramSlice(...a),
}));

export default useStore;
