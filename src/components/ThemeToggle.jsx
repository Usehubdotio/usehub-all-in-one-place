import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/helpers';
import I from '../icons';

export function ThemeToggle({ theme, setTheme }) {
    const [open, setOpen] = useState(false);
    const [languageNotice, setLanguageNotice] = useState(false);
    const rootRef = useRef(null);
    const isDark = theme === "dark";

    useEffect(() => {
        const handleClick = (event) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(event.target)) setOpen(false);
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "h-10 w-10 rounded-xl border inline-flex items-center justify-center transition",
                    isDark
                        ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                        : "bg-white hover:bg-black/5 border-black/10 text-black"
                )}
                title="Settings"
                aria-label="Settings"
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <I.Settings className={cn("h-4 w-4", isDark ? "text-white/80" : "text-black/70")} />
            </button>

            {open && (
                <div
                    role="menu"
                    className={cn(
                        "absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border p-2 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)]",
                        isDark
                            ? "border-white/10 bg-black/95 text-white"
                            : "border-black/10 bg-white/95 text-black"
                    )}
                >
                    <button
                        type="button"
                        onClick={() => setLanguageNotice((prev) => !prev)}
                        className={cn(
                            "flex w-full items-center justify-between gap-4 rounded-lg px-3 py-3 text-left transition",
                            isDark ? "hover:bg-white/5" : "hover:bg-black/5"
                        )}
                        role="menuitem"
                    >
                        <span className={cn("text-sm font-semibold", isDark ? "text-white/85" : "text-black/80")}>Language</span>
                        <span className={cn("text-sm", isDark ? "text-white/45" : "text-black/45")}>
                            {languageNotice ? "More languages soon" : "English"}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-3 transition",
                            isDark ? "hover:bg-white/5" : "hover:bg-black/5"
                        )}
                        role="menuitem"
                    >
                        <span className={cn("text-sm font-semibold", isDark ? "text-white/85" : "text-black/80")}>Dark Mode</span>
                        <span
                            className={cn(
                                "relative h-5 w-10 rounded-full transition",
                                isDark ? "bg-[#767290]" : "bg-black/15"
                            )}
                        >
                            <span
                                className={cn(
                                    "absolute top-0.5 h-4 w-4 rounded-full transition inline-flex items-center justify-center",
                                    isDark ? "right-0.5 bg-white text-[#767290]" : "left-0.5 bg-white text-transparent"
                                )}
                            >
                                <I.Check className="h-3 w-3" />
                            </span>
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}
