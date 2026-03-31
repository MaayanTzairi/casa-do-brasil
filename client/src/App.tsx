import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

// FlyingBull is the LCP element — must be eager to avoid 2s render delay
import FlyingBull from "./components/FlyingBull";
// StickyReservationBtn is below-fold, keep lazy
const StickyReservationBtn = lazy(() => import("./components/StickyReservationBtn"));

// Lazy-load all pages so each is a separate chunk loaded on demand
const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const StoryPage = lazy(() => import("./pages/StoryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PlaylistPage = lazy(() => import("./pages/PlaylistPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const Admin = lazy(() => import("./pages/Admin"));
const VIPPage = lazy(() => import("./pages/VIPPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
// Minimal loading fallback — dark bordeaux bg prevents white flash on page transitions
function PageLoader() {
  const [location] = useLocation();
  // Use bordeaux for home page (hero is dark), white for other pages
  const isHome = location === "/";
  return (
    <div style={{
      minHeight: "100vh",
      background: isHome ? "rgb(28,2,4)" : "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: "32px",
        height: "32px",
        border: "2px solid rgba(185,161,103,0.25)",
        borderTop: "2px solid #B9A167",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ConditionalFlyingBull() {
  const [location] = useLocation();
  if (location !== "/") return null;
  return <FlyingBull />;
}

/**
 * On home page: prefetch the MenuPage JS chunk + its tRPC data so the
 * menu page opens instantly when the user clicks "VIEW MENU".
 */
function HomePrefetcher() {
  const [location] = useLocation();
  // Prefetch menu data via tRPC (result goes into React Query cache)
  trpc.cms.getMenuCategories.useQuery(undefined, {
    enabled: location === "/",
    staleTime: 60_000,
  });
  trpc.cms.getMenuItems.useQuery({}, {
    enabled: location === "/",
    staleTime: 60_000,
  });
  useEffect(() => {
    if (location !== "/") return;
    // Prefetch the MenuPage JS chunk after a short idle delay
    const hasRIC = typeof (window as any).requestIdleCallback === "function";
    let id: number;
    if (hasRIC) {
      id = (window as any).requestIdleCallback(() => { import("./pages/MenuPage"); });
    } else {
      id = window.setTimeout(() => { import("./pages/MenuPage"); }, 1500);
    }
    return () => {
      if (hasRIC) (window as any).cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [location]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <HomePrefetcher />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/gallery"} component={Gallery} />
        <Route path={"/menu"} component={MenuPage} />
        <Route path={"/story"} component={StoryPage} />
        <Route path={"/playlist"} component={PlaylistPage} />
        <Route path={"/faq"} component={FAQPage} />
        <Route path={"/admin"} component={Admin} />
        <Route path={"/vip"} component={VIPPage} />
        <Route path={"/blog"} component={BlogPage} />
        <Route path={"/blog/:slug"} component={BlogPostPage} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
          <ThemeProvider defaultTheme="light">
            <TooltipProvider>
              <Toaster />
              <Router />
              <Suspense fallback={null}><StickyReservationBtn /></Suspense>
              <ConditionalFlyingBull />
            </TooltipProvider>
          </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
