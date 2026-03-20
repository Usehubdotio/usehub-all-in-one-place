import { cn } from '../utils/helpers';
import { CategoryList } from './CategoryList';

export function MobileDrawer({ open, onClose, activeCategory, setActiveCategory, isDark, favoritesCount = 0 }) {
    return (
        <div className={cn("fixed inset-0 z-50 lg:hidden", open ? "" : "pointer-events-none")}>
            <div
                onClick={onClose}
                className={cn("absolute inset-0 transition-opacity", isDark ? "bg-black/60" : "bg-black/40", open ? "opacity-100" : "opacity-0")}
            />
            <div
                className={cn(
                    "absolute left-0 top-0 h-full w-[340px] border-r backdrop-blur-xl transition-transform flex flex-col",
                    isDark ? "bg-black/85 border-white/10" : "bg-white/90 border-black/10",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className={cn("p-6 border-b flex items-center justify-between", isDark ? "border-white/10" : "border-black/10")}>
                    <div>
                        <div className={cn("flex items-center gap-2 text-2xl font-extrabold tracking-wide leading-none", isDark ? "text-white" : "text-black")}>
                            <img
                                src="/favicon.svg"
                                alt="USEHUB"
                                className="h-6 w-6"
                            />
                            <span>USEHUB</span>
                        </div>
                        <div className={cn("text-xs mt-1", isDark ? "text-white/45" : "text-black/45")}>Resources &amp; Services</div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className={cn("h-9 w-9 rounded-lg border", isDark ? "bg-white/5 border-white/10 text-white/70" : "bg-black/5 border-black/10 text-black/60")}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-2 overscroll-contain">
                    <CategoryList
                        activeKey={activeCategory}
                        onSelect={(key) => {
                            setActiveCategory(key);
                            onClose();
                        }}
                        isDark={isDark}
                        favoritesCount={favoritesCount}
                    />
                </div>
            </div>
        </div>
    );
}
