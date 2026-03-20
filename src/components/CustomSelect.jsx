import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../utils/helpers';
import I from '../icons';

export function CustomSelect({ value, onChange, options, isDark }) {
    const [open, setOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const rootRef = useRef(null);

    const selected = useMemo(
        () => options.find((o) => o.value === value) || options[0],
        [options, value]
    );

    // Open with focused index set inline instead of via effect
    const toggleOpen = () => {
        setOpen((prev) => {
            if (!prev) {
                const idx = options.findIndex((o) => o.value === value);
                setFocusedIndex(idx >= 0 ? idx : 0);
            } else {
                setFocusedIndex(-1);
            }
            return !prev;
        });
    };

    useEffect(() => {
        const onDoc = (e) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target)) setOpen(false);
        };

        document.addEventListener("mousedown", onDoc);
        return () => {
            document.removeEventListener("mousedown", onDoc);
        };
    }, []);

    const handleKeyDown = (e) => {
        if (!open) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(true);
            }
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setFocusedIndex((prev) => (prev + 1) % options.length);
                break;
            case "ArrowUp":
                e.preventDefault();
                setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
                break;
            case "Enter":
            case " ":
                e.preventDefault();
                if (focusedIndex >= 0 && focusedIndex < options.length) {
                    onChange(options[focusedIndex].value);
                    setOpen(false);
                }
                break;
            case "Escape":
                e.preventDefault();
                setOpen(false);
                break;
            default:
                break;
        }
    };

    return (
        <div ref={rootRef} className="relative" onKeyDown={handleKeyDown}>
            <button
                type="button"
                onClick={toggleOpen}
                className={cn(
                    "w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 inline-flex items-center justify-between gap-2",
                    isDark
                        ? "bg-white/5 border-white/10 text-white focus:ring-orange-500/40"
                        : "bg-white border-black/10 text-black focus:ring-orange-500/30"
                )}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="text-sm font-medium">{selected.label}</span>
                <I.ChevronDown
                    className={cn(
                        "h-4 w-4 transition-transform",
                        open ? "rotate-180" : "rotate-0",
                        isDark ? "text-white/70" : "text-black/60"
                    )}
                />
            </button>

            {open && (
                <div
                    role="listbox"
                    className={cn(
                        "absolute z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
                        isDark ? "bg-black/95 border-white/10" : "bg-white border-black/10"
                    )}
                >
                    <div className={cn("max-h-64 overflow-auto", isDark ? "text-white" : "text-black")}>
                        {options.map((opt, idx) => {
                            const active = opt.value === value;
                            const focused = idx === focusedIndex;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                    }}
                                    onMouseEnter={() => setFocusedIndex(idx)}
                                    className={cn(
                                        "w-full text-left px-3 py-2 text-sm transition",
                                        active
                                            ? "bg-stone-200 text-black"
                                            : focused
                                                ? isDark
                                                    ? "bg-white/10 text-white"
                                                    : "bg-black/10 text-black"
                                                : isDark
                                                    ? "hover:bg-white/5 text-white/85"
                                                    : "hover:bg-black/5 text-black/80"
                                    )}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
