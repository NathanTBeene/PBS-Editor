import { useEffect, useMemo, useState, type ChangeEvent } from "react";

interface CustomAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

const CustomAutocomplete = ({
  value,
  onChange,
  options,
  placeholder,
  className = "",
  inputClassName = "",
}: CustomAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = useMemo(() => {
    if (!inputValue) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleSuggestionClick = (option: string) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  // Update input value when external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 200);
        }}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-slate-500 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-300/70 ${inputClassName}`}
      />

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-slate-700 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((option) => (
            <button
              key={option}
              type="button"
              onMouseDown={() => handleSuggestionClick(option)}
              className="w-full px-3 py-2 text-left hover:bg-slate-600 focus:outline-none focus:bg-slate-400text-sm"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomAutocomplete;
