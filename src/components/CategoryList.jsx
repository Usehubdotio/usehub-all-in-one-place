import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../utils/helpers';
import { CATEGORIES, AI_SUBCATEGORIES, WALLET_SUBCATEGORIES } from '../data';
import I from '../icons';

/**
 * Desktop flyout rendered via Portal so it escapes sidebar overflow clipping.
 */
function AiFlyout({ anchorRef, isDark, activeKey, onSelect, onClose }) {
    const flyoutRef = useRef(null);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    // Position the flyout relative to the AI Tools button
    const updatePosition = useCallback(() => {
        if (!anchorRef.current) return;
        const rect = anchorRef.current.getBoundingClientRect();
        setPos({
            top: rect.top,
            left: rect.right + 8,
        });
    }, [anchorRef]);

    useEffect(() => {
        updatePosition();
        // Recalculate on scroll/resize since sidebar scrolls
        const sidebar = anchorRef.current?.closest('aside');
        const scrollTarget = sidebar?.querySelector('[data-sidebar-scroll]');

        const handleUpdate = () => updatePosition();
        window.addEventListener('resize', handleUpdate);
        window.addEventListener('scroll', handleUpdate, true);
        if (scrollTarget) {
            scrollTarget.addEventListener('scroll', handleUpdate);
        }
        return () => {
            window.removeEventListener('resize', handleUpdate);
            window.removeEventListener('scroll', handleUpdate, true);
            if (scrollTarget) {
                scrollTarget.removeEventListener('scroll', handleUpdate);
            }
        };
    }, [updatePosition, anchorRef]);

    // Close on click outside
    useEffect(() => {
        function handleClick(e) {
            if (
                flyoutRef.current && !flyoutRef.current.contains(e.target) &&
                anchorRef.current && !anchorRef.current.contains(e.target)
            ) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [anchorRef, onClose]);

    return createPortal(
        <div
            ref={flyoutRef}
            className={cn(
                "fixed z-[9999] rounded-xl border shadow-2xl",
                "animate-[flyoutIn_0.18s_ease-out]",
                isDark
                    ? "bg-black/95 backdrop-blur-xl border-white/10 shadow-black/50"
                    : "bg-white/95 backdrop-blur-xl border-black/10 shadow-black/10"
            )}
            style={{
                top: pos.top,
                left: pos.left,
                width: 260,
                maxHeight: 'calc(100vh - 40px)',
            }}
        >
            <div className={cn(
                "px-4 py-3 border-b text-xs font-semibold uppercase tracking-wider",
                isDark ? "border-white/8 text-white/40" : "border-black/8 text-black/40"
            )}>
                AI Categories
            </div>
            <div
                className="overflow-y-auto overscroll-contain p-2 space-y-0.5"
                style={{
                    maxHeight: 'calc(100vh - 100px)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: isDark
                        ? 'rgba(255,255,255,0.15) transparent'
                        : 'rgba(0,0,0,0.15) transparent',
                }}
            >
                {AI_SUBCATEGORIES.map((sub) => {
                    const subActive = activeKey === sub.key;
                    return (
                        <button
                            key={sub.key}
                            type="button"
                            onClick={() => onSelect(sub.key)}
                            className={cn(
                                "w-full text-left px-3 py-2.5 rounded-lg text-[13px] transition-all duration-150",
                                subActive
                                    ? isDark
                                        ? "bg-white/15 text-white font-semibold"
                                        : "bg-stone-200 text-black font-semibold"
                                    : isDark
                                        ? "text-white/65 hover:bg-white/8 hover:text-white/95"
                                        : "text-black/60 hover:bg-black/5 hover:text-black/90"
                            )}
                        >
                            {sub.label}
                        </button>
                    );
                })}
            </div>
        </div>,
        document.body
    );
}

/**
 * Desktop flyout rendered via Portal for Wallet subcategories.
 */
function WalletFlyout({ anchorRef, isDark, activeKey, onSelect, onClose }) {
    const flyoutRef = useRef(null);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    const updatePosition = useCallback(() => {
        if (!anchorRef.current) return;
        const rect = anchorRef.current.getBoundingClientRect();
        setPos({
            top: rect.top,
            left: rect.right + 8,
        });
    }, [anchorRef]);

    useEffect(() => {
        updatePosition();
        const sidebar = anchorRef.current?.closest('aside');
        const scrollTarget = sidebar?.querySelector('[data-sidebar-scroll]');

        const handleUpdate = () => updatePosition();
        window.addEventListener('resize', handleUpdate);
        window.addEventListener('scroll', handleUpdate, true);
        if (scrollTarget) {
            scrollTarget.addEventListener('scroll', handleUpdate);
        }
        return () => {
            window.removeEventListener('resize', handleUpdate);
            window.removeEventListener('scroll', handleUpdate, true);
            if (scrollTarget) {
                scrollTarget.removeEventListener('scroll', handleUpdate);
            }
        };
    }, [updatePosition, anchorRef]);

    useEffect(() => {
        function handleClick(e) {
            if (
                flyoutRef.current && !flyoutRef.current.contains(e.target) &&
                anchorRef.current && !anchorRef.current.contains(e.target)
            ) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [anchorRef, onClose]);

    return createPortal(
        <div
            ref={flyoutRef}
            className={cn(
                "fixed z-[9999] rounded-xl border shadow-2xl",
                "animate-[flyoutIn_0.18s_ease-out]",
                isDark
                    ? "bg-black/95 backdrop-blur-xl border-white/10 shadow-black/50"
                    : "bg-white/95 backdrop-blur-xl border-black/10 shadow-black/10"
            )}
            style={{
                top: pos.top,
                left: pos.left,
                width: 260,
                maxHeight: 'calc(100vh - 40px)',
            }}
        >
            <div className={cn(
                "px-4 py-3 border-b text-xs font-semibold uppercase tracking-wider",
                isDark ? "border-white/8 text-white/40" : "border-black/8 text-black/40"
            )}>
                Wallet Categories
            </div>
            <div
                className="overflow-y-auto overscroll-contain p-2 space-y-0.5"
                style={{
                    maxHeight: 'calc(100vh - 100px)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: isDark
                        ? 'rgba(255,255,255,0.15) transparent'
                        : 'rgba(0,0,0,0.15) transparent',
                }}
            >
                {WALLET_SUBCATEGORIES.map((sub) => {
                    const subActive = activeKey === sub.key;
                    return (
                        <button
                            key={sub.key}
                            type="button"
                            onClick={() => onSelect(sub.key)}
                            className={cn(
                                "w-full text-left px-3 py-2.5 rounded-lg text-[13px] transition-all duration-150",
                                subActive
                                    ? isDark
                                        ? "bg-white/15 text-white font-semibold"
                                        : "bg-stone-200 text-black font-semibold"
                                    : isDark
                                        ? "text-white/65 hover:bg-white/8 hover:text-white/95"
                                        : "text-black/60 hover:bg-black/5 hover:text-black/90"
                            )}
                        >
                            {sub.label}
                        </button>
                    );
                })}
            </div>
        </div>,
        document.body
    );
}

/**
 * Shared navigation list used by both Sidebar and MobileDrawer.
 * Includes the Favorites button, categories, and AI Tools / Wallets flyout submenus.
 */
export function CategoryList({ activeKey, onSelect, isDark, favoritesCount = 0, isMobile = false }) {
    const [aiSubmenuOpen, setAiSubmenuOpen] = useState(false);
    const [walletSubmenuOpen, setWalletSubmenuOpen] = useState(false);
    const aiButtonRef = useRef(null);
    const walletButtonRef = useRef(null);

    // Check if current activeKey is an AI subcategory
    const isAiSubcategoryActive = activeKey?.startsWith('ai_') && activeKey !== 'ai_tools';
    // Check if current activeKey is a Wallet subcategory
    const isWalletSubcategoryActive = activeKey?.startsWith('wallet_') && activeKey !== 'wallets';
    const labelHoverClassName = (active) => active ? "" : isDark ? "group-hover:text-white/95" : "group-hover:text-black/90";

    return (
        <>
            {/* Favorites */}
            <button
                type="button"
                onClick={() => onSelect("favorites")}
                className={cn(
                    "group w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition",
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
                <span className={cn("text-sm flex-1 transition-colors", activeKey === "favorites" ? "font-semibold" : "font-medium", labelHoverClassName(activeKey === "favorites"))}>Favorites</span>
                {favoritesCount > 0 && (
                    <span className={cn("text-xs py-0.5 px-2 rounded-full", activeKey === "favorites" ? "bg-black/10 text-black" : isDark ? "bg-white/10 text-white/60" : "bg-black/10 text-black/60")}>
                        {favoritesCount}
                    </span>
                )}
            </button>

            {/* Categories */}
            {CATEGORIES.map((c) => {
                const Icon = c.icon;
                const isAiTools = c.key === "ai_tools";
                const isWallets = c.key === "wallets";
                const active = activeKey === c.key || (isAiTools && isAiSubcategoryActive) || (isWallets && isWalletSubcategoryActive);

                if (isAiTools) {
                    return (
                        <div key={c.key} className="relative">
                            <button
                                ref={aiButtonRef}
                                type="button"
                                onClick={() => setAiSubmenuOpen((prev) => !prev)}
                                className={cn(
                                    "group w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition",
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
                                <span className={cn("text-sm flex-1 transition-colors", active ? "font-semibold" : "font-medium", labelHoverClassName(active))}>{c.label}</span>
                                <I.ChevronRight
                                    className={cn(
                                        "h-4 w-4 transition-transform duration-200",
                                        isMobile && aiSubmenuOpen ? "rotate-90" : "",
                                        active ? "text-black" : isDark ? "text-white/40" : "text-black/40"
                                    )}
                                />
                            </button>

                            {/* Mobile: inline accordion */}
                            {isMobile && aiSubmenuOpen && (
                                <div className={cn(
                                    "ml-6 mt-1 mb-1 border-l-2 pl-3 space-y-0.5",
                                    isDark ? "border-white/10" : "border-black/10"
                                )}>
                                    {AI_SUBCATEGORIES.map((sub) => {
                                        const subActive = activeKey === sub.key;
                                        return (
                                            <button
                                                key={sub.key}
                                                type="button"
                                                onClick={() => onSelect(sub.key)}
                                                className={cn(
                                                    "w-full text-left px-3 py-2 rounded-lg text-[13px] transition",
                                                    subActive
                                                        ? "bg-stone-200 text-black font-semibold"
                                                        : isDark
                                                            ? "text-white/65 hover:bg-white/5 hover:text-white/95"
                                                            : "text-black/60 hover:bg-black/5 hover:text-black/90"
                                                )}
                                            >
                                                {sub.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Desktop: flyout via Portal */}
                            {!isMobile && aiSubmenuOpen && (
                                <AiFlyout
                                    anchorRef={aiButtonRef}
                                    isDark={isDark}
                                    activeKey={activeKey}
                                    onSelect={(key) => {
                                        onSelect(key);
                                        setAiSubmenuOpen(false);
                                    }}
                                    onClose={() => setAiSubmenuOpen(false)}
                                />
                            )}
                        </div>
                    );
                }

                if (isWallets) {
                    return (
                        <div key={c.key} className="relative">
                            <button
                                ref={walletButtonRef}
                                type="button"
                                onClick={() => setWalletSubmenuOpen((prev) => !prev)}
                                className={cn(
                                    "group w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition",
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
                                <span className={cn("text-sm flex-1 transition-colors", active ? "font-semibold" : "font-medium", labelHoverClassName(active))}>{c.label}</span>
                                <I.ChevronRight
                                    className={cn(
                                        "h-4 w-4 transition-transform duration-200",
                                        isMobile && walletSubmenuOpen ? "rotate-90" : "",
                                        active ? "text-black" : isDark ? "text-white/40" : "text-black/40"
                                    )}
                                />
                            </button>

                            {/* Mobile: inline accordion */}
                            {isMobile && walletSubmenuOpen && (
                                <div className={cn(
                                    "ml-6 mt-1 mb-1 border-l-2 pl-3 space-y-0.5",
                                    isDark ? "border-white/10" : "border-black/10"
                                )}>
                                    {WALLET_SUBCATEGORIES.map((sub) => {
                                        const subActive = activeKey === sub.key;
                                        return (
                                            <button
                                                key={sub.key}
                                                type="button"
                                                onClick={() => onSelect(sub.key)}
                                                className={cn(
                                                    "w-full text-left px-3 py-2 rounded-lg text-[13px] transition",
                                                    subActive
                                                        ? "bg-stone-200 text-black font-semibold"
                                                        : isDark
                                                            ? "text-white/65 hover:bg-white/5 hover:text-white/95"
                                                            : "text-black/60 hover:bg-black/5 hover:text-black/90"
                                                )}
                                            >
                                                {sub.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Desktop: flyout via Portal */}
                            {!isMobile && walletSubmenuOpen && (
                                <WalletFlyout
                                    anchorRef={walletButtonRef}
                                    isDark={isDark}
                                    activeKey={activeKey}
                                    onSelect={(key) => {
                                        onSelect(key);
                                        setWalletSubmenuOpen(false);
                                    }}
                                    onClose={() => setWalletSubmenuOpen(false)}
                                />
                            )}
                        </div>
                    );
                }

                return (
                    <button
                        key={c.key}
                        type="button"
                        onClick={() => onSelect(c.key)}
                        className={cn(
                            "group w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition",
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
                        <span className={cn("text-sm transition-colors", active ? "font-semibold" : "font-medium", labelHoverClassName(active))}>{c.label}</span>
                    </button>
                );
            })}

            {/* Keyframe animation for flyout */}
            <style>{`
                @keyframes flyoutIn {
                    from {
                        opacity: 0;
                        transform: translateX(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </>
    );
}
