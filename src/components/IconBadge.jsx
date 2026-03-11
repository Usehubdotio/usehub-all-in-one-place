import React, { useMemo, useState } from 'react';
import { cn, initialsFor } from '../utils/helpers';

/**
 * Extract domain from URL for favicon lookup
 */
function getDomain(url) {
    if (!url) return null;
    try {
        const normalized = url.startsWith('http') ? url : `https://${url}`;
        return new URL(normalized).hostname;
    } catch {
        return null;
    }
}

/**
 * Get Google S2 favicon URL for a domain
 */
function getFaviconUrl(domain) {
    if (!domain) return null;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

export function IconBadge({ name, url, logoUrl, isDark }) {
    const [imgError, setImgError] = useState(false);
    const initials = useMemo(() => initialsFor(name), [name]);

    // Determine image source: logoUrl (manual) -> favicon (auto) -> null (fallback to initials)
    const imgSrc = useMemo(() => {
        if (logoUrl) return logoUrl;
        const domain = getDomain(url);
        return getFaviconUrl(domain);
    }, [logoUrl, url]);

    const showImage = imgSrc && !imgError;

    return (
        <div
            className={cn(
                "h-10 w-10 rounded-xl ring-1 flex items-center justify-center overflow-hidden",
                isDark ? "bg-white/10 ring-white/10" : "bg-black/5 ring-black/10"
            )}
        >
            {showImage ? (
                <img
                    src={imgSrc}
                    alt={`${name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="h-6 w-6 object-contain"
                    onError={() => setImgError(true)}
                />
            ) : (
                <span className={cn("text-sm font-semibold tracking-wide", isDark ? "text-white/80" : "text-black/70")}>
                    {initials}
                </span>
            )}
        </div>
    );
}
