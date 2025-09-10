import { createContext, useContext } from "react";

export interface ToastItem {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  description: string;
  duration?: number; // in milliseconds
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export { ToastContext };

export const useToastNotifications = () => {
  const { addToast } = useToast();

  const notify = (
    type: "success" | "error" | "warning" | "info",
    title: string,
    description: string,
    duration?: number
  ) => {
    addToast({ type, title, description, duration });
  };

  const showSuccess = (
    description: string,
    title?: string,
    duration?: number
  ) => {
    addToast({ type: "success", description, title, duration });
  };

  const showError = (
    description: string,
    title?: string,
    duration?: number
  ) => {
    addToast({ type: "error", description, title, duration });
  };

  const showWarning = (
    description: string,
    title?: string,
    duration?: number
  ) => {
    addToast({ type: "warning", description, title, duration });
  };

  const showInfo = (description: string, title?: string, duration?: number) => {
    addToast({ type: "info", description, title, duration });
  };

  return { notify, showSuccess, showError, showWarning, showInfo };
};
