import { useEffect, useState } from "react";
import {
  type Pokemon,
  type PokemonMove,
  defaultPokemon,
} from "@/lib/models/Pokemon";
import { importPokemon } from "@/lib/services/importPokemon";
import { useIndexedDB } from "../useIndexedDB";

export const usePokemonData = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]); // Set shouldn't be exported
  const [pokemonDefaults, setPokemonDefaults] = useState<Pokemon[]>([]); // Shouldn't be exported.
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const { savePokemon, loadPokemon, savePokemonDefaults, loadPokemonDefaults } =
    useIndexedDB();

  // If no Pokemon is selected, select the first one
  useEffect(() => {
    if (pokemon.length > 0 && !selectedPokemon) {
      setSelectedPokemon(pokemon.find((p) => p.id === "BULBASAUR") || null);
    }
  }, [pokemon, selectedPokemon]);

  useEffect(() => {
    // Fetch and set initial Pokémon data
    const fetchPokemon = async () => {
      try {
        console.log("Attempting to fetch Pokémon data from local PBS.");
        const response = await fetch("/src/assets/PBS/pokemon.txt");
        const data = await response.text();
        const parsedPokemon = importPokemon(data);
        setPokemon(parsedPokemon);
        setPokemonDefaults(parsedPokemon);

        // Save to IndexDB
        await savePokemon(parsedPokemon);
        await savePokemonDefaults(parsedPokemon);
      } catch (error) {
        console.error("Failed to load pokemon.txt:", error);
      }
    };

    const loadData = async () => {
      try {
        console.log("Attempting to load Pokémon data from IndexDB.");
        // Try loading from IndexDB First
        const storedPokemon = await loadPokemon();
        const storedDefaults = await loadPokemonDefaults();

        if (storedPokemon && storedPokemon.length > 0) {
          console.log("Loaded Pokémon from IndexDB");
          setPokemon(storedPokemon);
        } else {
          await fetchPokemon();
        }

        if (storedDefaults && storedDefaults.length > 0) {
          console.log("Loaded Pokémon defaults from IndexDB");
          setPokemonDefaults(storedDefaults);
        } else {
          setPokemonDefaults(storedPokemon);
        }
      } catch (error) {
        console.log("IndexDb Error, falling back to fetch.", error);
        await fetchPokemon();
      }
    };

    loadData();
  }, []);

  // Save to indexedDB whenever Pokémon change.
  useEffect(() => {
    savePokemon(pokemon);
    savePokemonDefaults(pokemonDefaults);
  }, [pokemon, pokemonDefaults]);

  // For updating existing Pokémon data
  const setPokemonData = (data: Pokemon) => {
    setPokemon((prev) => prev.map((p) => (p.id === data.id ? data : p)));
  };

  // Makes sure a Pokemon exists within the dex.
  // Must be the unique identifier (Ex. BULBASAUR)
  const isPokemonInPokedex = (id: string): boolean => {
    return !!pokemon.find((p) => p.id === id);
  };

  // Adds a new Pokémon to the dex.
  // Takes a baseMon to copy default values from
  // Otherwise uses the defaults.
  const addPokemon = (id: string, baseMon?: Pokemon): Pokemon => {
    const data = { ...(baseMon || defaultPokemon) };

    data.id = id.trim().toUpperCase();
    data.name = id.trim();
    data.dexNumber = 0;
    setPokemon((prev) => [...prev, data]);
    return data;
  };

  // Removes a Pokémon from the dex.
  const removePokemon = (id: string) => {
    setPokemon((prev) => prev.filter((p) => p.id !== id));
  };

  // Sets all pokemon back to their default values.
  const resetPokemonData = () => {
    setPokemon(pokemonDefaults);
  };

  // Sets a particular pokemon back to default.
  const setPokemonToDefault = (id: string) => {
    const defaultData = pokemonDefaults.find((p) => p.id === id);
    if (defaultData) {
      setPokemon((prev) => prev.map((p) => (p.id === id ? defaultData : p)));
    }
  };

  return {
    pokemon,
    setPokemon,
    setPokemonData,
    selectedPokemon,
    setSelectedPokemon,
    isPokemonInPokedex,
    addPokemon,
    removePokemon,
    resetPokemonData,
    setPokemonToDefault,
  };
};
