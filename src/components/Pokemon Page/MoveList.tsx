import { useEffect, useRef, useState } from "react";
import { Search, Plus } from "lucide-react";
import { type Move } from "../../lib/models/Move";
import TypeBubble from "../TypeBubble";

interface MoveListProps {
  moves: Move[];
  selectedMove: Move | null;
  onMoveSelect: (move: Move) => void;
  onAddMove: () => void;
}

const MoveList = ({
  moves,
  selectedMove,
  onMoveSelect,
  onAddMove,
}: MoveListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasScrolledToSelected, setHasScrolledToSelected] = useState(false);

  const filteredMoves = moves.filter(
    (move) =>
      move.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      move.id.includes(searchTerm) ||
      move.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      move.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const moveRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const listContainerRef = useRef<HTMLDivElement>(null);

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

      const scrollTop =
        moveElement.offsetTop -
        containerElement.offsetTop -
        containerRect.height / 2 +
        moveRect.height / 2;

      containerElement.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: smooth ? "smooth" : "instant",
      });
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
          <button
            onClick={onAddMove}
            className="p-2 px-3 bg-emerald-600 text-emerald-200 rounded-lg cursor-pointer hover:bg-emerald-500 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Move List */}
      <div
        ref={listContainerRef}
        className="flex-1 overflow-y-auto border-r-3 border-slate-700"
      >
        {filteredMoves
          // .sort((a, b) => a.name.localeCompare(b.name))
          .map((move) => (
            <div
              key={move.id}
              ref={(el) => {
                moveRefs.current[move.id] = el;
              }}
              className={`p-3 border-b border-slate-500 bg-gradient-to-r from-slate-800/10 to-slate-800 cursor-pointer transition-colors ${
                selectedMove?.id === move.id
                  ? "bg-blue-600/20 border-l-4 border-l-blue-600/40"
                  : "hover:bg-slate-600/40"
              }`}
              onClick={() => {
                selectAndScrollToMove(move);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate text-sm">
                    {move.name}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <TypeBubble type={move.type} />
                    <span className="text-xs text-slate-400">
                      {move.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span>Power: {move.power || "—"}</span>
                    <span>Acc: {move.accuracy}%</span>
                    <span>PP: {move.pp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoveList;
