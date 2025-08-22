import { Outlet } from "react-router";

function App() {
  return (
    <div className="App p-8 w-screen h-screen overflow-hidden bg-slate-900 flex flex-col gap-2 items-center justify-center text-white">
      <Outlet />
    </div>
  );
}

export default App;
