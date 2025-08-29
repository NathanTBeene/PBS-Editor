import type { AlertProps } from "@/components/ui/Alert";
import { useRef } from "react";

export const useAlert = () => {
  const alertRef = useRef<{
    show: (props: AlertProps) => Promise<boolean> | null;
  }>(null);

  const showWarning = async (
    title: string,
    description: string
  ): Promise<boolean> => {
    const confirmed = await alertRef.current?.show({
      title,
      description,
      confirmType: "warning",
      confirmText: "Proceed",
      cancelText: "Go Back",
    });
    if (confirmed) {
      return true;
    } else {
      return false;
    }
  };

  const showError = async (
    title: string,
    description: string
  ): Promise<boolean> => {
    const confirmed = await alertRef.current?.show({
      title,
      description,
      confirmType: "error",
      confirmText: "Proceed",
      cancelText: "Go Back",
    });
    if (confirmed) {
      return true;
    } else {
      return false;
    }
  };

  return { alertRef, showWarning, showError };
};
