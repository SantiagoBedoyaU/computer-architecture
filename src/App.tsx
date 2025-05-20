import { Buttons } from "./components/Buttons";
import { Components } from "./components/Components";
import { CodeEditor } from "./components/Editor";
import { Program } from "./components/program/Program";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 md:px-0">
      <div className="flex w-full max-w-[1600px] flex-col flex-wrap justify-evenly gap-8 md:flex-row md:gap-0">
        {/* <Buttons />
        <Program /> */}
        <CodeEditor />
        <Components />
      </div>
    </div>
  );
}

export default App;
