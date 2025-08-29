import { useEffect, useRef, useState } from "react";
import { defaultAbility, type Ability } from "@/lib/models/Ability";
import { useIndexedDB } from "../useIndexedDB";
import { importAbilities } from "@/lib/services/importAbilities";

export const useAbilityData = () => {
  const [isInit, setIsInit] = useState(true);
  const hasLoadedInitial = useRef(false);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [abilityDefaults, setAbilityDefaults] = useState<Ability[]>([]);
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);

  const {
    saveAbilities,
    loadAbilities,
    saveAbilityDefaults,
    loadAbilityDefaults,
  } = useIndexedDB();

  // Select the first ability by default
  useEffect(() => {
    if (abilities.length > 0 && !selectedAbility) {
      setSelectedAbility(abilities[0]);
    }
  }, [abilities, selectedAbility]);

  useEffect(() => {
    // Fetch and set initial Ability data
    const fetchAbilities = async () => {
      try {
        console.log("Attempting to fetch Ability data from local PBS.");
        const response = await fetch("/src/assets/PBS/abilities.txt");
        const data = await response.text();
        const parsedAbilities = importAbilities(data);
        setAbilities(parsedAbilities);
        setAbilityDefaults(parsedAbilities);

        // Save to IndexDB
        await saveAbilities(parsedAbilities);
        await saveAbilityDefaults(parsedAbilities);
      } catch (error) {
        console.error("Failed to load abilities.txt:", error);
      }
    };

    const fetchDefaults = async () => {
      try {
        console.warn("Ability Defaults were not found. Fetching from PBS.");
        const response = await fetch("/src/assets/PBS/abilities.txt");
        const data = await response.text();
        const parsedAbilities = importAbilities(data);
        setAbilityDefaults(parsedAbilities);

        // Save to IndexDB
        await saveAbilityDefaults(parsedAbilities);
      } catch (error) {
        console.error("Failed to load abilities.txt:", error);
      }
    };

    const loadData = async () => {
      try {
        console.log("Attempting to load Ability data from IndexDB.");
        // Try loading from IndexDB First
        const storedAbilities = await loadAbilities();
        const storedDefaults = await loadAbilityDefaults();

        if (storedAbilities && storedAbilities.length > 0) {
          console.log("Loaded Abilities from IndexDB");
          setAbilities(storedAbilities);
        } else {
          await fetchAbilities();
        }

        if (storedDefaults && storedDefaults.length > 0) {
          console.log("Loaded Ability defaults from IndexDB");
          setAbilityDefaults(storedDefaults);
        } else {
          await fetchDefaults();
        }
      } catch (error) {
        console.log("IndexDb Error, falling back to fetch.", error);
        await fetchAbilities();
      }

      setIsInit(false);
    };

    loadData();
  }, []);

  // Save to indexedDB whenever Ability change.
  useEffect(() => {
    if (!isInit) {
      if (hasLoadedInitial.current) {
        console.log("Saving Abilities to IndexDB");
        saveAbilities(abilities);
      }
    }
  }, [abilities, abilityDefaults]);

  const setAbilityData = (data: Ability) => {
    setAbilities((prev) => prev.map((a) => (a.id === data.id ? data : a)));
  };

  const isAbilityInPokedex = (id: string) => {
    return !!abilities.find((a) => a.id === id);
  };

  const addAbility = (id: string, baseAbility?: Ability) => {
    const data = { ...(baseAbility || defaultAbility) };

    data.id = id.trim().toUpperCase();
    data.name = id.trim();
    setAbilities((prev) => [...prev, data]);
    return data;
  };

  const removeAbility = (id: string) => {
    setAbilities((prev) => prev.filter((a) => a.id !== id));
  };

  const resetAbilityData = () => {
    setAbilities(abilityDefaults);
  };

  const setAbilityToDefault = (id: string) => {
    const defaultData = abilityDefaults.find((a) => a.id === id);
    if (defaultData) {
      setAbilities((prev) => prev.map((a) => (a.id === id ? defaultData : a)));
    }
  };

  return {
    abilities,
    setAbilityData,
    selectedAbility,
    setSelectedAbility,
    isAbilityInPokedex,
    addAbility,
    removeAbility,
    resetAbilityData,
    setAbilityToDefault,
  };
};
