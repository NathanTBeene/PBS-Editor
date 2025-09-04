import { type ReactNode } from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import "../../lib/theme/Dialog.css";

interface ModalProps {
  triggerElement: ReactNode;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  contentClass?: string;
  titleClass?: string;
  overlayClass?: string;
  maxWidth?: string;
}

const Modal = ({
  triggerElement,
  title,
  children,
  showCloseButton = true,
  onClose,
  contentClass = "",
  titleClass = "",
  overlayClass = "",
  maxWidth = "max-w-150",
}: ModalProps) => {
  return (
    <Dialog.Root onOpenChange={onClose}>
      <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`DialogOverlay bg-black/30 ${overlayClass}`}
        />
        <Dialog.Content
          aria-describedby="modal-description"
          className={`DialogContent ${maxWidth} text-white bg-slate-800 p-6 rounded-md shadow-xl border-1 border-slate-700 ${contentClass}`}
        >
          {title && (
            <Dialog.Title className={`${titleClass} font-bold text-lg mb-3`}>
              {title}
            </Dialog.Title>
          )}
          <div className="modal-body">{children}</div>
          {showCloseButton && (
            <Dialog.Close className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer text-xl font-bold">
              <X />
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
