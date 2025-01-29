import "./App.css";
import { Toaster } from "./components/ui/toaster";
import Daily20Game from "./Daily20App";

function App() {
  return (
    <>
      <Daily20Game />;
      <Toaster />
    </>
  );
}

export default App;
