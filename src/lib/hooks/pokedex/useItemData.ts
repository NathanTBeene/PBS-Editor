import { defaultItem, type Item } from "@/lib/models/Item";
import { useEffect, useState } from "react";
import { useIndexedDB } from "../useIndexedDB";
import { importItems } from "@/lib/services/importItems";


export const useItemData = () => {
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [itemDefaults, setItemDefaults] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const {
    saveItems,
    loadItems,
    saveItemDefaults,
    loadItemDefaults,
  } = useIndexedDB();

  // Select the first item by default
  useEffect(() => {
    if (items.length > 0 && !selectedItem) {
      setSelectedItem(items[0]);
    }
  }, [items, selectedItem]);

  // Fetch and set initial Item data
  const fetchItems = async () => {
    try {
      console.warn("Items not found. Fetching from PBS.");
      const response = await fetch("./PBS/items.txt");
      const data = await response.text();
      // You would need to implement importItems similar to importAbilities
      const parsedItems = importItems(data);
      setItems(parsedItems);
      setItemDefaults(parsedItems);

      // Save to IndexedDB
      await saveItems(parsedItems);
      await saveItemDefaults(parsedItems);
    } catch (error) {
      console.error("Failed to load items.txt:", error);
    }
  };

  const fetchDefaults = async () => {
    try {
      console.warn("Item Defaults were not found. Fetching from PBS.");
      const response = await fetch("./PBS/items.txt");
      const data = await response.text();
      const parsedItems = importItems(data);
      setItemDefaults(parsedItems);

      // Save to IndexedDB
      await saveItemDefaults(parsedItems);
    } catch (error) {
      console.error("Failed to load items.txt:", error);
    }
  }

  const loadItemData = async () => {
    try {
      // Try loading from IndexedDB First
      const storedItems = await loadItems();
      const storedItemDefaults = await loadItemDefaults();

      if (storedItems && storedItems.length > 0) {
        console.log("Loaded Items from IndexedDB");
        setItems(storedItems);
      } else {
        await fetchItems();
      }

      if (storedItemDefaults && storedItemDefaults.length > 0) {
        console.log("Loaded Item Defaults from IndexedDB");
        setItemDefaults(storedItemDefaults);
      } else {
        await fetchDefaults();
      }
    } catch (error) {
      console.error("IndexDB Error, falling back to fetch.", error);
      await fetchItems();
    }

    setIsInitialLoadComplete(true);
    console.log("Finished loading Item data.");
  };

  // Save to indexDB whenever items change (after initial load).
  useEffect(() => {
    if (isInitialLoadComplete) {
      console.log("Saving Items to IndexedDB");
      saveItems(items);
    }
  }, [items]);

  const setItemData = (data: Item) => {
    setItems((prev) => prev.map((a) => (a.id === data.id ? data : a)));
  };

  const importMerge = (importedItems: Item[]) => {
    setItems((prev) => {
      const merged = [...prev];
      importedItems.forEach((imported) => {
        const existing = merged.find((a) => a.id === imported.id);
        if (existing) {
          Object.assign(existing, imported);
        } else {
          merged.push(imported);
        }
      });
      return merged;
    });
  }

  const importOverride = (importedItems: Item[]) => {
    setItems(importedItems);
  };

  const isItemInPokedex = (itemId: string): boolean => {
    return items.some((item) => item.id === itemId);
  }

  const addItem = (id: string, baseItem?: Item) => {
    const data = {...(baseItem || defaultItem)};

    data.id = id.trim().toUpperCase();
    // data.name = baseItem ? baseItem.name : id.trim();
    setItems((prev) => [...prev, data]);
    setSelectedItem(data);
    return data;
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetItemData = () => {
    setItems(itemDefaults);
  }

  const setItemToDefault = (id: string) => {
    const defaultData = itemDefaults.find((item) => item.id === id);
    if (defaultData) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...defaultData } : item))
      );
    }
  }

  return {
    loadItemData,
    items,
    setItemData,
    selectedItem,
    setSelectedItem,
    isItemInPokedex,
    addItem,
    removeItem,
    resetItemData,
    setItemToDefault,
    importMerge,
    importOverride,
  };
}
