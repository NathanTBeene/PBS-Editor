import React, { createContext, useContext } from "react";
import { usePokedex } from "../hooks/usePokedex";

const PokedexContext = createContext<ReturnType<typeof usePokedex> | undefined>(
  undefined
);

export const PokedexProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pokedex = usePokedex();
  return (
    <PokedexContext.Provider value={pokedex}>
      {children}
    </PokedexContext.Provider>
  );
};

export const usePokedexContext = () => {
  const context = useContext(PokedexContext);
  if (!context) {
    throw new Error("usePokedexContext must be used within a PokedexProvider");
  }
  return context;
};
