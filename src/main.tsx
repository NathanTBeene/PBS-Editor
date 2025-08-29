import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import PokemonPage from "./routes/PokemonPage.tsx";
import { PokedexProvider } from "./lib/providers/PokedexProvider.tsx";
import HomePage from "./routes/HomePage.tsx";
import ConstantsPage from "./routes/ConstantsPage.tsx";
import AbilitiesPage from "./routes/AbilitiesPage.tsx";
import MovesPage from "./routes/MovesPage.tsx";
import { AlertProvider } from "./lib/providers/AlertProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Page not found</div>,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/pokemon",
        element: <PokemonPage />,
      },
      {
        path: "/constants",
        element: <ConstantsPage />,
      },
      {
        path: "/moves",
        element: <MovesPage />,
      },
      {
        path: "/abilities",
        element: <AbilitiesPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AlertProvider>
    <PokedexProvider>
      <RouterProvider router={router} />
    </PokedexProvider>
  </AlertProvider>
);
