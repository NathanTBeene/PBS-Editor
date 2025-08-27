import { useState, useMemo } from "react";
import { Popover } from "radix-ui";

interface AutocompleteProps {
  value: string;
  options: string[];
  placeholder?: string;
}

const Autocomplete = ({ value, options, placeholder }: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options]);

  return (
    <Popover.Root open={open}>
      <Popover.Anchor asChild>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onFocus={() => {
            setOpen(true);
          }}
          onBlur={() => {
            setOpen(false);
          }}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-slate-500 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-300/70"
        />
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          className="w-[var(--radix-popover-trigger-width)] mt-1 bg-slate-700 rounded-md shadow-lg max-h-48 overflow-y-auto z-50"
          side="bottom"
          align="start"
          sideOffset={6}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {filteredOptions.length > 0 ? (
            <div className="flex flex-col gap-1">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 cursor-pointer"
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
