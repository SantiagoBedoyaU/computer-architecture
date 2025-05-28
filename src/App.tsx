import { Components } from "./components/Components";
import { CodeEditor } from "./components/Editor";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 md:px-0 md:py-0">
      <div className="flex w-full flex-col justify-evenly gap-8 md:flex-row md:gap-0">
        {/* <Buttons />
        <Program /> */}
        <CodeEditor />
        <Components />
      </div>
    </div>
  );
}

export default App;
