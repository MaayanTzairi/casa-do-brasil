import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Hide the LCP bootstrap image once React has mounted and painted.
// This prevents the fixed background image from bleeding through section transitions.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const lcpHero = document.getElementById("lcp-hero");
    if (lcpHero) {
      lcpHero.style.display = "none";
    }
  });
});
