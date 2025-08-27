import { AlertDialog } from "radix-ui";
import "../../lib/theme/Alert.css";

interface AlertProps {
  triggerText: string;
  title: string;
  confirmText: string;
  confirmType:
    | "success"
    | "error"
    | "warning"
    | "info"
    | "green"
    | "red"
    | "blue"
    | "gray";
  onConfirm: () => void;
  description?: string;
  children?: React.ReactNode;
  buttonClass?: string;
  contentClass?: string;
  titleClass?: string;
  descriptionClass?: string;
}

const Alert = ({
  triggerText,
  title,
  onConfirm,
  confirmText,
  confirmType,
  description,
  children,
  buttonClass,
  contentClass,
  titleClass,
  descriptionClass,
}: AlertProps) => {
  const colorClasses = {
    success: "bg-emerald-900 text-emerald-200/70 hover:bg-emerald-800",
    error: "bg-rose-900 text-rose-200/70 hover:bg-rose-800",
    warning: "bg-amber-900 text-amber-200/70 hover:bg-amber-800",
    info: "bg-blue-900 text-blue-200/70 hover:bg-blue-800",
    gray: "bg-gray-600 text-gray-200/70 hover:bg-gray-500",
    green: "bg-green-900 text-green-200/70 hover:bg-green-800",
    red: "bg-red-900 text-red-200/70 hover:bg-red-800",
    blue: "bg-blue-900 text-blue-200/70 hover:bg-blue-800",
  };

  const colorClass = colorClasses[confirmType];

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className={buttonClass}>{triggerText}</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay bg-black/30" />
        <AlertDialog.Content
          className={`AlertDialogContent max-w-150 text-white bg-slate-800 p-6 rounded-md shadow-xl border-1 border-slate-700 ${contentClass}`}
        >
          <AlertDialog.Title className={`${titleClass} font-bold text-lg mb-3`}>
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description
            className={`${descriptionClass} text-slate-300 mb-4`}
          >
            {description}
          </AlertDialog.Description>
          {children}
          <div className="w-full flex justify-end items-center mt-4 gap-10">
            <AlertDialog.Cancel className="font-semibold text-md cursor-pointer">
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              className={
                colorClass +
                " font-bold px-3 py-1 rounded cursor-pointer transition-colors"
              }
              onClick={onConfirm}
            >
              {confirmText}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Alert;
