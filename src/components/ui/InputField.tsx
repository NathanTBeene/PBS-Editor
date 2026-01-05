import InfoTooltip from "../ui/InfoTooltip";
import { Check, X} from "lucide-react";

interface InputFieldProps {
  label?: string;
  type?: "text" | "number" | "textarea" | "checkbox";
  value: string | number | boolean;
  onChange?: (value: string | number | boolean) => void;
  onFinished?: (value: string | number | boolean) => void;
  onFocus?: () => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onTooltipMouseDown?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  className?: string;
  defaultValue?: string | number | boolean;
  tooltip?: {
    description: string;
    link?: string;
  };
}

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  onFocus,
  onFinished,
  placeholder,
  min,
  max,
  step,
  rows = 3,
  className = "",
  tooltip,
  defaultValue
}: InputFieldProps) => {
  const handleChange = (e: string | number | boolean) => {
    onChange && onChange(e);
  };

  const handleOnFinish = () => {
    if (type === "number") {
      if (value === "" && defaultValue !== undefined) {
        onChange && onChange(defaultValue as number);
        onFinished && onFinished(defaultValue as number);
        return;
      }

      const numValue = Number(value);
      if (min !== undefined && numValue < min) {
        onChange && onChange(min);
        onFinished && onFinished(min);
        return;
      } else if (max !== undefined && numValue > max) {
        onChange && onChange(max);
        onFinished && onFinished(max);
        return;
      }
    }

    if (value === "" && defaultValue !== undefined) {
      onChange && onChange(defaultValue);
      onFinished && onFinished(defaultValue);
      return;
    }
    onFinished && onFinished(value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      handleOnFinish();
    }
  };

  const inputClassName = `w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70 ${className} relative`;

  if (type === "checkbox") {
    return (
      <button
        className="flex items-center max-h-10 border border-transparent gap-3 focus:outline-none focus:ring-transparent focus:ring-2 justify-center bg-slate-600 rounded-md py-2 px-4 hover:bg-slate-600/80 transition-colors cursor-pointer"
        onClick={() => handleChange(!value)}
        onFocus={onFocus}
        onBlur={handleOnFinish}
      >
        <label className="flex gap-2 items-center text-md font-medium cursor-pointer">
          {label}
          {tooltip && (
            <span onClick={(e) => e.stopPropagation()}>
              <InfoTooltip {...tooltip} />
            </span>
          )}
        </label>
        <div>
          {value ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <X className="w-5 h-5 text-red-500" />
          )}
        </div>
      </button>
    )
  }

  return (
    <div className="relative">
      {label && (
        <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2">
          {label}
          {tooltip && (
            <InfoTooltip {...tooltip} />
          )}
        </label>
      )}
      {type === "textarea" && (
        <textarea
          value={value as string}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={inputClassName}
          onKeyDown={handleKeyDown}
          onBlur={handleOnFinish}
          onFocus={onFocus}
        />
      )}

      {(type === "text" || type === "number") && (
        <input
          onFocus={onFocus}
          onBlur={handleOnFinish}
          type={type}
          value={value as string | number}
          onChange={(e) => {
            if (type === "number") {
              const val = e.target.value;
              handleChange(val === "" ? "" : Number(val));
            } else {
              handleChange(e.target.value);
            }
          }}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={inputClassName}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default InputField;
