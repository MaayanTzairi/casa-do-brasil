import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
// FlyingBull is the LCP element — must be eager to avoid 2s render delay
import FlyingBull from "./components/FlyingBull";
// Home and Menu are the two most-visited pages — load eagerly so navigation is instant
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
// StickyReservationBtn is below-fold, keep lazy
const StickyReservationBtn = lazy(() => import("./components/StickyReservationBtn"));
// Secondary pages — lazy-loaded on demand
const Gallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PlaylistPage = lazy(() => import("./pages/PlaylistPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const VIPPage = lazy(() => import("./pages/VIPPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const BenefitsPage = lazy(() => import("./pages/BenefitsPage"));
const ButcherPage = lazy(() => import("./pages/ButcherPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
// Prefetch secondary pages during browser idle time so they’re ready before the user clicks
function usePrefetchSecondaryPages() {
  useEffect(() => {
    const prefetch = () => {
      import("./pages/Gallery");
      import("./pages/FAQPage");
      import("./pages/VIPPage");
      import("./pages/BenefitsPage");
      import("./pages/BlogPage");
    };
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(prefetch, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const t = setTimeout(prefetch, 1500);
      return () => clearTimeout(t);
    }
  }, []);
}
// Minimal fallback — transparent, only shows after 200ms to avoid flash for fast loads
const BULL_LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_opt_4cf70427.webp";
function PageLoader() {
  return (
    <div style={{
      position: "fixed", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      // Transparent — page background shows through; loader fades in only after 200ms
      background: "transparent",
      animation: "loaderFadeIn 0.01s 0.2s both",
      zIndex: 9999,
      pointerEvents: "none",
    }}>
      <div style={{ position: "relative", width: "90px", height: "90px", opacity: 0, animation: "loaderFadeIn 0.15s 0.2s forwards" }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "conic-gradient(from 0deg, #f5c518 0%, #2db84b 30%, #42a5f5 55%, #1565c0 70%, #f5c518 100%)",
          animation: "bullRingSpin 1.1s linear infinite",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #fff calc(100% - 5px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #fff calc(100% - 5px))",
          filter: "drop-shadow(0 0 6px rgba(45,184,75,0.7)) drop-shadow(0 0 12px rgba(245,197,24,0.5))",
        }} />
        <div style={{
          position: "absolute", inset: "8px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
        }}>
          <img src={BULL_LOGO_URL} alt="" style={{ width: "54px", height: "54px", objectFit: "contain" }} />
        </div>
      </div>
      <style>{`
        @keyframes bullRingSpin { to { transform: rotate(360deg); } }
        @keyframes loaderFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
function ConditionalStickyBtn() {
  const [location] = useLocation();
  if (location === "/vip") return null;
  return <StickyReservationBtn />;
}
function ConditionalFlyingBull() {
  const [location] = useLocation();
  if (location !== "/") return null;
  return <FlyingBull />;
}
function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    // Wait for the page to render, then scroll to the element
    const tryScroll = (attempts = 0) => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 10) {
        setTimeout(() => tryScroll(attempts + 1), 150);
      }
    };
    setTimeout(() => tryScroll(), 100);
  }, []);
}
function Router() {
  usePrefetchSecondaryPages();
  useHashScroll();
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/gallery"} component={Gallery} />
        <Route path={"/menu"} component={MenuPage} />
        <Route path={"/story"}><Redirect to="/" /></Route>
        <Route path={"/playlist"} component={PlaylistPage} />
        <Route path={"/faq"} component={FAQPage} />
        <Route path={"/vip"} component={VIPPage} />
        <Route path={"/blog"} component={BlogPage} />
        <Route path={"/blog/:slug"} component={BlogPostPage} />
        <Route path={"/benefits"} component={BenefitsPage} />
        <Route path={"/butcher"} component={ButcherPage} />
        <Route path={"/accessibility"} component={AccessibilityPage} />
        <Route path={"/privacy"} component={PrivacyPage} />
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
            <Suspense fallback={null}><ConditionalStickyBtn /></Suspense>
            <ConditionalFlyingBull />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
export default App;
