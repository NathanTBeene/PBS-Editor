import type { Ability } from "../models/Ability";
import type { Move } from "../models/Move";
import type { Pokemon } from "../models/Pokemon";

export const useIndexedDB = () => {
  const dbName = "PBS-Editor";
  const version = 1;

  const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create Pokemon Object Stores
        if (!db.objectStoreNames.contains("pokemon")) {
          db.createObjectStore("pokemon", { keyPath: "id" });
        }

        // Create Move Object Stores
        if (!db.objectStoreNames.contains("moves")) {
          db.createObjectStore("moves", { keyPath: "id" });
        }

        // Create Ability Object Stores
        if (!db.objectStoreNames.contains("abilities")) {
          db.createObjectStore("abilities", { keyPath: "id" });
        }

        // Create Constant Object Stores
        if (!db.objectStoreNames.contains("constants")) {
          db.createObjectStore("constants", { keyPath: "id" });
        }

        // Create Default Stores
        if (!db.objectStoreNames.contains("defaults")) {
          db.createObjectStore("defaults", { keyPath: "type" });
        }
      };
    });
  };

  /* 
  --- MARK: SAVE FUNCTIONS ---
    These use the put method since it will add
    any new records and overwrite any existing records.
    This is easier on the computer than clearing
    and reputting each entry every time.
  */

  const savePokemon = async (pokemon: Pokemon[]) => {
    const db = await openDB();
    const tx = db.transaction(["pokemon"], "readwrite");
    const store = tx.objectStore("pokemon");

    const promises = pokemon.map((p) => store.put(p));
    await Promise.all(promises);
  };

  const savePokemonDefaults = async (pokemon: Pokemon[]) => {
    const db = await openDB();
    const tx = db.transaction(["defaults"], "readwrite");
    const store = tx.objectStore("defaults");

    await store.put({ type: "pokemon", data: pokemon });
  };

  const saveMoves = async (moves: Move[]) => {
    const db = await openDB();
    const tx = db.transaction(["moves"], "readwrite");
    const store = tx.objectStore("moves");

    const promises = moves.map((m) => store.put(m));
    await Promise.all(promises);
  };

  const saveMoveDefaults = async (moves: Move[]) => {
    const db = await openDB();
    const tx = db.transaction(["defaults"], "readwrite");
    const store = tx.objectStore("defaults");

    await store.put({ type: "moves", data: moves });
  };

  const saveAbilities = async (abilities: Ability[]) => {
    const db = await openDB();
    const tx = db.transaction(["abilities"], "readwrite");
    const store = tx.objectStore("abilities");

    const promises = abilities.map((a) => store.put(a));
    await Promise.all(promises);
  };

  const saveAbilityDefaults = async (abilities: Ability[]) => {
    const db = await openDB();
    const tx = db.transaction(["defaults"], "readwrite");
    const store = tx.objectStore("defaults");

    await store.put({ type: "ability", data: abilities });
  };

  const saveConstants = async (constantsData: any) => {
    const db = await openDB();
    const tx = db.transaction(["constants"], "readwrite");
    const store = tx.objectStore("constants");

    await store.put({ id: "constants", data: constantsData });
  };

  /* 
  --- MARK: LOAD FUNCTIONS ---
  */

  const loadPokemon = async (): Promise<Pokemon[]> => {
    const db = await openDB();
    const tx = db.transaction(["pokemon"], "readonly");
    const store = tx.objectStore("pokemon");

    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const loadPokemonDefaults = async (): Promise<Pokemon[]> => {
    const db = await openDB();
    const tx = db.transaction(["defaults"], "readonly");
    const store = tx.objectStore("defaults");

    const request = store.get("pokemon");
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result?.data);
      request.onerror = () => reject(request.error);
    });
  };

  const loadMoves = async (): Promise<Move[]> => {
    const db = await openDB();
    const tx = db.transaction(["moves"], "readonly");
    const store = tx.objectStore("moves");

    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const loadMoveDefaults = async (): Promise<Move[]> => {
    const db = await openDB();
    const tx = db.transaction(["defaults"], "readonly");
    const store = tx.objectStore("defaults");

    const request = store.get("moves");
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result?.data);
      request.onerror = () => reject(request.error);
    });
  };

  const loadAbilities = async (): Promise<Ability[]> => {
    const db = await openDB();
    const tx = db.transaction(["abilities"], "readonly");
    const store = tx.objectStore("abilities");

    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const loadAbilityDefaults = async (): Promise<Ability[]> => {
    const db = await openDB();
    const tx = db.transaction(["defaults"], "readonly");
    const store = tx.objectStore("defaults");

    const request = store.get("ability");
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result?.data);
      request.onerror = () => reject(request.error);
    });
  };

  const loadConstants = async (): Promise<any> => {
    const db = await openDB();
    const tx = db.transaction(["constants"], "readonly");
    const store = tx.objectStore("constants");

    const request = store.get("constants");
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result?.data);
      request.onerror = () => reject(request.error);
    });
  };

  // MARK: Return
  return {
    savePokemon,
    savePokemonDefaults,
    saveMoves,
    saveMoveDefaults,
    saveAbilities,
    saveAbilityDefaults,
    saveConstants,
    loadPokemon,
    loadPokemonDefaults,
    loadMoves,
    loadMoveDefaults,
    loadAbilities,
    loadAbilityDefaults,
    loadConstants,
  };
};
