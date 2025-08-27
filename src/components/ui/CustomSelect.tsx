import { ChevronDown } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { theme } from "../../lib/theme/colors";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
  name?: string;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: CustomSelectProps) => {
  return (
    <div className={className}>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          className={`w-full px-3 py-2 ${theme.colors.primary.border} border rounded-md focus:outline-none text-left flex items-center justify-between`}
        >
          <Select.Value
            placeholder={placeholder}
            className={
              value
                ? theme.colors.primary.text
                : theme.colors.primary.textSubdued
            }
          />
          <Select.Icon>
            <ChevronDown
              className={`w-4 h-4 ${theme.colors.primary.textSubdued}`}
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            side="bottom"
            sideOffset={10}
            style={{ width: "var(--radix-select-trigger-width)" }}
            className={`z-10 ${theme.colors.primary.text} ${theme.colors.primary.bgSecondary} rounded-md shadow-lg max-h-48 overflow-hidden`}
          >
            <Select.Viewport className="p-2">
              {options.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none ${theme.colors.button.primary}`}
                >
                  <Select.ItemText>{option}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default CustomSelect;
