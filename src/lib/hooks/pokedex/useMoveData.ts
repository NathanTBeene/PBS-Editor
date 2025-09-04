import { defaultMove, type Move } from "@/lib/models/Move";
import { useEffect, useState } from "react";
import { importMoves } from "@/lib/services/importMoves";
import { useIndexedDB } from "../useIndexedDB";

export const useMoveData = () => {
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [moves, setMoves] = useState<Move[]>([]);
  const [moveDefaults, setMoveDefaults] = useState<Move[]>([]);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);

  const { saveMoves, loadMoves, saveMoveDefaults, loadMoveDefaults } =
    useIndexedDB();

  // Select the first move by default
  useEffect(() => {
    if (moves.length > 0 && !selectedMove) {
      setSelectedMove(moves[0]);
    }
  }, [moves, selectedMove]);

  // Fetch and set initial Move data
  const fetchMoves = async () => {
    try {
      console.log("Moves were not found. Fetching from PBS.");
      const response = await fetch("/src/assets/PBS/moves.txt");
      const data = await response.text();
      const parsedMoves = importMoves(data);
      setMoves(parsedMoves);
      setMoveDefaults(parsedMoves);

      // Save to IndexDB
      await saveMoves(parsedMoves);
      await saveMoveDefaults(parsedMoves);
    } catch (error) {
      console.error("Failed to load moves.txt:", error);
    }
  };

  const fetchDefaults = async () => {
    try {
      console.warn("Move Defaults were not found. Fetching from PBS.");
      const response = await fetch("/src/assets/PBS/moves.txt");
      const data = await response.text();
      const parsedMoves = importMoves(data);
      setMoveDefaults(parsedMoves);

      // Save to IndexDB
      await saveMoveDefaults(parsedMoves);
    } catch (error) {
      console.error("Failed to load moves.txt:", error);
    }
  };

  const loadMoveData = async () => {
    try {
      // Try loading from IndexDB First
      const storedMoves = await loadMoves();
      const storedDefaults = await loadMoveDefaults();

      if (storedMoves && storedMoves.length > 0) {
        console.log("Loaded Moves from IndexDB");
        setMoves(storedMoves);
      } else {
        await fetchMoves();
      }

      if (storedDefaults && storedDefaults.length > 0) {
        console.log("Loaded Move defaults from IndexDB");
        setMoveDefaults(storedDefaults);
      } else {
        await fetchDefaults();
      }
    } catch (error) {
      console.log("IndexDb Error, falling back to fetch.", error);
      await fetchMoves();
    }

    setIsInitialLoadComplete(true);
  };

  // Save to indexedDB whenever Moves change (after initial load).
  useEffect(() => {
    if (isInitialLoadComplete) {
      console.log("Saving Moves to IndexDB");
      saveMoves(moves);
    }
  }, [moves]);

  const setMoveData = (data: Move) => {
    setMoves((prev) => prev.map((m) => (m.id === data.id ? data : m)));
  };

  const isMoveInPokedex = (id: string) => {
    return !!moves.find((m) => m.id === id);
  };

  const addMove = (id: string, baseMove?: Move) => {
    const data = { ...(baseMove || defaultMove) };

    data.id = id.trim().toUpperCase();
    data.name = id.trim();
    setMoves((prev) => [...prev, data]);
    return data;
  };

  const removeMove = (id: string) => {
    setMoves((prev) => prev.filter((m) => m.id !== id));
  };

  const resetMoveData = () => {
    setMoves(moveDefaults);
  };

  const setMoveToDefault = (id: string) => {
    const defaultData = moveDefaults.find((m) => m.id === id);
    if (defaultData) {
      setMoves((prev) => prev.map((m) => (m.id === id ? defaultData : m)));
    }
  };

  return {
    loadMoveData,
    moves,
    setMoveData,
    selectedMove,
    setSelectedMove,
    isMoveInPokedex,
    addMove,
    removeMove,
    resetMoveData,
    setMoveToDefault,
  };
};
