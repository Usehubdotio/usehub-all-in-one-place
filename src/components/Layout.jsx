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
                            </div>

                            <Link
                                to="/privacy"
                                className={footerTextClassName}
                            >
                                Privacy Policy
                            </Link>

                            {/* Social links */}
                            <a
                                href="https://x.com/usehubdotxyz"
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
