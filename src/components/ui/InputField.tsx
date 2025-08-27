import InfoTooltip from "../ui/InfoTooltip";

interface InputFieldProps {
  label?: string;
  type?: "text" | "number" | "textarea";
  value: string | number;
  onChange: (value: string | number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  className?: string;
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
  onBlur,
  placeholder,
  min,
  max,
  step,
  rows = 3,
  className = "",
  tooltip,
  onKeyDown,
}: InputFieldProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (type === "number") {
      const numValue =
        type === "number" && step
          ? parseFloat(e.target.value)
          : parseInt(e.target.value);
      onChange(isNaN(numValue) ? 0 : numValue);
    } else {
      onChange(e.target.value);
    }
  };

  const inputClassName = `w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70 ${className} relative`;

  return (
    <div onFocus={onFocus}>
      {label && (
        <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2">
          {label}
          {tooltip && <InfoTooltip {...tooltip} />}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          className={inputClassName}
          onKeyDown={onKeyDown}
        />
      ) : (
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={inputClassName}
          onKeyDown={onKeyDown}
        />
      )}
    </div>
  );
};

export default InputField;
