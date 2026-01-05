
export interface MegaBubbleProps {
  text: string;
}

const MegaBubble = ({ text }: MegaBubbleProps) => {
  return (
    <div className="text-[10px] font-bold py-0.5 saturate-70 text-shadow-lg/40 text-shadow-slate-900  px-2 text-slate-200 rounded bg-[linear-gradient(to_right,#ff1493,#d946ef,#a855f7,#8b5cf6,#6366f1,#4169e1,#3b82f6,#0ea5e9,#00bfff,#06b6d4,#14b8a6,#10b981,#22c55e,#00ff7f,#84cc16,#eab308,#ffd700)]">{text}</div>
  )
}

export default MegaBubble
