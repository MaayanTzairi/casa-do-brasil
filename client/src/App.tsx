import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch, useLocation, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
// FlyingBull is the LCP element — must be eager to avoid 2s render delay
import FlyingBull from "./components/FlyingBull";
// StickyReservationBtn is below-fold, keep lazy
const StickyReservationBtn = lazy(() => import("./components/StickyReservationBtn"));
// Lazy-load all pages so each is a separate chunk loaded on demand
const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PlaylistPage = lazy(() => import("./pages/PlaylistPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const VIPPage = lazy(() => import("./pages/VIPPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const BenefitsPage = lazy(() => import("./pages/BenefitsPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
// Branded loading fallback — bull logo with spinning yellow-green-blue ring
const BULL_LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_opt_4cf70427.webp";
function PageLoader() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "rgb(12,9,7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ position: "relative", width: "130px", height: "130px" }}>
        {/* Spinning conic-gradient ring: yellow → green → blue */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, #f5c518 0%, #2db84b 30%, #42a5f5 55%, #1565c0 70%, #f5c518 100%)",
          animation: "bullRingSpin 1.3s linear infinite",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #fff calc(100% - 6px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #fff calc(100% - 6px))",
          filter: "drop-shadow(0 0 8px rgba(45,184,75,0.6)) drop-shadow(0 0 16px rgba(245,197,24,0.4))",
        }} />
        {/* Bull logo centered */}
        <div style={{
          position: "absolute",
          inset: "10px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(12,9,7,0.90)",
        }}>
          <img
            src={BULL_LOGO_URL}
            alt="Casa do Brasil"
            style={{ width: "80px", height: "80px", objectFit: "contain" }}
          />
        </div>
      </div>
      <style>{`
        @keyframes bullRingSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
function ConditionalFlyingBull() {
  const [location] = useLocation();
  if (location !== "/") return null;
  return <FlyingBull />;
}
function Router() {
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
            <Suspense fallback={null}><StickyReservationBtn /></Suspense>
            <ConditionalFlyingBull />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
export default App;
