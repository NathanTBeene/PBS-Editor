
interface StyleBubbleProps {
  text: string;
  color: "blue" | "green" | "red" | "yellow";
}

const StyleBubble = ({ text, color }: StyleBubbleProps) => {

  const colors = {
    blue: "bg-sky-500",
    green: "bg-emerald-500",
    red: "bg-rose-500",
    yellow: "bg-amber-500",
  }

  return (
    <div className={`text-[10px] font-bold py-0.5 px-2 text-slate-200 rounded text-shadow-lg/30 text-shadow-slate-900 ${colors[color]}`}>
      {text}
    </div>
  )
}

export default StyleBubble
