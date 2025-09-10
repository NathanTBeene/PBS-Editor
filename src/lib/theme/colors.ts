export const theme = {
  colors: {
    primary: {
      bg: "bg-slate-800",
      bgSecondary: "bg-slate-700",
      bgMuted: "bg-slate-700/40",
      text: "text-slate-200",
      textMuted: "text-slate-300",
      textSubdued: "text-slate-400",
      border: "border-slate-500",
      borderDark: "border-slate-700",
    },
    button: {
      primary: "bg-slate-700 hover:bg-slate-600",
      secondary: "bg-slate-600 hover:bg-slate-500",
      delete: "bg-rose-600/80 hover:bg-rose-800",
      warn: "bg-amber-300/80 hover:bg-amber-200 text-black",
    },
    accent: {
      success: "bg-emerald-600 hover:bg-emerald-700 text-emerald-100",
      danger: "text-rose-300 hover:text-rose-400",
      focus: "focus:ring-2 focus:ring-blue-300/70",
    },
    surface: {
      modal: "bg-slate-950/40",
      card: "bg-slate-700/40",
      button: "bg-slate-700 hover:bg-slate-600",
    },
  },
} as const;
