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
// Minimal loading fallback — dark bordeaux bg prevents white flash on page transitions
function PageLoader() {
  const [location] = useLocation();
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
