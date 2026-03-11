import React from 'react';
import { cn } from '../utils/helpers';
import I from '../icons';

export function ThemeToggle({ theme, setTheme, compact }) {
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "rounded-xl border px-3 py-2 inline-flex items-center gap-2 transition",
                isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                    : "bg-white hover:bg-black/5 border-black/10 text-black"
            )}
            title={isDark ? "Switch to Light" : "Switch to Dark"}
            aria-label={isDark ? "Switch to Light" : "Switch to Dark"}
        >
            <I.Sun className="h-4 w-4 text-yellow-300" />
            <span className={cn("text-sm font-medium", compact ? "hidden sm:inline" : "")}>{isDark ? "Light" : "Dark"}</span>
        </button>
    );
}
