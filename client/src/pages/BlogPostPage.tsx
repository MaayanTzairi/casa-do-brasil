/**
 * CASA DO BRASIL — Blog Post Page
 * Single blog post — bilingual EN+HE, matches site design language
 */

import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

const GOLD = "rgb(185,161,103)";
const GOLD_A = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX = "rgb(22,1,3)";

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isHe } = useLanguage();
  const { data: post, isLoading } = trpc.cms.getBlogPostBySlug.useQuery({ slug: slug ?? "" }, { enabled: !!slug });
  const { ref: heroRef, visible: heroVisible } = useScrollReveal(0.05);
  const { ref: contentRef, visible: contentVisible } = useScrollReveal(0.05);

  const title = post ? (isHe ? post.titleHe : post.titleEn) : "";
  const content = post ? (isHe ? post.contentHe : post.contentEn) : "";
  const author = post ? (isHe ? post.authorHe : post.authorEn) : "";
  const date = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(isHe ? "he-IL" : "en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  // Dynamic SEO for blog post
  useEffect(() => {
    if (!post) return;
    const seoTitle = isHe ? (post.seoTitleHe || post.titleHe) : (post.seoTitleEn || post.titleEn);
    const seoDesc = isHe ? (post.seoDescriptionHe || post.excerptHe) : (post.seoDescriptionEn || post.excerptEn);
    const seoKeywords = isHe ? post.seoKeywordsHe : post.seoKeywordsEn;
    document.title = `${seoTitle} | Casa do Brasil`;
    // Description
    let descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!descEl) { descEl = document.createElement("meta"); descEl.name = "description"; document.head.appendChild(descEl); }
    if (seoDesc) descEl.content = seoDesc;
    // Keywords
    if (seoKeywords) {
      let kwEl = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
      if (!kwEl) { kwEl = document.createElement("meta"); kwEl.name = "keywords"; document.head.appendChild(kwEl); }
      kwEl.content = seoKeywords;
    }
    // OG
    const ogImg = post.ogImageUrl || post.coverImageUrl;
    if (ogImg) {
      let ogEl = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null;
      if (!ogEl) { ogEl = document.createElement("meta"); ogEl.setAttribute("property", "og:image"); document.head.appendChild(ogEl); }
      ogEl.content = ogImg;
    }
    return () => { document.title = "Casa do Brasil — Brazilian Steakhouse Eilat"; };
  }, [post, isHe]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main style={{ background: BORDEAUX, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "40px", height: "40px", border: `2px solid ${GOLD_A(0.3)}`, borderTopColor: GOLD, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        </main>
        <Footer />
      </>
    );
  }

  if (!post || !post.published) {
    return (
      <>
        <Navbar />
        <main style={{ background: BORDEAUX, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.5rem" }}>
          <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, color: GOLD_A(0.7), fontSize: "1rem", letterSpacing: "0.15em" }}>
            {isHe ? "הפוסט לא נמצא" : "Post not found"}
          </p>
          <Link href="/blog">
            <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, cursor: "pointer", borderBottom: `1px solid ${GOLD_A(0.4)}`, paddingBottom: "2px" }}>
              {isHe ? "← חזרה לבלוג" : "← Back to Blog"}
            </span>
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ background: BORDEAUX, minHeight: "100vh", fontFamily: "'Heebo', sans-serif" }}>

        {/* Hero */}
        <section style={{ position: "relative", overflow: "hidden" }}>
          {/* Cover image */}
          {post.coverImageUrl && (
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${post.coverImageUrl})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.35)" }} />
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(22,1,3,0.3) 0%, rgba(22,1,3,0.85) 70%, rgba(22,1,3,1) 100%)" }} />
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD_A(0.4)}, transparent)` }} />

          <div
            ref={heroRef}
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "860px",
              margin: "0 auto",
              padding: `clamp(140px, 18vw, 200px) clamp(1.5rem, 5vw, 3rem) clamp(60px, 8vw, 100px)`,
              direction: isHe ? "rtl" : "ltr",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Back link */}
            <Link href="/blog">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD_A(0.7), cursor: "pointer", marginBottom: "2rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = GOLD}
                onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = GOLD_A(0.7)}
              >
                {isHe ? "← כל הפוסטים" : "← All Posts"}
              </span>
            </Link>

            {/* Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
              {date && <span style={{ fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.15em", color: GOLD_A(0.8), textTransform: "uppercase" }}>{date}</span>}
              {author && <><div style={{ width: "24px", height: "1px", background: GOLD_A(0.4) }} /><span style={{ fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.1em", color: GOLD_A(0.6) }}>{author}</span></>}
            </div>

            {/* Title */}
            <h1 style={{
              fontWeight: 900,
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: "#fff",
              lineHeight: 1.0,
              letterSpacing: isHe ? "0.01em" : "0.04em",
              margin: "0 0 1.5rem 0",
            }}>
              {title}
            </h1>
            <div style={{ width: "60px", height: "2px", background: GOLD }} />
          </div>
        </section>

        {/* Content */}
        <section style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vw, 8rem)" }}>
          <div
            ref={contentRef}
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              direction: isHe ? "rtl" : "ltr",
            }}
          >
            {content ? (
              <div
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.9,
                  letterSpacing: isHe ? "0.01em" : "0.02em",
                }}
                dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }}
              />
            ) : (
              <p style={{ fontWeight: 300, color: GOLD_A(0.5), fontStyle: "italic" }}>
                {isHe ? "תוכן בקרוב..." : "Content coming soon..."}
              </p>
            )}

            {/* Bottom separator */}
            <div style={{ margin: "3rem 0", height: "1px", background: `linear-gradient(90deg, ${GOLD_A(0.3)}, transparent)` }} />

            {/* Back to blog */}
            <Link href="/blog">
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase",
                color: GOLD, cursor: "pointer", paddingBottom: "2px", borderBottom: `1px solid ${GOLD_A(0.4)}`,
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.borderColor = GOLD}
                onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.borderColor = GOLD_A(0.4)}
              >
                {isHe ? "← חזרה לבלוג" : "← Back to Blog"}
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
