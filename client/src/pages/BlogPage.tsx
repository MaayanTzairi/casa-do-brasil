/**
 * CASA DO BRASIL — Blog Index Page
 * Hero: identical to Gallery/Menu hero style
 * Grid: post cards, no category filters
 * SEO: canonical, og:title, og:description, og:image per page
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { BLOG_POSTS, type BlogPost } from "@/data/blogPosts";

const GOLD = "#FEDF00";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DEEP = "rgb(22,1,3)";
const GREEN = "#009C3B";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-interior_opt_801e8f3d.webp";

/* ─── HERO — identical structure to Gallery & Menu ─── */
function BlogHero({ isHe }: { isHe: boolean }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = HERO_IMG;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(420px, 70vh, 720px)",
        overflow: "hidden",
        background: BORDEAUX_DEEP,
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full">
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${HERO_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
            }}
          />
        </div>
      </div>

      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }} />

      {/* Gold inset frame */}
      <div style={{ position: "absolute", top: 0, left: "20px", right: "20px", bottom: "20px", pointerEvents: "none", zIndex: 2 }}>
        <div style={{ position: "absolute", top: "82px", left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.55)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.55)" }} />
        <div style={{ position: "absolute", top: "82px", bottom: 0, left: 0, width: "1px", background: "rgba(185,161,103,0.55)" }} />
        <div style={{ position: "absolute", top: "82px", bottom: 0, right: 0, width: "1px", background: "rgba(185,161,103,0.55)" }} />
      </div>

      {/* Content */}
      <div
        dir={isHe ? "rtl" : "ltr"}
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5.5rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(44px, 7vw, 100px)",
            color: "#FFFFFF",
            lineHeight: 0.88,
            letterSpacing: isHe ? "-0.01em" : "-0.02em",
            margin: "0 0 0.8rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}
        >
          {isHe ? "בלוג" : "BLOG"}
        </h1>

        <div
          style={{
            width: "clamp(80px, 14vw, 200px)",
            height: "1px",
            background: GOLD,
            transformOrigin: isHe ? "right" : "left",
            marginBottom: "0.9rem",
            transform: loaded ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1s 0.6s ease",
          }}
        />

        <p
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(15px, 1.4vw, 19px)",
            letterSpacing: isHe ? "0.04em" : "0.1em",
            fontStyle: "italic",
            margin: 0,
            color: "rgba(240,220,160,0.90)",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.7s 0.9s",
          }}
        >
          {isHe ? "גריל ברזילאי — מוזיקה וצ'ורוסקריה" : "Brazilian Grill — Music & Churrascaria"}
        </p>
      </div>
    </section>
  );
}

/* ─── POST CARD ─── */
function PostCard({ post, isHe }: { post: BlogPost; isHe: boolean }) {
  const slug = post.slug;
  const title = isHe ? post.titleHe : post.titleEn;
  const excerpt = isHe ? post.excerptHe : post.excerptEn;
  const category = isHe ? post.categoryHe : post.categoryEn;

  return (
    <Link href={`/blog/${slug}`}>
      <article
        style={{
          display: "block",
          cursor: "pointer",
          borderBottom: "1px solid rgba(180,180,180,0.3)",
          paddingBottom: "2.5rem",
          marginBottom: "2.5rem",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.opacity = "0.85";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.opacity = "1";
        }}
      >
        {/* Cover image */}
        {post.coverImage && (
          <div
            style={{
              width: "100%",
              aspectRatio: "16/7",
              overflow: "hidden",
              marginBottom: "1.4rem",
              background: BORDEAUX_DEEP,
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
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
          </div>
        )}

        {/* Meta row */}
        <div
          dir={isHe ? "rtl" : "ltr"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.7rem",
            flexWrap: "wrap",
          }}
        >
          {/* Category badge */}
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(11px, 0.9vw, 13px)",
              letterSpacing: isHe ? "0.04em" : "0.18em",
              textTransform: "uppercase",
              color: GREEN,
            }}
          >
            {category}
          </span>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(62,4,9,0.25)", flexShrink: 0 }} />
          {/* Date */}
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(12px, 0.95vw, 14px)",
              color: "rgba(62,4,9,0.5)",
            }}
          >
            {post.date}
          </span>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(62,4,9,0.25)", flexShrink: 0 }} />
          {/* Read time */}
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(12px, 0.95vw, 14px)",
              color: "rgba(62,4,9,0.5)",
            }}
          >
            {isHe ? `${post.readMinutes} דקות קריאה` : `${post.readMinutes} min read`}
          </span>
        </div>

        {/* Title */}
        <h2
          dir={isHe ? "rtl" : "ltr"}
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(22px, 2.2vw, 32px)",
            color: BORDEAUX,
            lineHeight: 1.2,
            margin: "0 0 0.7rem",
            textAlign: isHe ? "right" : "left",
          }}
        >
          {title}
        </h2>

        {/* Excerpt */}
        <p
          dir={isHe ? "rtl" : "ltr"}
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(17px, 1.4vw, 20px)",
            color: "rgb(90,35,35)",
            lineHeight: 1.7,
            margin: "0 0 1.2rem",
            textAlign: isHe ? "right" : "left",
          }}
        >
          {excerpt}
        </p>

        {/* Read more link */}
        <div
          dir={isHe ? "rtl" : "ltr"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: BORDEAUX,
            flexDirection: isHe ? "row-reverse" : "row",
            justifyContent: isHe ? "flex-end" : "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(13px, 1vw, 15px)",
              letterSpacing: isHe ? "0.04em" : "0.12em",
              textTransform: "uppercase",
            }}
          >
            {isHe ? "קראו עוד" : "Read more"}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BORDEAUX} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/blog`;
  }, [isHe]);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navbar />
      <BlogHero isHe={isHe} />

      {/* Post list */}
      <div
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          padding: "4rem clamp(1.2rem, 6vw, 3rem) 6rem",
        }}
      >
        {BLOG_POSTS.length === 0 ? (
          <div
            dir={isHe ? "rtl" : "ltr"}
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
          BLOG_POSTS.map((post) => (
            <PostCard key={post.slug} post={post} isHe={isHe} />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
