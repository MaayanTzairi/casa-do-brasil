/**
 * CASA DO BRASIL — Admin Dashboard
 * Professional CMS interface with sidebar navigation
 * Organized by: Pages → Sections within each page
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import NavbarEditor from "./admin/NavbarEditor";
import FooterEditor from "./admin/FooterEditor";
import HeroEditor from "./admin/HeroEditor";
import OurStoryEditor from "./admin/OurStoryEditor";
import OurMenuEditor from "./admin/OurMenuEditor";
import GallerySectionEditor from "./admin/GallerySectionEditor";
import StatisticsEditor from "./admin/StatisticsEditor";
import ReviewsEditor from "./admin/ReviewsEditor";
import {
  Home,
  UtensilsCrossed,
  BookOpen,
  Images,
  HelpCircle,
  LayoutTemplate,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  ChevronRight,
  LogOut,
  ExternalLink,
  Loader2,
  Columns2,
  AlignJustify,
  Star,
  Navigation,
  Footprints,
  LayoutDashboard,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type SectionId =
  | "home-hero"
  | "home-story"
  | "home-menu"
  | "home-gallery"
  | "home-statistics"
  | "home-reviews"
  | "navbar"
  | "footer"
  | "menu-page"
  | "story-page"
  | "gallery-page"
  | "faq-page";

type PageId = "home" | "menu" | "story" | "gallery" | "faq" | "global";

interface NavSection {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavPage {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  sections?: NavSection[];
}

// ── Navigation Structure ──────────────────────────────────────────────────────

const NAV_PAGES: NavPage[] = [
  {
    id: "global",
    label: "גלובלי",
    icon: LayoutTemplate,
    sections: [
      { id: "navbar", label: "Navbar — תפריט עליון", icon: Navigation },
      { id: "footer", label: "Footer — פוטר", icon: Footprints },
    ],
  },
  {
    id: "home",
    label: "עמוד הבית",
    icon: Home,
    sections: [
      { id: "home-hero", label: "Hero", icon: LayoutDashboard },
      { id: "home-story", label: "הסיפור שלנו", icon: BookOpen },
      { id: "home-menu", label: "התפריט שלנו", icon: UtensilsCrossed },
      { id: "home-gallery", label: "גלריה", icon: Images },
      { id: "home-statistics", label: "מספרים", icon: Star },
      { id: "home-reviews", label: "הלקוחות שלנו", icon: AlignJustify },
    ],
  },
  {
    id: "menu",
    label: "תפריט",
    icon: UtensilsCrossed,
    sections: [
      { id: "menu-page", label: "קטגוריות ומנות", icon: UtensilsCrossed },
    ],
  },
  {
    id: "story",
    label: "הסיפור שלנו",
    icon: BookOpen,
    sections: [
      { id: "story-page", label: "תוכן הסיפור", icon: BookOpen },
    ],
  },
  {
    id: "gallery",
    label: "גלריה",
    icon: Images,
    sections: [
      { id: "gallery-page", label: "תמונות הגלריה", icon: Images },
    ],
  },
  {
    id: "faq",
    label: "שאלות ותשובות",
    icon: HelpCircle,
    sections: [
      { id: "faq-page", label: "שאלות ותשובות", icon: HelpCircle },
    ],
  },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({
  collapsed,
  onToggle,
  activeSection,
  onSelectSection,
}: {
  collapsed: boolean;
  onToggle: () => void;
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
}) {
  const [expandedPages, setExpandedPages] = useState<Set<PageId>>(
    () => new Set(["global", "home"] as PageId[])
  );
  const { logout, user } = useAuth();

  const togglePage = (pageId: PageId) => {
    setExpandedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageId)) next.delete(pageId);
      else next.add(pageId);
      return next;
    });
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-[#0f0f0f] border-r border-white/[0.08] transition-all duration-300 shrink-0",
        collapsed ? "w-[60px]" : "w-[260px]"
      )}
    >
      {/* Logo + Toggle */}
      <div className={cn(
        "flex items-center border-b border-white/[0.08] px-3 py-4",
        collapsed ? "flex-col gap-2" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded bg-[#8B1A1A] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-black">C</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold tracking-widest uppercase truncate">
                Casa do Brasil
              </p>
              <p className="text-white/40 text-[10px] tracking-wider">Admin CMS</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-7 h-7 rounded bg-[#8B1A1A] flex items-center justify-center">
            <span className="text-white text-xs font-black">C</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="text-white/40 hover:text-white/80 transition-colors p-1 rounded shrink-0"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_PAGES.map((page) => {
          const isExpanded = expandedPages.has(page.id);
          const PageIcon = page.icon;
          const hasActiveSectionInPage = page.sections?.some(
            (s) => s.id === activeSection
          );

          return (
            <div key={page.id}>
              {/* Page header (collapsible) */}
              <button
                onClick={() => togglePage(page.id)}
                title={collapsed ? page.label : undefined}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-colors group",
                  hasActiveSectionInPage
                    ? "text-white/90"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5",
                  collapsed && "justify-center"
                )}
              >
                <PageIcon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    hasActiveSectionInPage
                      ? "text-[#B9A167]"
                      : "text-white/40 group-hover:text-white/60"
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-xs font-semibold tracking-wide uppercase truncate">
                      {page.label}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-3 h-3 text-white/30 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-white/30 shrink-0" />
                    )}
                  </>
                )}
              </button>

              {/* Sections list */}
              {!collapsed && isExpanded && page.sections && (
                <div className="mt-0.5 mb-1 ml-3 pl-3 border-l border-white/10 space-y-0.5">
                  {page.sections.map((section) => {
                    const SectionIcon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => onSelectSection(section.id)}
                        className={cn(
                          "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-all text-xs",
                          isActive
                            ? "bg-[#8B1A1A]/80 text-white font-medium"
                            : "text-white/45 hover:text-white/80 hover:bg-white/5"
                        )}
                      >
                        <SectionIcon
                          className={cn(
                            "w-3.5 h-3.5 shrink-0",
                            isActive ? "text-[#B9A167]" : "text-white/30"
                          )}
                        />
                        <span className="truncate">{section.label}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#B9A167] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer — user + logout */}
      <div className="border-t border-white/[0.08] px-3 py-3">
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#8B1A1A]/60 border border-[#B9A167]/30 flex items-center justify-center shrink-0">
              <span className="text-[#B9A167] text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase() ?? "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-xs font-medium truncate">
                {user?.name ?? "Admin"}
              </p>
              <p className="text-white/30 text-[10px] truncate">מנהל</p>
            </div>
            <button
              onClick={logout}
              className="text-white/30 hover:text-white/70 transition-colors p-1"
              title="התנתק"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={logout}
            className="w-full flex justify-center text-white/30 hover:text-white/70 transition-colors p-1"
            title="התנתק"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </aside>
  );
}

// ── Section Placeholder ───────────────────────────────────────────────────────

const SECTION_META: Record<SectionId, { title: string; description: string; badge: string; icon: React.ComponentType<{ className?: string }> }> = {
  "home-hero": {
    title: "Hero Section",
    description: "כותרת ראשית, כפתורים, קישורי סושיאל ותמונת רקע — החלק הראשון שהמבקר רואה",
    badge: "עמוד הבית",
    icon: LayoutDashboard,
  },
  "home-story": {
    title: "הסיפור שלנו",
    description: "כותרת, תיאור, תמונות ו-CTA לסקשן הסיפור",
    badge: "עמוד הבית",
    icon: BookOpen,
  },
  "home-menu": {
    title: "התפריט שלנו",
    description: "כותרת, כרטיסי קטגוריות וכפתורים לסקשן התפריט",
    badge: "עמוד הבית",
    icon: UtensilsCrossed,
  },
  "home-gallery": {
    title: "גלריה",
    description: "כותרת, תיאור ו-5 תמונות לסקשן הגלריה",
    badge: "עמוד הבית",
    icon: Images,
  },
  "home-statistics": {
    title: "מספרים",
    description: "לקוחות, שנות ניסיון, דירוג — הנתונים המרשימים",
    badge: "עמוד הבית",
    icon: Star,
  },
  "home-reviews": {
    title: "הלקוחות שלנו",
    description: "ביקורות וחוות דעת של לקוחות",
    badge: "עמוד הבית",
    icon: AlignJustify,
  },
  navbar: {
    title: "Navbar — תפריט עליון",
    description: "טקסטים של קישורי הניווט וכפתור ההזמנה",
    badge: "גלובלי",
    icon: Navigation,
  },
  footer: {
    title: "Footer — פוטר",
    description: "כתובת, שעות פתיחה, טלפון וקישורים",
    badge: "גלובלי",
    icon: Footprints,
  },
  "menu-page": {
    title: "עמוד תפריט",
    description: "קטגוריות ומנות המסעדה",
    badge: "עמוד תפריט",
    icon: UtensilsCrossed,
  },
  "story-page": {
    title: "עמוד הסיפור",
    description: "תוכן עמוד הסיפור המלא",
    badge: "עמוד הסיפור",
    icon: BookOpen,
  },
  "gallery-page": {
    title: "עמוד גלריה",
    description: "כל תמונות הגלריה",
    badge: "עמוד גלריה",
    icon: Images,
  },
  "faq-page": {
    title: "שאלות ותשובות",
    description: "שאלות נפוצות ותשובות",
    badge: "FAQ",
    icon: HelpCircle,
  },
};

function SectionPlaceholder({ sectionId }: { sectionId: SectionId }) {
  const meta = SECTION_META[sectionId];
  const Icon = meta.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Section header card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/8 border border-[#8B1A1A]/15 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-[#8B1A1A]/60" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#B9A167] bg-[#B9A167]/10 px-2 py-0.5 rounded-full">
              {meta.badge}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{meta.title}</h2>
          <p className="text-sm text-gray-500">{meta.description}</p>
        </div>
      </div>

      {/* Coming soon placeholder */}
      <div className="flex-1 bg-white rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
          <Columns2 className="w-6 h-6 text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-400 mb-1">שדות העריכה יופיעו כאן</p>
        <p className="text-xs text-gray-300">בקרוב — עברית + אנגלית זה לצד זה</p>
      </div>
    </div>
  );
}

// ── Main Content Area ─────────────────────────────────────────────────────────

function SectionContent({ sectionId }: { sectionId: SectionId }) {
  switch (sectionId) {
    case "navbar":
      return <NavbarEditor />;
    case "footer":
      return <FooterEditor />;
    case "home-hero":
      return <HeroEditor />;
    case "home-story":
      return <OurStoryEditor />;
    case "home-menu":
      return <OurMenuEditor />;
    case "home-gallery":
      return <GallerySectionEditor />;
    case "home-statistics":
      return <StatisticsEditor />;
    case "home-reviews":
      return <ReviewsEditor />;
    default:
      return <SectionPlaceholder sectionId={sectionId} />;
  }
}

function ContentArea({ activeSection }: { activeSection: SectionId }) {
  const activePage = NAV_PAGES.find((p) =>
    p.sections?.some((s) => s.id === activeSection)
  );
  const activeSecMeta = activePage?.sections?.find((s) => s.id === activeSection);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f8f7f5] overflow-hidden">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400 text-xs">{activePage?.label}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-gray-800 text-xs font-medium">{activeSecMeta?.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            צפה באתר
          </a>
          <div className="w-px h-4 bg-gray-200" />
          <span className="text-xs text-gray-400">
            {new Date().toLocaleDateString("he-IL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </header>

      {/* Section header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
        <div className="flex items-start gap-4">
          {(() => {
            const meta = SECTION_META[activeSection];
            const Icon = meta.icon;
            return (
              <>
                <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/8 border border-[#8B1A1A]/15 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-[#8B1A1A]/60" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#B9A167] bg-[#B9A167]/10 px-2 py-0.5 rounded-full">
                      {meta.badge}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-gray-900 leading-tight">{meta.title}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{meta.description}</p>
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <SectionContent sectionId={activeSection} />
      </main>
    </div>
  );
}

// ── Auth Guards ───────────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#8B1A1A] flex items-center justify-center">
          <span className="text-white font-black text-sm">C</span>
        </div>
        <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
      <div className="flex flex-col items-center gap-6 p-8 max-w-sm w-full">
        <div className="w-14 h-14 rounded-2xl bg-[#8B1A1A] flex items-center justify-center">
          <span className="text-white font-black text-xl">C</span>
        </div>
        <div className="text-center">
          <h1 className="text-white text-xl font-bold mb-1">Casa do Brasil</h1>
          <p className="text-white/40 text-sm">ממשק ניהול — Admin CMS</p>
        </div>
        <Button
          onClick={() => (window.location.href = getLoginUrl())}
          className="w-full bg-[#8B1A1A] hover:bg-[#6d1414] text-white border-0"
        >
          התחבר לניהול
        </Button>
      </div>
    </div>
  );
}

function NoAccessScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
      <div className="flex flex-col items-center gap-4 p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-900/30 border border-red-800/50 flex items-center justify-center">
          <span className="text-red-400 text-2xl">✕</span>
        </div>
        <h1 className="text-white text-lg font-bold">אין הרשאה</h1>
        <p className="text-white/40 text-sm">
          רק מנהלים יכולים לגשת לממשק הניהול.
        </p>
        <a href="/" className="text-[#B9A167] text-sm hover:underline">
          חזור לאתר
        </a>
      </div>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────

export default function Admin() {
  const { user, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home-hero");

  if (loading) return <LoadingScreen />;
  if (!user) return <LoginScreen />;
  if (user.role !== "admin") return <NoAccessScreen />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />
      <ContentArea activeSection={activeSection} />
    </div>
  );
}
