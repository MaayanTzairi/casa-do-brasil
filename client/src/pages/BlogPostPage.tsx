/**
 * CASA DO BRASIL — Blog Post Page
 * Design: Clean, minimal, classic — matches site design language
 * SEO: title, description, canonical, og:*, article:*, JSON-LD structured data
 * Typography: Heebo, same scale as MenuPage item names/descriptions
 */

import { useEffect } from "react";
import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { BLOG_POSTS } from "@/data/blogPosts";

const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DEEP = "rgb(22,1,3)";
const GREEN = "#009C3B";
const GOLD = "#FEDF00";

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
  el.content = content;
}
function setOg(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
  el.content = content;
}
function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) { el = document.createElement("link"); el.rel = "canonical"; document.head.appendChild(el); }
  el.href = href;
}
function setJsonLd(data: object) {
  let el = document.querySelector('script[type="application/ld+json"][data-blog]') as HTMLScriptElement | null;
  if (!el) { el = document.createElement("script"); el.type = "application/ld+json"; el.setAttribute("data-blog", "1"); document.head.appendChild(el); }
  el.textContent = JSON.stringify(data);
}

export default function BlogPostPage() {
  const { isHe } = useLanguage();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  // SEO injection
  useEffect(() => {
    if (!post) return;
    const title = isHe ? post.titleHe : post.titleEn;
    const desc = isHe ? post.excerptHe : post.excerptEn;
    const url = `${window.location.origin}/blog/${post.slug}`;

    document.title = `${title} | Casa do Brasil`;
    setMeta("description", desc);
    setCanonical(url);
    setOg("og:type", "article");
    setOg("og:title", title);
    setOg("og:description", desc);
    setOg("og:url", url);
    if (post.coverImage) setOg("og:image", post.coverImage);
    setOg("og:site_name", "Casa do Brasil");
    setOg("article:published_time", post.isoDate);
    setOg("article:section", isHe ? post.categoryHe : post.categoryEn);

    // JSON-LD Article structured data
    setJsonLd({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": desc,
      "datePublished": post.isoDate,
      "image": post.coverImage ?? "",
      "author": {
        "@type": "Organization",
        "name": "Casa do Brasil",
        "url": window.location.origin,
      },
      "publisher": {
        "@type": "Restaurant",
        "name": "Casa do Brasil",
        "url": window.location.origin,
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`,
        },
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    });
  }, [post, isHe]);

  // 404 state
  if (!post) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar forceScrolled={true} />
        <div
          style={{
            maxWidth: "820px", margin: "0 auto",
            padding: "calc(70px + 6rem) clamp(1.2rem, 6vw, 3rem) 6rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: "clamp(18px, 1.5vw, 22px)", color: "rgba(62,4,9,0.5)", fontWeight: 300 }}>
            {isHe ? "הפוסט לא נמצא" : "Post not found"}
          </p>
          <Link href="/blog">
            <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.12em", textTransform: "uppercase", color: BORDEAUX, textDecoration: "underline", cursor: "pointer" }}>
              {isHe ? "חזרה לבלוג" : "Back to blog"}
            </span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const title = isHe ? post.titleHe : post.titleEn;
  const category = isHe ? post.categoryHe : post.categoryEn;
  const body = isHe ? post.bodyHe : post.bodyEn;

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navbar forceScrolled={true} />

      <main
        dir={isHe ? "rtl" : "ltr"}
        style={{ paddingTop: "calc(70px + 3rem)", paddingBottom: "6rem" }}
      >
        <div
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            padding: "0 clamp(1.2rem, 6vw, 3rem)",
          }}
        >
          {/* ── Breadcrumb ── */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2.5rem",
              flexDirection: isHe ? "row-reverse" : "row",
              justifyContent: isHe ? "flex-end" : "flex-start",
            }}
          >
            <Link href="/blog">
              <span
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(12px, 0.95vw, 14px)",
                  letterSpacing: isHe ? "0.04em" : "0.12em",
                  textTransform: "uppercase",
                  color: BORDEAUX,
                  cursor: "pointer",
                  opacity: 0.6,
                  textDecoration: "none",
                }}
              >
                {isHe ? "בלוג" : "Blog"}
              </span>
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(62,4,9,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: isHe ? "rotate(180deg)" : "none", flexShrink: 0 }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(12px, 0.95vw, 14px)",
                color: "rgba(62,4,9,0.45)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "200px",
              }}
            >
              {title}
            </span>
          </nav>

          {/* ── Article header ── */}
          <header style={{ marginBottom: "2.5rem", textAlign: isHe ? "right" : "left" }}>
            {/* Category + date + read time */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
                flexDirection: isHe ? "row-reverse" : "row",
                justifyContent: isHe ? "flex-end" : "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(12px, 0.95vw, 14px)",
                  letterSpacing: isHe ? "0.04em" : "0.18em",
                  textTransform: "uppercase",
                  color: GREEN,
                }}
              >
                {category}
              </span>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(62,4,9,0.25)", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(12px, 0.95vw, 14px)", color: "rgba(62,4,9,0.5)" }}>
                {post.date}
              </span>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(62,4,9,0.25)", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(12px, 0.95vw, 14px)", color: "rgba(62,4,9,0.5)" }}>
                {isHe ? `${post.readMinutes} דקות קריאה` : `${post.readMinutes} min read`}
              </span>
            </div>

            {/* Title — large, bordeaux, weight 900 */}
            <h1
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(32px, 4.5vw, 62px)",
                color: BORDEAUX,
                lineHeight: 1.0,
                letterSpacing: isHe ? "0.01em" : "0.02em",
                margin: "0 0 1.2rem",
              }}
            >
              {title}
            </h1>

            {/* Gold rule */}
            <div style={{ width: "clamp(60px, 10vw, 140px)", height: "1px", background: GOLD, marginBottom: "1.4rem" }} />

            {/* Excerpt / lead */}
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(18px, 1.5vw, 22px)",
                color: "rgb(90,35,35)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {isHe ? post.excerptHe : post.excerptEn}
            </p>
          </header>

          {/* ── Cover image ── */}
          {post.coverImage && (
            <div
              style={{
                width: "100%",
                aspectRatio: "16/7",
                overflow: "hidden",
                marginBottom: "3rem",
                background: BORDEAUX_DEEP,
              }}
            >
              <img
                src={post.coverImage}
                alt={title}
                width={1200}
                height={525}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          )}

          {/* ── Article body ── */}
          <div
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(17px, 1.4vw, 21px)",
              color: "rgb(40,10,12)",
              lineHeight: 1.85,
              textAlign: isHe ? "right" : "left",
            }}
            className="blog-body"
          >
            {body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(22px, 2vw, 30px)",
                      color: BORDEAUX,
                      margin: "2.5rem 0 0.8rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3
                    key={i}
                    style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(18px, 1.5vw, 22px)",
                      color: BORDEAUX,
                      margin: "2rem 0 0.6rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "p") {
                return (
                  <p key={i} style={{ margin: "0 0 1.4rem" }}>
                    {block.text}
                  </p>
                );
              }
              if (block.type === "divider") {
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2.5rem 0", justifyContent: isHe ? "flex-end" : "flex-start" }}>
                    <div style={{ width: "28px", height: "2px", background: GREEN }} />
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(62,4,9,0.25)" }} />
                    <div style={{ width: "28px", height: "2px", background: GREEN }} />
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* ── Back link ── */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(180,180,180,0.3)",
              display: "flex",
              flexDirection: isHe ? "row-reverse" : "row",
              justifyContent: isHe ? "flex-end" : "flex-start",
            }}
          >
            <Link href="/blog">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  flexDirection: isHe ? "row-reverse" : "row",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BORDEAUX} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: isHe ? "none" : "rotate(180deg)" }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(13px, 1vw, 15px)",
                    letterSpacing: isHe ? "0.04em" : "0.12em",
                    textTransform: "uppercase",
                    color: BORDEAUX,
                  }}
                >
                  {isHe ? "כל הפוסטים" : "All posts"}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
