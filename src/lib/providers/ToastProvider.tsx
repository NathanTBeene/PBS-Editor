import { useCallback, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { type ToastItem, ToastContext } from "../hooks/useToast";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        <ToastRenderer toasts={toasts} removeToast={removeToast} />
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

interface ToastRendererProps {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

const ToastRenderer = ({ toasts, removeToast }: ToastRendererProps) => {
  const textColors: Record<string, string> = {
    success: "text-emerald-500",
    error: "text-rose-500",
    warning: "text-amber-500",
    info: "text-sky-300",
  };

  const bgColors: Record<string, string> = {
    success: "bg-emerald-500",
    error: "bg-rose-500",
    warning: "bg-amber-500",
    info: "bg-sky-500",
  };

  return (
    <>
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          duration={toast.duration}
          onOpenChange={(open) => {
            if (!open) {
              setTimeout(() => {
                removeToast(toast.id);
              }, 200);
            }
          }}
          className="ToastRoot bg-slate-700 flex gap-3 rounded-lg shadow-xl p-4 min-w-[300px] max-w-[400px]"
        >
          {/* Colored bar */}
          <div className={`w-1 ${bgColors[toast.type]} rounded-full`} />

          <div className="flex-1 flex flex-col gap-1">
            <Toast.Title
              className={`${textColors[toast.type]} text-base font-semibold`}
            >
              {toast.title ||
                `${toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}!`}
            </Toast.Title>
            <Toast.Description className="text-sm text-slate-200 leading-relaxed">
              {toast.description}
            </Toast.Description>
          </div>

          <Toast.Action asChild altText="Close toast">
            <button
              className="text-slate-400 hover:text-slate-200 text-xl font-bold px-2 h-fit cursor-pointer"
              onClick={() => removeToast(toast.id)}
            >
              ×
            </button>
          </Toast.Action>
        </Toast.Root>
      ))}
    </>
  );
};

export default ToastProvider;
