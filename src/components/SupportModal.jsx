import React, { useEffect, useState } from 'react';
import { cn } from '../utils/helpers';
import I, { SolanaIcon, EthereumIcon } from '../icons';
import { WALLET_ETH, WALLET_SOL } from '../config';

export function SupportModal({ open, onClose, isDark }) {
    const [copiedKey, setCopiedKey] = useState(null);

    useEffect(() => {
        if (!open) return;

        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open) setCopiedKey(null);
    }, [open]);

    const doCopy = async (key, text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedKey(key);
            setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1200);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.left = "-9999px";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            try {
                document.execCommand("copy");
                setCopiedKey(key);
                setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1200);
            } finally {
                document.body.removeChild(ta);
            }
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            <div className={cn("absolute inset-0", isDark ? "bg-black/70" : "bg-black/40")} onClick={onClose} />

            <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-8 overflow-auto">
                <div className={cn("relative w-full max-w-xl rounded-2xl border shadow-[0_30px_90px_rgba(0,0,0,0.55)]", isDark ? "bg-black/90 border-white/10" : "bg-white border-black/10")}>
                    <button
                        type="button"
                        onClick={onClose}
                        className={cn("absolute right-3 top-3 h-9 w-9 rounded-xl border inline-flex items-center justify-center", isDark ? "bg-white/5 border-white/10 text-white/70 hover:bg-white/10" : "bg-black/5 border-black/10 text-black/60 hover:bg-black/10")}
                        aria-label="Close"
                        title="Close"
                    >
                        ✕
                    </button>

                    <div className="p-6 sm:p-7">
                        <div className="flex items-center gap-3">
                            <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl border", isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10")}>
                                <I.Heart className="h-5 w-5 text-purple-400" />
                            </span>
                            <div>
                                <div className={cn("text-xl font-semibold", isDark ? "text-white" : "text-black")}>Support USEHUB</div>
                                <div className={cn("text-sm", isDark ? "text-white/55" : "text-black/55")}>Keep the catalog free & updated</div>
                            </div>
                        </div>

                        <div className={cn("mt-5 text-sm leading-relaxed", isDark ? "text-white/70" : "text-black/70")}>
                            USEHUB helps you quickly find verified Web3 services — all in one place — for beginners and pros.
                        </div>

                        <ul className={cn("mt-3 space-y-2 text-sm", isDark ? "text-white/70" : "text-black/70")}>
                            <li className="flex gap-2">
                                <span className={cn("mt-0.5", isDark ? "text-white/45" : "text-black/45")}>•</span>
                                <span>Keep the project free</span>
                            </li>
                            <li className="flex gap-2">
                                <span className={cn("mt-0.5", isDark ? "text-white/45" : "text-black/45")}>•</span>
                                <span>Update the catalog and add new categories</span>
                            </li>
                        </ul>

                        <div className={cn("mt-4 text-sm", isDark ? "text-white/60" : "text-black/60")}>
                            If donating isn't for you — leave feedback or share USEHUB with friends 🙌
                        </div>

                        <div className="mt-6 space-y-4">
                            {/* Solana */}
                            <div className={cn("rounded-2xl border p-4", isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5")}>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className={cn("h-10 w-10 rounded-xl ring-1 flex items-center justify-center", isDark ? "bg-white/10 ring-white/10" : "bg-white ring-black/10")}>
                                            <SolanaIcon className={cn("h-5 w-5", isDark ? "text-white/85" : "text-black/75")} />
                                        </span>
                                        <div className="min-w-0">
                                            <div className={cn("text-sm font-semibold", isDark ? "text-white" : "text-black")}>Solana Address</div>
                                            <div className={cn("text-xs mt-0.5", isDark ? "text-white/55" : "text-black/55")}>Send on Solana (SOL/SPL)</div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => doCopy("sol", WALLET_SOL)}
                                        className={cn("shrink-0 rounded-xl border px-3 py-2 text-sm font-medium inline-flex items-center gap-2", isDark ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" : "bg-white hover:bg-black/5 border-black/10 text-black")}
                                    >
                                        Copy
                                    </button>
                                </div>
                                <div className={cn("mt-3 rounded-xl border px-3 py-2 font-mono text-xs break-all", isDark ? "bg-black/40 border-white/10 text-white/80" : "bg-white border-black/10 text-black/80")}>{WALLET_SOL}</div>
                                <div className={cn("mt-2 text-xs transition", copiedKey === "sol" ? "opacity-100" : "opacity-0", isDark ? "text-white/60" : "text-black/60")}>Copied</div>
                            </div>

                            {/* Ethereum */}
                            <div className={cn("rounded-2xl border p-4", isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5")}>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className={cn("h-10 w-10 rounded-xl ring-1 flex items-center justify-center", isDark ? "bg-white/10 ring-white/10" : "bg-white ring-black/10")}>
                                            <EthereumIcon className={cn("h-5 w-5", isDark ? "text-white/85" : "text-black/75")} />
                                        </span>
                                        <div className="min-w-0">
                                            <div className={cn("text-sm font-semibold", isDark ? "text-white" : "text-black")}>Ethereum Address</div>
                                            <div className={cn("text-xs mt-0.5", isDark ? "text-white/55" : "text-black/55")}>Send on Ethereum (ETH/ERC-20)</div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => doCopy("eth", WALLET_ETH)}
                                        className={cn("shrink-0 rounded-xl border px-3 py-2 text-sm font-medium inline-flex items-center gap-2", isDark ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" : "bg-white hover:bg-black/5 border-black/10 text-black")}
                                    >
                                        Copy
                                    </button>
                                </div>
                                <div className={cn("mt-3 rounded-xl border px-3 py-2 font-mono text-xs break-all", isDark ? "bg-black/40 border-white/10 text-white/80" : "bg-white border-black/10 text-black/80")}>{WALLET_ETH}</div>
                                <div className={cn("mt-2 text-xs transition", copiedKey === "eth" ? "opacity-100" : "opacity-0", isDark ? "text-white/60" : "text-black/60")}>Copied</div>
                            </div>
                        </div>

                        <div className={cn("mt-5 text-xs", isDark ? "text-white/45" : "text-black/45")}>
                            Tip: Only send funds on the correct network.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
