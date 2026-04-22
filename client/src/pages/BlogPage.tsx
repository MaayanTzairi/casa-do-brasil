/**
 * CASA DO BRASIL — Blog Index Page
 * Header: no hero image — same text-header style as FAQPage
 * Grid: 3 columns, compact post cards
 * SEO: title, description, canonical
 */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { BLOG_POSTS, type BlogPost } from "@/data/blogPosts";

const BORDEAUX = "rgb(62,4,9)";
const GOLD = "#FEDF00";
const GOLD_R = "rgba(254,223,0,";
const GREEN = "#009C3B";

/* ─── COMPACT POST CARD (3-column grid) ─── */
function PostCard({ post, isHe }: { post: BlogPost; isHe: boolean }) {
  const title = isHe ? post.titleHe : post.titleEn;
  const excerpt = isHe ? post.excerptHe : post.excerptEn;
  const category = isHe ? post.categoryHe : post.categoryEn;

  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        dir={isHe ? "rtl" : "ltr"}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
      >
        {/* Cover image */}
        {post.coverImage && (
          <div
            style={{
              width: "100%",
              aspectRatio: "3/2",
              overflow: "hidden",
              marginBottom: "1rem",
              background: "rgb(22,1,3)",
            }}
          >
            <img
              src={post.coverImage}
              alt={title}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 1.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
          </div>
        )}

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.45rem",
            flexWrap: "wrap",
            flexDirection: isHe ? "row-reverse" : "row",
            justifyContent: isHe ? "flex-end" : "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(10px, 0.8vw, 12px)",
              letterSpacing: isHe ? "0.04em" : "0.18em",
              textTransform: "uppercase",
              color: GREEN,
            }}
          >
            {category}
          </span>
          <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(62,4,9,0.25)", flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(11px, 0.85vw, 13px)",
              color: "rgba(62,4,9,0.5)",
            }}
          >
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(16px, 1.3vw, 20px)",
            color: BORDEAUX,
            lineHeight: 1.25,
            margin: "0 0 0.5rem",
            textAlign: isHe ? "right" : "left",
          }}
        >
          {title}
        </h2>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(13px, 1vw, 15px)",
            color: "rgb(90,35,35)",
            lineHeight: 1.65,
            margin: "0 0 0.9rem",
            textAlign: isHe ? "right" : "left",
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {excerpt}
        </p>

        {/* Read more */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            color: BORDEAUX,
            flexDirection: isHe ? "row-reverse" : "row",
            justifyContent: isHe ? "flex-end" : "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(11px, 0.85vw, 13px)",
              letterSpacing: isHe ? "0.04em" : "0.12em",
              textTransform: "uppercase",
            }}
          >
            {isHe ? "קראו עוד" : "Read more"}
          </span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={BORDEAUX} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: isHe ? "rotate(180deg)" : "none" }}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </article>
    </Link>
  );
}

/* ─── MAIN PAGE ─── */
export default function BlogPage() {
  const { isHe } = useLanguage();

  // SEO
  useEffect(() => {
    document.title = isHe
      ? "בלוג | קאסה דו ברזיל — גריל ברזילאי אילת"
      : "Blog | Casa do Brasil — Brazilian Grill Eilat";
    const desc = isHe
      ? "מאמרים, מתכונים וסיפורים מאחורי הקלעים של קאסה דו ברזיל — המסעדה הברזילאית של אילת."
      : "Articles, recipes and behind-the-scenes stories from Casa do Brasil — Eilat's Brazilian steakhouse.";
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) { metaDesc = document.createElement("meta"); metaDesc.name = "description"; document.head.appendChild(metaDesc); }
    metaDesc.content = desc;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${window.location.origin}/blog`;
  }, [isHe]);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navbar forceScrolled={true} />

      <main
        dir={isHe ? "rtl" : "ltr"}
        style={{
          paddingTop: "calc(70px + 4rem)",
          paddingBottom: "6rem",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 clamp(1.2rem, 6vw, 3rem)",
          }}
        >
          {/* ── Page Header — same style as FAQPage ── */}
          <header
            style={{
              padding: "0 0 2.5rem",
              borderBottom: `1px solid ${GOLD_R}0.2)`,
              marginBottom: "3rem",
              textAlign: isHe ? "right" : "left",
            }}
          >
            {/* Green label row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginBottom: "1rem",
                flexDirection: isHe ? "row-reverse" : "row",
                justifyContent: isHe ? "flex-end" : "flex-start",
              }}
            >
              <div style={{ width: "28px", height: "2px", background: GREEN, flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(13px, 1.05vw, 16px)",
                  letterSpacing: isHe ? "0.04em" : "0.12em",
                  textTransform: "uppercase",
                  color: GREEN,
                  lineHeight: 1.4,
                }}
              >
                {isHe ? "סיפורים מהמטבח" : "Stories from the kitchen"}
              </span>
            </div>

            {/* Main title */}
            <h1
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(32px, 4.5vw, 62px)",
                color: BORDEAUX,
                lineHeight: 0.9,
                letterSpacing: isHe ? "0.01em" : "0.02em",
                margin: "0 0 1.2rem",
              }}
            >
              {isHe ? "בלוג" : "BLOG"}
            </h1>

            {/* Gold rule */}
            <div style={{ width: "clamp(60px, 10vw, 140px)", height: "1px", background: GOLD, marginBottom: "1.2rem" }} />

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(18px, 1.5vw, 22px)",
                color: "rgb(90,35,35)",
                lineHeight: 1.7,
                margin: 0,
                textAlign: isHe ? "right" : "left",
              }}
            >
              {isHe
                ? "מאמרים, מתכונים וסיפורים מאחורי הקלעים של קאסה דו ברזיל."
                : "Articles, recipes and behind-the-scenes stories from Casa do Brasil."}
            </p>
          </header>

          {/* ── Post grid — 3 columns ── */}
          {BLOG_POSTS.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 0",
                color: "rgba(62,4,9,0.4)",
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(17px, 1.4vw, 21px)",
              }}
            >
              {isHe ? "בקרוב — פוסטים חדשים בדרך" : "Coming soon — new posts on the way"}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
              className="blog-grid"
            >
              {BLOG_POSTS.map((post) => (
                <PostCard key={post.slug} post={post} isHe={isHe} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Responsive: 2 cols on tablet, 1 col on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
