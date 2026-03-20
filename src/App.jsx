import { useEffect, useMemo, useState } from "react";

// Data
import { CATEGORIES, TOOLS } from "./data";

// Icons
import I from "./icons";

// Components
import {
  ThemeToggle,
  ActionBtn,
  CustomSelect,
  ToolCard,
  Sidebar,
  MobileDrawer,
  SupportModal,
} from "./components";
import { useTheme } from "./components/Layout";

// Utilities
import { cn } from "./utils/helpers";

// ------------------------------
// Tally widget script
// ------------------------------
const TALLY_FORM_ID = "5BjvlP";

async function ensureTallyReady(timeoutMs = 2500) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (window.Tally && typeof window.Tally.openPopup === "function") return true;
    await new Promise(r => setTimeout(r, 50));
  }
  return false;
}

async function openTally(topic) {
  const ok = await ensureTallyReady();

  if (ok) {
    window.Tally.openPopup(TALLY_FORM_ID, {
      layout: "modal",
      overlay: true,
      width: 700,
      hideTitle: true,
      hiddenFields: { topic },
    });
    return;
  }

  window.open(
    `https://tally.so/r/${TALLY_FORM_ID}?topic=${encodeURIComponent(topic)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

// ------------------------------
// Page
// ------------------------------
export default function App() {
  const { theme, setTheme, isDark } = useTheme();
  const [activeCategoryRaw, setActiveCategoryRaw] = useState("all");
  const [queryRaw, setQueryRaw] = useState("");
  const [sort, setSort] = useState("name_asc");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const [atTop, setAtTop] = useState(() => window.scrollY < 60);

  // Favorites logic
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("usehub_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];

      try {
        localStorage.setItem("usehub_favorites", JSON.stringify(newFavorites));
      } catch (e) {
        console.error("Failed to save favorites:", e);
      }
      return newFavorites;
    });
  };

  // Load More pagination
  const ITEMS_PER_PAGE = 9;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Wrap setters to reset pagination when filters change
  const setActiveCategory = (cat) => {
    setActiveCategoryRaw(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };
  const setQuery = (val) => {
    setQueryRaw(val);
    setVisibleCount(ITEMS_PER_PAGE);
  };
  const activeCategory = activeCategoryRaw;
  const query = queryRaw;

  // Scroll watcher for "back to top" button
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // category key -> label
  const categoryMap = useMemo(() => {
    const m = new Map();
    CATEGORIES.forEach((c) => m.set(c.key, c.label));
    return m;
  }, []);

  const sortOptions = useMemo(
    () => [
      { value: "name_asc", label: "Name (A-Z)" },
      { value: "name_desc", label: "Name (Z-A)" },
      { value: "cat", label: "Category" },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = TOOLS.slice();

    if (activeCategory === "favorites") {
      list = list.filter(t => favorites.includes(t.id));
    } else if (activeCategory !== "all") {
      list = list.filter((t) => t.category === activeCategory);
    }

    if (q) {
      list = list.filter((t) => {
        const hay = `${t.name} ${(categoryMap.get(t.category) || "")} ${t.blurb}`.toLowerCase();
        return hay.includes(q);
      });
    }

    // Sorting
    if (sort === "name_asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name_desc") list.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "cat") list.sort((a, b) => (categoryMap.get(a.category) || "").localeCompare(categoryMap.get(b.category) || ""));
    return list;
  }, [activeCategory, categoryMap, query, sort, favorites]);

  // Paginated display
  const displayedTools = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const activeLabel = activeCategory === "favorites"
    ? "My Favorites"
    : (categoryMap.get(activeCategory) || "All in One");

  return (
    <>

      <div className="relative flex min-h-screen">
        <div className="hidden lg:block">
          <Sidebar
            activeKey={activeCategory}
            setActiveKey={setActiveCategory}
            isDark={isDark}
            favoritesCount={favorites.length}
          />
        </div>

        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isDark={isDark}
          favoritesCount={favorites.length}
        />

        <main className="flex-1 flex flex-col min-h-screen">
          <div className="w-full mx-auto max-w-7xl px-5 sm:px-8 py-10 flex-1">
            {/* Mobile top bar */}
            <div className="flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className={cn(
                  "h-11 w-11 rounded-xl border inline-flex items-center justify-center",
                  isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-black/10 text-black"
                )}
                aria-label="Open menu"
              >
                <I.Menu className="h-5 w-5" />
              </button>
              <div className={cn("flex items-center gap-2 text-sm font-semibold tracking-wide", isDark ? "text-white/70" : "text-black/60")}>
                <img
                  src="/favicon.svg"
                  alt="USEHUB"
                  className="h-4 w-4"
                />
                <span>USEHUB</span>
              </div>
              <div className="w-11" />
            </div>

            {/* Header block */}
            <div className="relative mt-8 lg:mt-0 w-full" style={{ paddingTop: "2cm" }}>
              {/* Top-right action buttons */}
              <div className="absolute flex items-center gap-2 flex-wrap justify-end" style={{ right: 0, top: "-16px" }}>
                <ActionBtn
                  icon={<I.Plus className="h-4 w-4" />}
                  label="Add an App"
                  onClick={() => openTally("add_app")}
                  theme={theme}
                  className={cn(
                    "!bg-[#767290] hover:!bg-[#868DAB] !border-transparent shadow-[0_12px_30px_rgba(118,114,144,0.22)]",
                    isDark ? "!text-white" : "!text-black"
                  )}
                  iconToneClassName={isDark ? "!text-white" : "!text-black"}
                />

                <ActionBtn
                  icon={<I.Heart className="h-4 w-4" />}
                  label="Support"
                  theme={theme}
                  iconToneClassName="text-purple-400"
                  onClick={() => setSupportOpen(true)}
                />

                <ActionBtn
                  icon={<I.Message className="h-4 w-4" />}
                  label="Feedback"
                  onClick={() => openTally("feedback")}
                  theme={theme}
                  iconToneClassName="text-lime-300"
                />

                <ThemeToggle theme={theme} setTheme={setTheme} compact />
              </div>

              {/* Title centered */}
              <div className="w-full flex justify-center">
                <div className={cn("text-4xl sm:text-5xl font-semibold tracking-tight text-center", isDark ? "text-white" : "text-black")}>
                  {activeLabel}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
                <div className="md:col-span-2">
                  <div className={cn("relative rounded-xl border overflow-hidden", isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white")}>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <I.Search className={cn("h-4 w-4", isDark ? "text-white/55" : "text-black/45")} />
                    </div>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search resources..."
                      className={cn(
                        "w-full pl-10 pr-3 py-2.5 rounded-xl outline-none focus:ring-2",
                        isDark
                          ? "bg-transparent text-white placeholder:text-white/35 focus:ring-orange-500/40"
                          : "bg-transparent text-black placeholder:text-black/35 focus:ring-orange-500/30"
                      )}
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <CustomSelect value={sort} onChange={setSort} options={sortOptions} isDark={isDark} />
                </div>
              </div>

              <div className={cn("mt-4 text-sm", isDark ? "text-white/55" : "text-black/55")}>Resources found: {filtered.length}</div>
            </div>

            {/* Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedTools.map((t) => (
                <ToolCard
                  key={t.id}
                  tool={t}
                  categoryLabel={categoryMap.get(t.category) || ""}
                  isDark={isDark}
                  isFavorite={favorites.includes(t.id)}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className={cn(
                    "px-6 py-3 rounded-xl border font-medium transition",
                    isDark
                      ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                      : "bg-black/5 hover:bg-black/10 border-black/10 text-black"
                  )}
                >
                  Load More ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        </main>

        <SupportModal
          open={supportOpen}
          onClose={() => setSupportOpen(false)}
          isDark={isDark}
        />

        {/* Back-to-top button */}
        {!atTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
              "fixed z-40 bottom-6 right-6 h-11 w-11 rounded-full border backdrop-blur-xl transition",
              isDark ? "bg-white/10 hover:bg-white/15 border-white/15 text-white" : "bg-white/80 hover:bg-white border-black/10 text-black"
            )}
            aria-label="Back to top"
            title="Back to top"
          >
            <I.ArrowUp className="h-5 w-5 mx-auto" />
          </button>
        )}
      </div>
    </>
  );
}
