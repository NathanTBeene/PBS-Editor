import { useCallback } from "react";

type ArrayField = "types" | "abilities" | "hiddenAbilities" | "eggGroups" | "offspring" | "flags";

interface UseArrayManagerProps<T> {
  data: T;
  setData: (updater: (prev: T | null) => T | null) => void;
}

export function useArrayManager<T extends Record<string, any>>({
  data,
  setData,
}: UseArrayManagerProps<T>) {
  const handleArrayChange = useCallback(
    (field: ArrayField, index: number, newValue: string) => {
      if (!data) return;

      setData((prev) => {
        if (!prev) return null;

        const currentArray = prev[field] as string[];
        const newArray = currentArray.map((item, i) => (i === index ? newValue : item));

        return {
          ...prev,
          [field]: newArray,
        };
      });
    },
    [data, setData]
  );

  const removeFromArray = useCallback(
    (field: ArrayField, index: number) => {
      if (!data) return;

      setData((prev) => {
        if (!prev) return null;

        const currentArray = prev[field] as string[];
        const newArray = currentArray.filter((_, i) => i !== index);

        return {
          ...prev,
          [field]: newArray,
        };
      });
    },
    [data, setData]
  );

  const addToArray = useCallback(
    (field: ArrayField, defaultValue: string = "") => {
      if (!data) return;

      setData((prev) => {
        if (!prev) return null;

        const currentArray = (prev[field] as string[]) || [];
        const newArray = [...currentArray, defaultValue];

        return {
          ...prev,
          [field]: newArray,
        };
      });
    },
    [data, setData]
  );

  return {
    handleArrayChange,
    removeFromArray,
    addToArray,
  };
}