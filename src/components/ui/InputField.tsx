import InfoTooltip from "../ui/InfoTooltip";

interface InputFieldProps {
  label?: string;
  type?: "text" | "number" | "textarea";
  value: string | number;
  onChange?: (value: string | number) => void;
  onFinished?: (value: string | number) => void;
  onFocus?: () => void;
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
  onFinished,
  placeholder,
  min,
  max,
  step,
  rows = 3,
  className = "",
  tooltip,
}: InputFieldProps) => {
  const handleChange = (e: string | number) => {
    onChange && onChange(e);
  };

  const handleOnFinish = () => {
    if (type === "number") {
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

  return (
    <div onFocus={onFocus} className="relative">
      {label && (
        <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2">
          {label}
          {tooltip && <InfoTooltip {...tooltip} />}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={inputClassName}
          onKeyDown={handleKeyDown}
          onBlur={handleOnFinish}
        />
      ) : (
        <input
          onFocus={onFocus}
          onBlur={handleOnFinish}
          type={type}
          value={value}
          onChange={(e) => handleChange(type === "number" ? Number(e.target.value) : e.target.value)}
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
