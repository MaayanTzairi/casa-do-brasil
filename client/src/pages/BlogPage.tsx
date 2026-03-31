/**
 * CASA DO BRASIL — Blog Page
 * Public blog list — bilingual EN+HE, matches site design language
 */

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const GOLD = "rgb(185,161,103)";
const GOLD_A = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX = "rgb(22,1,3)";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function BlogCard({ post, isHe, index }: { post: any; isHe: boolean; index: number }) {
  const { ref, visible } = useScrollReveal();
  const title = isHe ? post.titleHe : post.titleEn;
  const excerpt = isHe ? post.excerptHe : post.excerptEn;
  const author = isHe ? post.authorHe : post.authorEn;
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(isHe ? "he-IL" : "en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ${index * 0.1}s ease, transform 0.7s ${index * 0.1}s ease`,
      }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${GOLD_A(0.15)}`,
            borderRadius: "2px",
            overflow: "hidden",
            cursor: "pointer",
            transition: "border-color 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = GOLD_A(0.45); (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = GOLD_A(0.15); (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
        >
          {/* Cover image */}
          <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", background: BORDEAUX, position: "relative" }}>
            {post.coverImageUrl ? (
              <img src={post.coverImageUrl} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${BORDEAUX} 0%, rgba(185,161,103,0.15) 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: GOLD_A(0.3), fontSize: "3rem", fontWeight: 900, letterSpacing: "0.1em" }}>CASA</span>
              </div>
            )}
            {/* Gold top line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          </div>

          {/* Content */}
          <div style={{ padding: "1.75rem 1.5rem 1.5rem", direction: isHe ? "rtl" : "ltr" }}>
            {/* Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.9rem" }}>
              {date && <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.15em", color: GOLD_A(0.7), textTransform: "uppercase" }}>{date}</span>}
              {author && <><div style={{ width: "20px", height: "1px", background: GOLD_A(0.3) }} /><span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.1em", color: GOLD_A(0.5) }}>{author}</span></>}
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              color: "#fff",
              lineHeight: 1.2,
              letterSpacing: isHe ? "0.01em" : "0.04em",
              margin: "0 0 0.8rem 0",
            }}>
              {title}
            </h2>

            {/* Excerpt */}
            {excerpt && (
              <p style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                margin: "0 0 1.2rem 0",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
                {excerpt}
              </p>
            )}

            {/* Read more */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: GOLD }}>
              <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                {isHe ? "קרא עוד" : "Read More"}
              </span>
              <span style={{ fontSize: "0.8rem" }}>→</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function BlogPage() {
  const { isHe } = useLanguage();
  useSeoMeta("blog", {
    titleHe: "בלוג | Casa do Brasil — קאסה דו ברזיל",
    titleEn: "Blog | Casa do Brasil — Brazilian Steakhouse Eilat",
    descriptionHe: "מאמרים, סיפורים וטיפים מעולם הבשר הברזילאי והעסק שלנו.",
    descriptionEn: "Articles, stories and tips from the world of Brazilian BBQ and our restaurant.",
  });
  const { data: posts, isLoading } = trpc.cms.getBlogPosts.useQuery();
  const { ref: heroRef, visible: heroVisible } = useScrollReveal();

  return (
    <>
      <Navbar />
      <main style={{ background: BORDEAUX, minHeight: "100vh", fontFamily: "'Heebo', sans-serif" }}>

        {/* Hero Banner */}
        <section style={{
          position: "relative",
          paddingTop: "clamp(120px, 18vw, 200px)",
          paddingBottom: "clamp(60px, 8vw, 100px)",
          textAlign: "center",
          overflow: "hidden",
        }}>
          {/* Background texture */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(185,161,103,0.08) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD_A(0.4)}, transparent)` }} />

          <div ref={heroRef} style={{ position: "relative", zIndex: 1, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
            <p style={{ fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>
              {isHe ? "קאסה דו ברזיל" : "Casa do Brasil"}
            </p>
            <h1 style={{
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              color: "#fff",
              lineHeight: 0.9,
              letterSpacing: isHe ? "0.02em" : "0.06em",
              textTransform: "uppercase",
              margin: "0 0 1.5rem 0",
            }}>
              {isHe ? "הבלוג" : "THE BLOG"}
            </h1>
            <div style={{ width: "60px", height: "2px", background: GOLD, margin: "0 auto 1.5rem" }} />
            <p style={{ fontWeight: 300, fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", color: "rgba(255,255,255,0.65)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
              {isHe
                ? "סיפורים, מתכונים, ועדכונים מהמטבח הברזילאי שלנו"
                : "Stories, recipes, and updates from our Brazilian kitchen"}
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1rem, 5vw, 3rem) clamp(4rem, 8vw, 8rem)" }}>

          {isLoading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${GOLD_A(0.1)}`, borderRadius: "2px", aspectRatio: "3/4", animation: "pulse 1.5s ease-in-out infinite" }} />
              ))}
            </div>
          )}

          {!isLoading && posts && posts.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 0", direction: isHe ? "rtl" : "ltr" }}>
              <p style={{ fontWeight: 300, fontSize: "1rem", color: GOLD_A(0.6), letterSpacing: "0.1em" }}>
                {isHe ? "אין פוסטים עדיין. בקרוב..." : "No posts yet. Coming soon..."}
              </p>
            </div>
          )}

          {!isLoading && posts && posts.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} isHe={isHe} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
