import { type ReactNode } from "react";
import InfoTooltip from "../ui/InfoTooltip";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  tooltip?: string;
}

const FormSection = ({
  title,
  children,
  className = "",
  tooltip,
}: FormSectionProps) => {
  return (
    <section
      className={`bg-slate-700/40 rounded-lg shadow-lg p-6 ${className}`}
    >
      <div className="flex gap-3 mb-4 items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        {tooltip && <InfoTooltip description={tooltip} />}
      </div>
      {children}
    </section>
  );
};

export default FormSection;
