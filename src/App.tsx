import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="App p-8 w-screen h-screen overflow-hidden bg-slate-900 flex flex-col gap-2 items-center justify-center text-white">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
