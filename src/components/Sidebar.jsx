import { cn } from '../utils/helpers';
import { CategoryList } from './CategoryList';
import { BrandWord } from './BrandWord';

export function Sidebar({ activeKey, setActiveKey, isDark, favoritesCount = 0, domainBannerVisible = false, footerOverlap = 0 }) {
    const topOffset = domainBannerVisible ? 40 : 0;

    return (
        <aside
            className={cn(
                "fixed left-0 z-30 w-80 shrink-0 overflow-hidden border-r transition-[top,height]",
                isDark ? "border-white/10" : "border-black/10"
            )}
            style={{
                top: topOffset,
                height: `calc(100vh - ${topOffset + footerOverlap}px)`,
            }}
        >
            <div
                className="relative flex h-full flex-col"
            >
                <div className={cn(
                    "relative z-20 px-6 pb-5 pt-6"
                )}>
                    <div className={cn("flex items-center gap-2 text-3xl font-extrabold tracking-wide leading-none", isDark ? "text-white" : "text-black")}>
                        <img
                            src="/favicon.svg"
                            alt="UseHub"
                            className="h-7 w-7"
                        />
                        <BrandWord isDark={isDark} />
                    </div>
                    <div className={cn("text-xs mt-1", isDark ? "text-white/50" : "text-black/50")}>Resources &amp; Services</div>
                </div>

                <nav
                    data-sidebar-scroll
                    className="usehub-sidebar-scroll flex-1 space-y-2 overflow-y-auto overscroll-contain px-6 pb-6 pt-5"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: isDark
                            ? 'rgba(255,255,255,0.06) transparent'
                            : 'rgba(0,0,0,0.06) transparent',
                    }}
                >
                    <CategoryList
                        activeKey={activeKey}
                        onSelect={setActiveKey}
                        isDark={isDark}
                        favoritesCount={favoritesCount}
                        isMobile={false}
                    />
                </nav>
            </div>
        </aside>
    );
}
