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
  tooltip?: {
    description: string;
    link?: string;
  };
}

const Autocomplete = ({
  title,
  value,
  onValueChange,
  options,
  placeholder,
  inputClass,
  onBlur,
  tooltip,
}: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const ignoreNextFocus = useRef(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options]);

  const handleInputChange = (e: string | number | boolean) => {
    setInputValue(e as string);
    onValueChange(e as string);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTimeout(() => {
        if (!open) {
          onBlur && onBlur();
        }
      }, 0);
      setOpen(false);
    }
  };

  const handleInputFocus = () => {
    if (ignoreNextFocus.current) {
      ignoreNextFocus.current = false;
      return;
    }
    setOpen(true);
  }

  return (
    <Popover.Root open={open} modal={false}>
      <Popover.Anchor asChild>
        <div tabIndex={-1}>
          <InputField
            label={title}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onFinished={() => {
              onBlur && onBlur();
              setOpen(false);
            }}
            placeholder={placeholder}
            className={inputClass}
            onKeyDown={onKeyDown}
            tooltip={tooltip}
          />
        </div>
      </Popover.Anchor>

      <Popover.Content
        className="w-[var(--radix-popover-trigger-width)] min-w-40 bg-slate-700 rounded-md shadow-lg max-h-48 overflow-y-auto z-[1200] border border-slate-600"
        side="bottom"
        sideOffset={6}
        align="start"
        avoidCollisions={true}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {filteredOptions.length > 0 ? (
          <div className="flex flex-col gap-1">
            {filteredOptions.map((option) => (
              <div
                key={option}
                onMouseDown={() => {
                  setInputValue(option);
                  onValueChange(option);
                  setOpen(false);
                }}
                onKeyDown={onKeyDown}
                className={`px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 cursor-pointer`}
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
    </Popover.Root>
  );
};

export default Autocomplete;
