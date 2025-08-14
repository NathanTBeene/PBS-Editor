import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import PokemonPage from "./routes/PokemonPage.tsx";
import { PokedexProvider } from "./lib/providers/PokedexProvider.tsx";
import HomePage from "./routes/HomePage.tsx";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <PokedexProvider>
    <RouterProvider router={router} />
  </PokedexProvider>
);
