import { Trash } from "lucide-react";
import { useState } from "react";

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

  return (
    <button
      onClick={handleClick}
      className={`flex w-25 items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer
        ${
          count > 0
            ? "bg-amber-300/80 hover:bg-amber-200 text-black"
            : "bg-rose-600/80 hover:bg-rose-500"
        }`}
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
