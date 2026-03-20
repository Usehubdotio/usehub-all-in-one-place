import { useEffect, useState } from "react";
import { Outlet, Link, useOutletContext } from "react-router-dom";
import { cn } from "../utils/helpers";
import { DomainBanner } from "./DomainBanner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

/**
 * Shared layout shell used by every page (marketplace + privacy).
 * Owns the theme state, background layers, DomainBanner, and footer.
 */
export function Layout() {
    const [theme, setTheme] = useState(() => {
        try {
            const saved = localStorage.getItem("usehub_theme");
            if (saved === "dark" || saved === "light") return saved;
        } catch { } // eslint-disable-line no-empty
        return "dark";
    });

    // Persist theme changes
    useEffect(() => {
        try {
            localStorage.setItem("usehub_theme", theme);
        } catch { } // eslint-disable-line no-empty
    }, [theme]);

    const isDark = theme === "dark";

    return (
        <div className={cn("min-h-screen", isDark ? "bg-black text-white" : "bg-zinc-50 text-zinc-900")}>
            {/* Security domain verification banner */}
            <DomainBanner theme={theme} />

            {/* Background layers */}
            <div className="pointer-events-none fixed inset-0">
                {isDark ? (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.18),transparent_55%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.14),transparent_55%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.06),transparent_60%)]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-50 to-zinc-100" />
                    </>
                )}
            </div>

            {/* Page content — receives theme via outlet context */}
            <Outlet context={{ theme, setTheme }} />

            {/* Footer — shared across all pages */}
            <footer className={cn("relative mt-auto border-t pt-8 pb-8 px-5 sm:px-8", isDark ? "border-white/10" : "border-black/10")}>
                <div className="flex flex-col items-center gap-3">
                    <Link
                        to="/privacy"
                        className={cn("text-xs hover:opacity-80 transition-opacity", isDark ? "text-white/40" : "text-black/45")}
                    >
                        Privacy Policy
                    </Link>

                    {/* Social links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://t.me/Usehub_Manager"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Telegram"
                            className={cn(
                                "transition-opacity hover:opacity-100",
                                isDark ? "text-white/40 hover:text-white/80" : "text-black/40 hover:text-black/70"
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                        </a>
                        <a
                            href="https://x.com/usehubdotio"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                            className={cn(
                                "transition-opacity hover:opacity-100",
                                isDark ? "text-white/40 hover:text-white/80" : "text-black/40 hover:text-black/70"
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>

                    <div className={cn("text-xs", isDark ? "text-white/40" : "text-black/45")}>
                        © 2026 usehub. All rights reserved.
                    </div>
                </div>
            </footer>
            <Analytics />
            <SpeedInsights />
        </div>
    );
}

/**
 * Hook for child routes to access theme from Layout.
 * Returns { theme, setTheme, isDark }.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const ctx = useOutletContext();
    return { ...ctx, isDark: ctx.theme === "dark" };
}
