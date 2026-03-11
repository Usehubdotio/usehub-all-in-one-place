import React from 'react';
import { cn } from '../utils/helpers';
import { CATEGORIES } from '../data';
import I from '../icons';

/**
 * Shared navigation list used by both Sidebar and MobileDrawer.
 * Includes the Favorites button and the full category list.
 */
export function CategoryList({ activeKey, onSelect, isDark, favoritesCount = 0 }) {
    return (
        <>
            {/* Favorites */}
            <button
                type="button"
                onClick={() => onSelect("favorites")}
                className={cn(
                    "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition",
                    activeKey === "favorites"
                        ? "bg-stone-200 text-black shadow-[0_12px_30px_rgba(249,115,22,0.25)]"
                        : isDark
                            ? "hover:bg-white/5 text-white/75"
                            : "hover:bg-black/5 text-black/70"
                )}
            >
                <span
                    className={cn(
                        "h-9 w-9 rounded-lg flex items-center justify-center ring-1",
                        activeKey === "favorites" ? "bg-amber-400 text-black ring-amber-500/50" : isDark ? "bg-white/5 ring-white/10" : "bg-black/5 ring-black/10"
                    )}
                >
                    <I.Star className={cn("h-4 w-4", activeKey === "favorites" ? "text-black fill-current" : isDark ? "text-white/70" : "text-black/60")} />
                </span>
                <span className={cn("text-sm flex-1", activeKey === "favorites" ? "font-semibold" : "font-medium")}>Favorites</span>
                {favoritesCount > 0 && (
                    <span className={cn("text-xs py-0.5 px-2 rounded-full", activeKey === "favorites" ? "bg-black/10 text-black" : isDark ? "bg-white/10 text-white/60" : "bg-black/10 text-black/60")}>
                        {favoritesCount}
                    </span>
                )}
            </button>

            <div className={cn("my-2 h-px", isDark ? "bg-white/5" : "bg-black/5")} />

            {/* Categories */}
            {CATEGORIES.map((c) => {
                const Icon = c.icon;
                const active = activeKey === c.key;
                return (
                    <button
                        key={c.key}
                        type="button"
                        onClick={() => onSelect(c.key)}
                        className={cn(
                            "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition",
                            active
                                ? "bg-stone-200 text-black shadow-[0_12px_30px_rgba(249,115,22,0.25)]"
                                : isDark
                                    ? "hover:bg-white/5 text-white/75"
                                    : "hover:bg-black/5 text-black/70"
                        )}
                    >
                        <span
                            className={cn(
                                "h-9 w-9 rounded-lg flex items-center justify-center ring-1",
                                active ? "bg-black/15 ring-black/10" : isDark ? "bg-white/5 ring-white/10" : "bg-black/5 ring-black/10"
                            )}
                        >
                            <Icon className={cn("h-4 w-4", active ? "text-black" : isDark ? "text-white/70" : "text-black/60")} />
                        </span>
                        <span className={cn("text-sm", active ? "font-semibold" : "font-medium")}>{c.label}</span>
                    </button>
                );
            })}
        </>
    );
}
