import { useState } from 'react';
import { cn } from '../utils/helpers';
import I from '../icons';

/**
 * Security banner warning users to verify they are on the official domain.
 * Can be dismissed, but reappears on page reload for safety.
 */
export function DomainBanner() {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div
            className={cn(
                "relative z-50 w-full px-4 py-2 flex items-center justify-between gap-4 text-sm",
                "bg-amber-400 text-black"
            )}
        >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <I.Shield className="h-4 w-4 shrink-0" />
                    <span className="font-medium">
                        MAKE SURE YOU ARE ON THE RIGHT DOMAIN
                    </span>
                </div>
                <span className="text-black/70 text-xs sm:text-sm">
                    Always carefully check that your URL is{" "}
                    <span className="font-semibold text-black">https://usehub.xyz</span>
                </span>
            </div>
            <button
                type="button"
                onClick={() => setDismissed(true)}
                className="shrink-0 h-6 w-6 rounded flex items-center justify-center hover:bg-black/10 transition-colors"
                aria-label="Dismiss banner"
            >
                <I.X className="h-4 w-4" />
            </button>
        </div>
    );
}
