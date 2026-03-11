import React, { useEffect, useRef, useState } from 'react';
import { cn, clamp3Style, safeExternalUrl } from '../utils/helpers';
import I from '../icons';
import { IconBadge } from './IconBadge';

export function ToolCard({ tool, categoryLabel, isDark, isFavorite, toggleFavorite }) {
    const wrapperRef = useRef(null);
    const cardRef = useRef(null);
    const glowRef = useRef(null);
    const rafRef = useRef(null);

    // Animation state in ref to avoid re-rendering on every mousemove
    const anim = useRef({
        hovering: false,
        tx: 0, ty: 0, rx: 0, ry: 0, mx: 0, my: 0,
        ttx: 0, tty: 0, trx: 0, tryy: 0, tmx: 0, tmy: 0,
    });

    const [hovered, setHovered] = useState(false);

    const requestFrame = () => {
        if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    const tick = () => {
        rafRef.current = null;
        const s = anim.current;

        const lp = s.hovering ? 0.14 : 0.1;
        const lr = s.hovering ? 0.12 : 0.09;
        const lg = s.hovering ? 0.2 : 0.12;

        s.tx += (s.ttx - s.tx) * lp;
        s.ty += (s.tty - s.ty) * lp;
        s.rx += (s.trx - s.rx) * lr;
        s.ry += (s.tryy - s.ry) * lr;
        s.mx += (s.tmx - s.mx) * lg;
        s.my += (s.tmy - s.my) * lg;

        if (cardRef.current) {
            const scale = s.hovering ? 1.03 : 1;
            cardRef.current.style.transform = `translate3d(${s.tx.toFixed(2)}px, ${s.ty.toFixed(2)}px, 0) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) scale(${scale})`;
        }

        if (glowRef.current) {
            const o1 = isDark ? 0.18 : 0.14;
            const o2 = isDark ? 0.12 : 0.1;
            glowRef.current.style.opacity = s.hovering ? "1" : "0";
            glowRef.current.style.background = `radial-gradient(650px circle at ${s.mx.toFixed(1)}px ${s.my.toFixed(1)}px, rgba(249,115,22,${o1}), transparent 55%), radial-gradient(900px circle at ${s.mx.toFixed(1)}px ${s.my.toFixed(1)}px, rgba(59,130,246,${o2}), transparent 60%)`;
        }

        const done = !s.hovering && Math.abs(s.tx) < 0.06 && Math.abs(s.ty) < 0.06 && Math.abs(s.rx) < 0.06 && Math.abs(s.ry) < 0.06;
        if (!done) requestFrame();
    };

    const onEnter = (e) => {
        setHovered(true);
        const s = anim.current;
        s.hovering = true;
        const el = wrapperRef.current;
        if (el) {
            const r = el.getBoundingClientRect();
            s.tmx = e.clientX - r.left;
            s.tmy = e.clientY - r.top;
            if (s.mx === 0 && s.my === 0) { s.mx = s.tmx; s.my = s.tmy; }
        }
        requestFrame();
    };

    const onMove = (e) => {
        const el = wrapperRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const s = anim.current;
        const maxMove = 8, maxTilt = 8;
        s.ttx = (px - 0.5) * 2 * maxMove;
        s.tty = (py - 0.5) * 2 * maxMove;
        s.tryy = (px - 0.5) * 2 * maxTilt;
        s.trx = -(py - 0.5) * 2 * maxTilt;
        s.tmx = e.clientX - r.left;
        s.tmy = e.clientY - r.top;
        requestFrame();
    };

    const onLeave = () => {
        const s = anim.current;
        s.hovering = false;
        s.ttx = 0; s.tty = 0; s.trx = 0; s.tryy = 0;
        const el = wrapperRef.current;
        if (el) {
            const r = el.getBoundingClientRect();
            s.tmx = r.width / 2;
            s.tmy = r.height / 2;
        }
        setHovered(false);
        requestFrame();
    };

    useEffect(() => {
        return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
    }, []);

    return (
        <div ref={wrapperRef} style={{ perspective: "900px" }} onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave}>
            <div
                ref={cardRef}
                className={cn(
                    "relative rounded-2xl border overflow-hidden will-change-transform transition-[box-shadow,border-color] duration-300",
                    isDark
                        ? "bg-white/[0.03] border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                        : "bg-white border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.15)]",
                    hovered
                        ? isDark
                            ? "shadow-[0_30px_90px_rgba(0,0,0,0.65)] border-white/15"
                            : "shadow-[0_30px_90px_rgba(0,0,0,0.20)] border-black/15"
                        : ""
                )}
                style={{ transformStyle: "preserve-3d" }}
            >
                <div
                    ref={glowRef}
                    className={cn("pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300", isDark ? "mix-blend-screen" : "mix-blend-multiply")}
                />

                <div className="relative">
                    <div className="p-5 pb-0">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                                <IconBadge name={tool.name} url={tool.url} logoUrl={tool.logoUrl} isDark={isDark} />
                                <div className="min-w-0">
                                    <div className={cn("font-semibold leading-tight truncate", isDark ? "text-white" : "text-black")}>{tool.name}</div>
                                    <div className={cn("text-[11px] mt-1 uppercase tracking-wide truncate", isDark ? "text-white/40" : "text-black/45")}>{categoryLabel}</div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(tool.id);
                                }}
                                className={cn(
                                    "shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                                    isFavorite
                                        ? "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20"
                                        : isDark
                                            ? "text-white/20 hover:text-white/50 hover:bg-white/5"
                                            : "text-black/20 hover:text-black/50 hover:bg-black/5"
                                )}
                            >
                                <I.Star className={cn("h-4 w-4", isFavorite && "fill-current")} />
                            </button>
                        </div>
                    </div>

                    <div className="p-5 pt-4">
                        <p className={cn("text-sm leading-relaxed min-h-[66px]", isDark ? "text-white/65" : "text-black/65")} style={clamp3Style()}>{tool.blurb}</p>

                        <div className={cn("mt-5 rounded-xl ring-1 p-3", isDark ? "bg-white/5 ring-white/10" : "bg-black/5 ring-black/10")}>
                            <button
                                type="button"
                                onClick={() => {
                                    const safeUrl = safeExternalUrl(tool.url);
                                    if (!safeUrl) return;
                                    window.open(safeUrl, "_blank", "noopener,noreferrer");
                                }}
                                className={cn(
                                    "w-full rounded-xl border px-4 py-2.5 text-sm font-medium inline-flex items-center justify-center transition",
                                    isDark
                                        ? "bg-white/5 hover:bg-white/10 text-white border-white/10"
                                        : "bg-black/5 hover:bg-black/10 text-black border-black/10"
                                )}
                            >
                                Open App
                                <I.External className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
