import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { type Move } from "../../lib/models/Move";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import NewMoveForm from "../forms/NewMoveForm";
import MoveListItem from "../move/MoveListItem";

interface MoveListProps {
  selectedMove: Move | null;
  onMoveSelect: (move: Move) => void;
}

const MoveList = ({ selectedMove, onMoveSelect }: MoveListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasScrolledToSelected, setHasScrolledToSelected] = useState(false);

  const { moves } = usePokedexContext();

  const filteredMoves = useMemo(() => {
    return moves.filter(
      (move) =>
        move.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        move.id.includes(searchTerm)
    );
  }, [moves, searchTerm]);

  const moveRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedMove) {
      scrollToMove(selectedMove?.id || "", false);
    }
  }, [moves]);

  // Initial scroll to selected move when component mounts or selected move changes
  useEffect(() => {
    if (selectedMove && !hasScrolledToSelected) {
      // Use setTimeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        scrollToMove(selectedMove.id, false); // false = instant scroll for initial positioning
        setHasScrolledToSelected(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [selectedMove, hasScrolledToSelected]);

  // Smooth scroll when user selects a different move
  useEffect(() => {
    if (selectedMove && hasScrolledToSelected) {
      scrollToMove(selectedMove.id, true); // true = smooth scroll for user interactions
    }
  }, [selectedMove, hasScrolledToSelected]);

  // Reset scroll flag when search changes
  useEffect(() => {
    if (searchTerm) {
      setHasScrolledToSelected(false);
    }
  }, [searchTerm]);

  const scrollToMove = (moveId: string, smooth: boolean = true) => {
    const moveElement = moveRefs.current[moveId];
    const containerElement = listContainerRef.current;

    if (moveElement && containerElement) {
      const containerRect = containerElement.getBoundingClientRect();
      const moveRect = moveElement.getBoundingClientRect();
      
      // Calculate if element is already visible
      const isVisible = moveRect.top >= containerRect.top && moveRect.bottom <= containerRect.bottom;
      
      if (!isVisible) {
        // Calculate scroll position to center the element
        const elementTop = moveElement.offsetTop;
        const elementHeight = moveElement.offsetHeight;
        const containerHeight = containerElement.clientHeight;
        
        const scrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);
        
        containerElement.scrollTo({
          top: Math.max(0, scrollTop),
          behavior: smooth ? "smooth" : "instant",
        });
      }
    }
  };

  const selectAndScrollToMove = (move: Move) => {
    onMoveSelect(move);
    // Don't manually scroll here - let the useEffect handle it
  };

  return (
    <div className="w-80 bg-gradient-to-r from-slate-800/40 to-slate-800 flex flex-col">
      {/* Search Header */}
      <div className="p-4 flex items-center h-25 border-b-3 border-slate-700 shadow-md">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Moves..."
              className="w-full pl-10 pr-4 py-2 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300/70 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <NewMoveForm />
        </div>
      </div>

      {/* Move List */}
      <div
        ref={listContainerRef}
        className="flex-1 overflow-y-auto border-r-3 border-slate-700"
      >
        {filteredMoves
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((move) => (
            <MoveListItem
              key={move.id}
              move={move}
              selectedMove={selectedMove}
              moveRefs={moveRefs}
              selectAndScrollToMove={selectAndScrollToMove}
            />
          ))}
      </div>
    </div>
  );
};

export default MoveList;
