import React from 'react';
import { cn } from '../utils/helpers';

export function ActionBtn({ icon, label, theme, className, iconToneClassName, onClick }) {
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={onClick || (() => { })}
            className={cn(
                "rounded-xl border px-3 py-2 inline-flex items-center gap-2 transition",
                isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                    : "bg-white hover:bg-black/5 border-black/10 text-black",
                className
            )}
            aria-label={label}
            title={label}
        >
            <span className={cn("h-4 w-4", iconToneClassName ?? (isDark ? "text-white/80" : "text-black/70"))}>{icon}</span>
            <span className="text-sm font-medium hidden sm:inline">{label}</span>
        </button>
    );
}
