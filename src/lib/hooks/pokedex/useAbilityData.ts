import { useEffect, useState } from "react";
import { defaultAbility, type Ability } from "@/lib/models/Ability";
import { useIndexedDB } from "../useIndexedDB";
import { importAbilities } from "@/lib/services/importAbilities";

export const useAbilityData = () => {
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
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

  // Fetch and set initial Ability data
  const fetchAbilities = async () => {
    try {
      console.log("Abilities not found. Fetching from PBS.");
      const response = await fetch("./PBS/abilities.txt");
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
      const response = await fetch("./PBS/abilities.txt");
      const data = await response.text();
      const parsedAbilities = importAbilities(data);
      setAbilityDefaults(parsedAbilities);

      // Save to IndexDB
      await saveAbilityDefaults(parsedAbilities);
    } catch (error) {
      console.error("Failed to load abilities.txt:", error);
    }
  };

  const loadAbilityData = async () => {
    try {
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

    setIsInitialLoadComplete(true);
    console.log("Finished loading Ability data.");
  };

  // Save to indexedDB whenever Abilities change (after initial load).
  useEffect(() => {
    if (isInitialLoadComplete) {
      console.log("Saving Abilities to IndexDB");
      saveAbilities(abilities);
    }
  }, [abilities]);

  const setAbilityData = (data: Ability) => {
    setAbilities((prev) => prev.map((a) => (a.id === data.id ? data : a)));
  };

  const importMerge = (importedAbilities: Ability[]) => {
    setAbilities((prev) => {
      const merged = [...prev];
      importedAbilities.forEach((imported) => {
        const existing = merged.find((a) => a.id === imported.id);
        if (existing) {
          Object.assign(existing, imported);
        } else {
          merged.push(imported);
        }
      });
      return merged;
    });
  };

  const importOverride = (importedAbilities: Ability[]) => {
    setAbilities(importedAbilities);
  };

  const isAbilityInPokedex = (id: string) => {
    return !!abilities.find((a) => a.id === id);
  };

  const addAbility = async (id: string, baseAbility?: Ability) => {
    const data = { ...(baseAbility || defaultAbility) };

    data.id = id.trim().toUpperCase();
    data.name = id.trim();
    setAbilities((prev) => [...prev, data]);
    setSelectedAbility(data);
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
    loadAbilityData,
    abilities,
    setAbilityData,
    selectedAbility,
    setSelectedAbility,
    isAbilityInPokedex,
    addAbility,
    removeAbility,
    resetAbilityData,
    setAbilityToDefault,
    importMerge,
    importOverride,
  };
};
