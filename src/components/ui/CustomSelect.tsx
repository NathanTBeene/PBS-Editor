import { ChevronDown } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { theme } from "../../lib/theme/colors";
import InfoTooltip from "./InfoTooltip";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
  label?: string;
  tooltip?: {
    description: string;
    link?: string;
  };
}

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  className = "",
  label,
  tooltip,
}: CustomSelectProps) => {
  return (
    <div className={className}>
      <Select.Root value={value} onValueChange={onChange}>
        {
          label && (
            <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2">
              {label}
              {tooltip && (
                <span onClick={(e) => e.stopPropagation()}>
                  <InfoTooltip {...tooltip} />
                </span>
              )}
            </label>
          )
        }
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
            className={`z-10 ${theme.colors.primary.text} ${theme.colors.primary.bgSecondary} rounded-md shadow-lg max-h-48 overflow-y-auto`}
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
