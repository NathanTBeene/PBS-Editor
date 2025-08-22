import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
  name?: string;
}

// Custom Select Component
const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"down" | "up">(
    "down"
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 192; // max-h-48 = 12rem = 192px
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      // If not enough space below but enough space above, flip to up
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition("up");
      } else {
        setDropdownPosition("down");
      }

      // Make visible after position is calculated
      setIsVisible(true);
    } else if (!isOpen) {
      // Hide immediately when closing
      setIsVisible(false);
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border-slate-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70 text-left flex items-center justify-between"
      >
        <span className={value ? "text-slate-100" : "text-slate-500"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-10 w-full bg-slate-700 rounded-md shadow-lg max-h-48 overflow-y-auto transition-opacity duration-75 ${
            dropdownPosition === "up" ? "bottom-full mb-1" : "top-full mt-1"
          } ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left hover:bg-slate-600 focus:outline-none focus:bg-slate-400"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
