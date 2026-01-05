import type { Item } from "@/lib/models/Item";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import NewItemForm from "../Forms/NewItemForm";
import ItemListItem from "./ItemListItem";

interface ItemListProps {
  selectedItem: Item | null;
  onItemSelect: (item: Item) => void;
}

const ItemList = ({
  selectedItem,
  onItemSelect,
}: ItemListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasScrolledToSelected, setHasScrolledToSelected] = useState(false);

  const { items } = usePokedexContext();

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.includes(searchTerm) ||
        item.pocket.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.move && item.move.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.flags && item.flags.some((flag) => flag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [items, searchTerm]);

  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Initial scroll to selected item when component mounts or selected item changes
  useEffect(() => {
    if (selectedItem && !hasScrolledToSelected) {
      // Use setTimeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        scrollToItem(selectedItem.id, false); // false = instant scroll for initial positioning
        setHasScrolledToSelected(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [selectedItem, hasScrolledToSelected]);

  // Smooth scroll when user selects a different item
  useEffect(() => {
    if (selectedItem && hasScrolledToSelected) {
      scrollToItem(selectedItem.id, true); // true = smooth scroll for user interactions
    }
  }, [selectedItem, hasScrolledToSelected]);

  // Reset scroll flag when search changes
  useEffect(() => {
    if (searchTerm) {
      setHasScrolledToSelected(false);
    }
  }, [searchTerm]);

  const scrollToItem = (itemId: string, smooth: boolean = true) => {
    const itemElement = itemRefs.current[itemId];
    const containerElement = listContainerRef.current;

    if (itemElement && containerElement) {
      const containerRect = containerElement.getBoundingClientRect();
      const itemRect = itemElement.getBoundingClientRect();

      // Calculate scroll position to center the item in the container
      const scrollTop =
        itemElement.offsetTop -
        containerElement.offsetTop -
        containerRect.height / 2 +
        itemRect.height / 2;

      containerElement.scrollTo({
        top: scrollTop,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  const selectAndScrollToItem = (item: Item) => {
    onItemSelect(item);
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
              placeholder="Search Items..."
              className="w-full pl-10 pr-4 py-2 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300/70 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <NewItemForm />
        </div>
      </div>

      {/* Item List */}
      <div
        ref={listContainerRef}
        className="flex-1 overflow-y-auto border-r-3 border-slate-700"
      >
        {filteredItems
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => (
            <ItemListItem
              key={item.id}
              item={item}
              selectedItem={selectedItem}
              itemRefs={itemRefs}
              selectAndScrollToItem={selectAndScrollToItem}
            />
          ))}
      </div>
    </div>
  );
}

export default ItemList
