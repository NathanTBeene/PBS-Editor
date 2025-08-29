import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/ui/Alert";
import { useAlertContext } from "./lib/providers/AlertProvider";

function App() {
  const { alertRef } = useAlertContext();

  return (
    <div className="App p-8 w-screen h-screen overflow-hidden bg-slate-900 flex flex-col gap-2 items-center justify-center text-white">
      <Navbar />
      <Outlet />
      <Alert ref={alertRef} />
    </div>
  );
}

export default App;
