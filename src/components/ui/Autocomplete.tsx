import { useState, useMemo, useRef, useEffect } from "react";
import { Popover } from "radix-ui";
import InputField from "./InputField";

interface AutocompleteProps {
  title?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  inputClass?: string;
  onBlur?: () => void;
}

const Autocomplete = ({
  title,
  value,
  onValueChange,
  options,
  placeholder,
  inputClass,
  onBlur,
}: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const selectedItemRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options]);

  const handleInputChange = (e: string | number) => {
    setInputValue(e as string);
    onValueChange(e as string);
    setSelectedIndex(-1);
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    onValueChange(option);
    setOpen(false);
    setSelectedIndex(-1);

    setTimeout(() => {
      onBlur && onBlur();
    }, 0);
  };

  useEffect(() => {
    if (selectedIndex !== -1 && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1)
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex !== -1) {
          const selectedOption = filteredOptions[selectedIndex];
          setInputValue(selectedOption);
          onValueChange(selectedOption);
          setOpen(false);

          setTimeout(() => {
            onBlur && onBlur();
          }, 0);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <Popover.Root open={open}>
      <Popover.Anchor asChild>
        <div tabIndex={-1}>
          <InputField
            label={title}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              setTimeout(() => {
                if (!open) {
                  onBlur && onBlur();
                }
              }, 0);
              setOpen(false);
              setSelectedIndex(-1);
            }}
            placeholder={placeholder}
            className={inputClass}
            onKeyDown={handleKeyDown}
          />
        </div>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          className="w-[var(--radix-popover-trigger-width)] bg-slate-700 rounded-md shadow-lg max-h-48 overflow-y-auto z-[9999] border border-slate-600"
          side="bottom"
          sideOffset={6}
          align="start"
          avoidCollisions={false}
          onOpenAutoFocus={(e) => e.preventDefault()}
          ref={scrollContainerRef}
        >
          {filteredOptions.length > 0 ? (
            <div className="flex flex-col gap-1">
              {filteredOptions.map((option, index) => (
                <div
                  ref={selectedIndex === index ? selectedItemRef : null}
                  key={option}
                  onMouseDown={() => {
                    handleOptionSelect(option);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 cursor-pointer ${
                    selectedIndex === index ? "bg-slate-600" : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-2 text-sm text-slate-400">
              No results found
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Autocomplete;
