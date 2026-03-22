import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import StickyReservationBtn from "./components/StickyReservationBtn";
import FlyingBull from "./components/FlyingBull";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Lazy-load all pages so each is a separate chunk loaded on demand
const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const StoryPage = lazy(() => import("./pages/StoryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PlaylistPage = lazy(() => import("./pages/PlaylistPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const Admin = lazy(() => import("./pages/Admin"));

// Minimal loading fallback — keeps the background colour consistent
function PageLoader() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
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
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/gallery"} component={Gallery} />
        <Route path={"/menu"} component={MenuPage} />
        <Route path={"/story"} component={StoryPage} />
        <Route path={"/playlist"} component={PlaylistPage} />
        <Route path={"/faq"} component={FAQPage} />
        <Route path={"/admin"} component={Admin} />
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
              <StickyReservationBtn />
              <ConditionalFlyingBull />
            </TooltipProvider>
          </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
