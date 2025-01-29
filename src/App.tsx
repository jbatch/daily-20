import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { Daily20App } from "./Daily20App";

function App() {
  return (
    <>
      <Daily20App />;
      <Toaster />
    </>
  );
}

export default App;
