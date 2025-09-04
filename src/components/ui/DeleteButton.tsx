import { Trash } from "lucide-react";
import { useState } from "react";
import { theme } from "../../lib/theme/colors";

interface DeleteButtonProps {
  onConfirm: () => void;
}

const DeleteButton = ({ onConfirm }: DeleteButtonProps) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    if (count === 0) {
      setCount(1);
    } else {
      setCount(0);
      onConfirm();
    }
  };

  const handleMouseLeave = () => {
    setCount(0);
  };

  return (
    <button
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      className={`flex w-25 items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer
        ${count > 0 ? theme.colors.button.warn : theme.colors.button.delete}`}
    >
      {count == 0 && (
        <div className="flex items-center gap-2">
          <Trash className="w-4 h-4" />
          Delete
        </div>
      )}
      {count > 0 && (
        <div className="justify-center flex items-center gap-2">Sure?</div>
      )}
    </button>
  );
};

export default DeleteButton;
