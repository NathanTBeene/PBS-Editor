import { useEffect, useRef, useState } from "react";
import { type Pokemon, defaultPokemon } from "@/lib/models/Pokemon";
import { importPokemon } from "@/lib/services/importPokemon";
import { useIndexedDB } from "../useIndexedDB";

export const usePokemonData = () => {
  const [isInit, setIsInit] = useState(true);
  const hasLoadedInitial = useRef(false);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]); // Set shouldn't be exported
  const [pokemonDefaults, setPokemonDefaults] = useState<Pokemon[]>([]); // Shouldn't be exported.
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const { savePokemon, loadPokemon, savePokemonDefaults, loadPokemonDefaults } =
    useIndexedDB();

  // If no Pokemon is selected, select the first one
  useEffect(() => {
    if (pokemon.length > 0 && !selectedPokemon) {
      setSelectedPokemon(
        pokemon.find((p) => p.id === "BULBASAUR") || pokemon[0]
      );
    }
  }, [pokemon, selectedPokemon]);

  useEffect(() => {
    // Fetch and set initial Pokémon data
    const fetchPokemon = async () => {
      try {
        console.log("Attempting to fetch Pokémon data from local PBS.");
        const response = await fetch("/src/assets/PBS/pokemon.txt");
        const data = await response.text();
        const parsedPokemon = importPokemon(data).sort(
          (a, b) => a.dexNumber - b.dexNumber
        );
        setPokemon(parsedPokemon);
        setPokemonDefaults(parsedPokemon);

        // Save to IndexDB
        await savePokemon(parsedPokemon);
        await savePokemonDefaults(parsedPokemon);
      } catch (error) {
        console.error("Failed to load pokemon.txt:", error);
      }
    };

    const fetchDefaults = async () => {
      try {
        console.warn("Pokemon Defaults were not found. Fetching from PBS.");
        const response = await fetch("/src/assets/PBS/pokemon.txt");
        const data = await response.text();
        const parsedPokemon = importPokemon(data).sort(
          (a, b) => a.dexNumber - b.dexNumber
        );
        setPokemonDefaults(parsedPokemon);

        // Save to IndexDB
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
          setPokemon(storedPokemon.sort((a, b) => a.dexNumber - b.dexNumber));
        } else {
          await fetchPokemon();
        }

        if (storedDefaults && storedDefaults.length > 0) {
          console.log("Loaded Pokémon defaults from IndexDB");
          setPokemonDefaults(storedDefaults);
        } else {
          fetchDefaults();
        }
      } catch (error) {
        console.log("IndexDb Error, falling back to fetch.", error);
        await fetchPokemon();
      }

      setIsInit(false);
    };

    loadData();
  }, []);

  // Save to indexedDB whenever Pokémon change.
  useEffect(() => {
    if (!isInit) {
      if (hasLoadedInitial.current) {
        console.log("Saving Pokémon to IndexDB");
        savePokemon(pokemon);
      }
    }
  }, [pokemon, isInit]);

  // For updating existing Pokémon data
  // This overrides all data at with the
  // specified unique ID.
  const setPokemonData = (data: Pokemon) => {
    setPokemon((prev) => prev.map((p) => (p.id === data.id ? data : p)));
  };

  const overridePokemonData = (id: string, data: Partial<Pokemon>) => {
    setPokemon((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
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
  const setPokemonToDefault = (id: string): boolean => {
    const defaultData = pokemonDefaults.find((p) => p.id === id);
    if (defaultData) {
      console.log(`Default data found for ${id}`);
      console.log(defaultData);
      setPokemon((prev) => prev.map((p) => (p.id === id ? defaultData : p)));
      return true;
    } else {
      console.log(`No default data found for ${id}`);
      return false;
    }
  };

  return {
    pokemon,
    setPokemon,
    setPokemonData,
    overridePokemonData,
    selectedPokemon,
    setSelectedPokemon,
    isPokemonInPokedex,
    addPokemon,
    removePokemon,
    resetPokemonData,
    setPokemonToDefault,
  };
};
