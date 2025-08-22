import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FormSection = ({ title, children, className = "" }: FormSectionProps) => {
  return (
    <section className={`bg-slate-700/40 rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
};

export default FormSection;