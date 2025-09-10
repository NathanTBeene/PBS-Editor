import { AlertDialog } from "radix-ui";
import "../../lib/theme/Alert.css";

import { useState, useRef, forwardRef, useImperativeHandle } from "react";

export interface AlertProps {
  title?: string;
  confirmText?: string;
  confirmType?:
    | "success"
    | "error"
    | "warning"
    | "info"
    | "green"
    | "red"
    | "blue"
    | "gray";
  cancelText?: string;
  triggerText?: string;
  description?: string;
  children?: React.ReactNode;
  buttonClass?: string;
  contentClass?: string;
  titleClass?: string;
  descriptionClass?: string;
}

export interface AlertHandle {
  show: (props: AlertProps) => Promise<boolean> | null;
}

const Alert = forwardRef<AlertHandle, AlertProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<AlertProps>({});
  const resolver = useRef<(value: boolean) => void | undefined>(undefined);

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

  useImperativeHandle(ref, () => ({
    show: (customProps: AlertProps = {}) => {
      setModalProps(customProps);
      setIsOpen(true);
      return new Promise<boolean>((resolve) => {
        resolver.current = resolve;
      });
    },
  }));

  const handleConfirm = () => {
    setIsOpen(false);
    resolver.current?.(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolver.current?.(false);
  };

  const {
    triggerText,
    title,
    confirmText = "OK",
    confirmType = "info",
    cancelText = "Cancel",
    description,
    children,
    buttonClass,
    contentClass,
    titleClass,
    descriptionClass,
  } = { ...props, ...modalProps };

  const colorClass = colorClasses[confirmType];

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {triggerText && (
        <AlertDialog.Trigger asChild>
          <button onClick={() => setIsOpen(true)} className={buttonClass}>
            {triggerText}
          </button>
        </AlertDialog.Trigger>
      )}
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
            <AlertDialog.Cancel
              className="font-semibold text-md cursor-pointer"
              onClick={handleCancel}
            >
              {cancelText}
            </AlertDialog.Cancel>
            <AlertDialog.Action
              className={
                colorClass +
                " font-bold px-3 py-1 rounded cursor-pointer transition-colors"
              }
              onClick={handleConfirm}
            >
              {confirmText}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
});

export default Alert;
