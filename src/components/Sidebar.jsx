import { cn } from '../utils/helpers';
import { CategoryList } from './CategoryList';

export function Sidebar({ activeKey, setActiveKey, isDark, favoritesCount = 0 }) {
    return (
        <aside className={cn("h-full w-80 shrink-0 border-r backdrop-blur-xl", isDark ? "border-white/10 bg-black/40" : "border-black/10 bg-white/70")}>
            <div className="p-6">
                <div>
                    <div className={cn("flex items-center gap-2 text-3xl font-extrabold tracking-wide leading-none", isDark ? "text-white" : "text-black")}>
                        <img
                            src="/favicon.svg"
                            alt="USEHUB"
                            className="h-7 w-7"
                        />
                        <span>USEHUB</span>
                    </div>
                    <div className={cn("text-xs mt-1", isDark ? "text-white/50" : "text-black/50")}>Resources &amp; Services</div>
                </div>

                <nav className="mt-7 space-y-2">
                    <CategoryList
                        activeKey={activeKey}
                        onSelect={setActiveKey}
                        isDark={isDark}
                        favoritesCount={favoritesCount}
                    />
                </nav>
            </div>
        </aside>
    );
}
