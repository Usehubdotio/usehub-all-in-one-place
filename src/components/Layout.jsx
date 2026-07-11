import { useEffect, useRef, useState } from "react";
import { Outlet, Link, useOutletContext } from "react-router-dom";
import { cn } from "../utils/helpers";
import { DomainBanner } from "./DomainBanner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { openTally } from "../utils/tally";

/**
 * Shared layout shell used by every page (marketplace + privacy).
 * Owns the theme state, background layers, DomainBanner, and footer.
 */
export function Layout() {
    const [domainBannerVisible, setDomainBannerVisible] = useState(true);
    const [footerOverlap, setFooterOverlap] = useState(0);
    const footerRef = useRef(null);
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

    useEffect(() => {
        let frame = null;

        const updateFooterOverlap = () => {
            frame = null;
            if (!footerRef.current) return;

            const rect = footerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const visibleHeight = Math.max(0, Math.min(rect.height, viewportHeight - rect.top));
            setFooterOverlap(Math.round(visibleHeight));
        };

        const scheduleUpdate = () => {
            if (frame == null) frame = requestAnimationFrame(updateFooterOverlap);
        };

        updateFooterOverlap();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);

        return () => {
            if (frame != null) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
        };
    }, []);

    const isDark = theme === "dark";
    const footerTextClassName = cn(
        "text-sm transition-colors",
        isDark ? "text-white/60 hover:text-white/90" : "text-black/60 hover:text-black/80"
    );
    const footerIconClassName = cn(
        "transition-opacity hover:opacity-100",
        isDark ? "text-white/60 hover:text-white/90" : "text-black/60 hover:text-black/80"
    );

    return (
        <div
            className={cn(
                "usehub-site-shell min-h-screen",
                isDark ? "usehub-site-shell--dark text-white" : "usehub-site-shell--light text-zinc-900"
            )}
        >
            {/* Security domain verification banner */}
            <DomainBanner theme={theme} onDismiss={() => setDomainBannerVisible(false)} />

            {/* Page content — receives theme via outlet context */}
            <Outlet context={{ theme, setTheme, domainBannerVisible, footerOverlap }} />

            {/* Footer — shared across all pages */}
            <footer
                ref={footerRef}
                className={cn(
                    "relative z-40 mt-auto border-t pt-8 pb-8",
                    isDark ? "border-white/10" : "border-black/10"
                )}
            >
                <div className="relative z-10 w-full lg:pl-80">
                    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-5 text-center sm:flex-row sm:justify-between sm:px-8">
                        <div className={cn(footerTextClassName, "sm:text-left")}>
                            © 2026 usehub. All rights reserved.
                        </div>

                        <div className="flex items-center justify-center gap-6 sm:justify-end">
                            <div className="flex flex-col items-center gap-1 sm:items-start">
                                <button
                                    type="button"
                                    onClick={() => openTally("add_app")}
                                    className={footerTextClassName}
                                >
                                    Add an App
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openTally("feedback")}
                                    className={footerTextClassName}
                                >
                                    Feedback
                                </button>
                                <a
                                    href="https://t.me/Usehub_Manager"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={footerTextClassName}
                                >
                                    Support
                                </a>
                            </div>

                            <Link
                                to="/privacy"
                                className={footerTextClassName}
                            >
                                Privacy Policy
                            </Link>

                            {/* Social links */}
                            <a
                                href="https://t.me/Usehub_Manager"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Telegram"
                                className={footerIconClassName}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </a>
                            <a
                                href="https://x.com/usehubdotio"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (Twitter)"
                                className={footerIconClassName}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
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
