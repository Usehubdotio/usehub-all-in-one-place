/**
 * Utility functions for USEHUB
 */

/**
 * Combines class names, filtering out falsy values
 */
export function cn(...parts) {
    return parts.filter(Boolean).join(" ");
}

/**
 * Returns styles for 3-line text clamping
 */
export function clamp3Style() {
    return {
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    };
}

/**
 * Extracts initials from a name
 */
export function initialsFor(name) {
    const parts = String(name || "")
        .trim()
        .split(" ")
        .filter(Boolean);
    return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function safeExternalUrl(rawUrl) {
    if (!rawUrl) return null;
    try {
        const trimmed = String(rawUrl).trim();
        const normalized = trimmed.startsWith("http://") || trimmed.startsWith("https://")
            ? trimmed
            : `https://${trimmed}`;
        const url = new URL(normalized);
        if (url.protocol !== "http:" && url.protocol !== "https:") return null;
        return url.toString();
    } catch {
        return null;
    }
}
