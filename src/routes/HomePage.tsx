import Card from "../components/ui/Card";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-5xl font-bold">Essentials PBS Editor</h1>
      <p className="text-lg wrap-auto max-w-140 text-center">
        Click on the PBS data that you want to edit and have fun! If you need to
        change the values of constants you can head in and add what you want.
      </p>
      {/* Cards */}
      <div className="mt-15 mb-15 flex justify-center items-center gap-5">
        <Card
          className="w-30 h-30 flex items-center justify-center hover:w-35"
          onClick={() => navigate("/pokemon")}
        >
          <h2 className="text-xl text-center pointer-events-none">Pokemon</h2>
        </Card>
        <Card
          className="w-30 h-30 flex items-center justify-center hover:w-35"
          onClick={() => navigate("/moves")}
        >
          <h2 className="text-xl text-center">Moves</h2>
        </Card>
        <Card
          className="w-30 h-30 flex items-center justify-center hover:w-35"
          onClick={() => navigate("/abilities")}
        >
          <h2 className="text-xl text-center">Abilities</h2>
        </Card>
        <Card
          className="w-30 h-30 flex items-center justify-center hover:w-35"
          onClick={() => navigate("/constants")}
        >
          <h2 className="text-xl text-center">Constants</h2>
        </Card>
      </div>
      <p className="text-lg wrap-auto max-w-140 text-center">
        Editing things like moves and abilities will update the available
        choices in the dropdown menus.
      </p>
    </>
  );
};

export default HomePage;
