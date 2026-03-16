/**
 * CASA DO BRASIL — Avi's Playlist Page
 * Design: Dark bordeaux/gold aesthetic matching the rest of the site
 * - Vinyl record hero with album art
 * - Song list with inline custom audio player
 * - Bilingual EN/HE support
 * - No framer-motion — CSS animations only
 * - Mobile-first, performance-optimized
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GOLD = "#B9A167";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DARK = "rgb(30,2,5)";

const ALBUM_COVER =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/avi-album-cover_07696985.webp";

// Songs will be populated once audio files are uploaded
// Each entry: { id, titleEn, titleHe, src }
const SONGS: { id: number; titleEn: string; titleHe: string; src: string }[] = [
  // Placeholder songs — replace src with actual CDN URLs after upload
  { id: 1, titleEn: "Song Title 1", titleHe: "שיר 1", src: "" },
  { id: 2, titleEn: "Song Title 2", titleHe: "שיר 2", src: "" },
  { id: 3, titleEn: "Song Title 3", titleHe: "שיר 3", src: "" },
  { id: 4, titleEn: "Song Title 4", titleHe: "שיר 4", src: "" },
  { id: 5, titleEn: "Song Title 5", titleHe: "שיר 5", src: "" },
];

/* ─── WAVEFORM VISUALIZER (CSS bars) ─── */
function WaveformBars({ playing }: { playing: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "2px",
      height: "18px",
    }}>
      {[0.6, 1, 0.75, 0.9, 0.55, 0.8, 0.65, 1, 0.7, 0.85].map((h, i) => (
        <div
          key={i}
          style={{
            width: "2px",
            height: `${h * 18}px`,
            background: GOLD,
            borderRadius: "1px",
            transformOrigin: "center",
            animation: playing ? `barPulse${(i % 4) + 1} ${0.6 + (i % 3) * 0.15}s ease-in-out infinite alternate` : "none",
            opacity: playing ? 1 : 0.35,
            transition: "opacity 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ─── PROGRESS BAR ─── */
function ProgressBar({
  current, duration, onSeek
}: {
  current: number; duration: number; onSeek: (t: number) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const pct = duration > 0 ? (current / duration) * 100 : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current || duration === 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    onSeek(ratio * duration);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
      <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: "10px", color: "rgba(185,161,103,0.7)", minWidth: "28px", textAlign: "right" }}>
        {fmt(current)}
      </span>
      <div
        ref={barRef}
        onClick={handleClick}
        style={{
          flex: 1, height: "3px", background: "rgba(185,161,103,0.2)",
          borderRadius: "2px", cursor: "pointer", position: "relative",
        }}
      >
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${pct}%`, background: GOLD, borderRadius: "2px",
          transition: "width 0.1s linear",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: `${pct}%`,
          transform: "translate(-50%, -50%)",
          width: "10px", height: "10px",
          background: GOLD, borderRadius: "50%",
          boxShadow: `0 0 6px rgba(185,161,103,0.5)`,
          transition: "left 0.1s linear",
        }} />
      </div>
      <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: "10px", color: "rgba(185,161,103,0.7)", minWidth: "28px" }}>
        {fmt(duration)}
      </span>
    </div>
  );
}

/* ─── SONG ROW ─── */
function SongRow({
  song, index, isActive, isPlaying, isHe,
  onToggle, currentTime, duration, onSeek
}: {
  song: typeof SONGS[0];
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  isHe: boolean;
  onToggle: () => void;
  currentTime: number;
  duration: number;
  onSeek: (t: number) => void;
}) {
  const title = isHe ? song.titleHe : song.titleEn;
  const hasAudio = !!song.src;

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(185,161,103,0.12)",
        transition: "background 0.25s ease",
        background: isActive ? "rgba(185,161,103,0.06)" : "transparent",
      }}
    >
      <div
        onClick={hasAudio ? onToggle : undefined}
        style={{
          display: "flex", alignItems: "center",
          padding: "1rem 1.5rem",
          gap: "1rem",
          cursor: hasAudio ? "pointer" : "default",
          opacity: hasAudio ? 1 : 0.45,
          direction: isHe ? "rtl" : "ltr",
        }}
      >
        {/* Track number / play indicator */}
        <div style={{
          width: "28px", height: "28px", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {isActive && isPlaying ? (
            <WaveformBars playing={true} />
          ) : isActive ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill={GOLD}>
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <span style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 700,
              fontSize: "0.7rem", color: "rgba(185,161,103,0.5)",
              letterSpacing: "0.05em",
            }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Song title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: isHe ? "'Heebo', sans-serif" : "'Heebo', sans-serif",
            fontWeight: isActive ? 700 : 500,
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            color: isActive ? GOLD : "#e8dcc8",
            margin: 0,
            letterSpacing: isHe ? "0.01em" : "0.04em",
            transition: "color 0.25s ease",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {title}
          </p>
        </div>

        {/* Play/Pause button */}
        {hasAudio && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            style={{
              width: "36px", height: "36px", flexShrink: 0,
              borderRadius: "50%",
              border: `1.5px solid ${isActive ? GOLD : "rgba(185,161,103,0.35)"}`,
              background: isActive ? GOLD : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = GOLD;
              el.style.borderColor = GOLD;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = isActive ? GOLD : "transparent";
              el.style.borderColor = isActive ? GOLD : "rgba(185,161,103,0.35)";
            }}
          >
            {isActive && isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill={isActive ? BORDEAUX : GOLD}>
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill={isActive ? BORDEAUX : GOLD} style={{ marginLeft: "2px" }}>
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            )}
          </button>
        )}

        {!hasAudio && (
          <span style={{
            fontFamily: "'Heebo', sans-serif", fontSize: "0.65rem",
            color: "rgba(185,161,103,0.4)", letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            {isHe ? "בקרוב" : "SOON"}
          </span>
        )}
      </div>

      {/* Progress bar — only shown for active song */}
      {isActive && hasAudio && (
        <div style={{ padding: "0 1.5rem 0.8rem" }}>
          <ProgressBar current={currentTime} duration={duration} onSeek={onSeek} />
        </div>
      )}
    </div>
  );
}

/* ─── VINYL RECORD HERO ─── */
function VinylHero({ isPlaying, isHe }: { isPlaying: boolean; isHe: boolean }) {
  return (
    <div style={{
      position: "relative",
      paddingTop: "80px",
      paddingBottom: "3rem",
      background: `linear-gradient(180deg, ${BORDEAUX_DARK} 0%, ${BORDEAUX} 60%, rgba(62,4,9,0.85) 100%)`,
      overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Subtle noise texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        backgroundSize: "200px",
        opacity: 0.5,
        pointerEvents: "none",
      }} />

      {/* Decorative gold lines */}
      <div style={{
        position: "absolute", top: "50%", left: "5%", right: "5%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(185,161,103,0.15), transparent)",
        transform: "translateY(-50%)",
      }} />

      {/* Album cover — vinyl record style */}
      <div style={{
        position: "relative", display: "inline-block",
        marginBottom: "2rem",
      }}>
        {/* Vinyl shadow */}
        <div style={{
          position: "absolute", inset: "-8px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)",
          filter: "blur(12px)",
          zIndex: 0,
        }} />

        {/* Album art */}
        <div style={{
          position: "relative", zIndex: 1,
          width: "clamp(180px, 40vw, 280px)",
          height: "clamp(180px, 40vw, 280px)",
          borderRadius: "50%",
          overflow: "hidden",
          border: `3px solid rgba(185,161,103,0.4)`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(185,161,103,0.15)`,
          animation: isPlaying ? "vinylSpin 4s linear infinite" : "none",
        }}>
          <img
            src={ALBUM_COVER}
            alt="Avi Carel — Brazil in Eilat"
            width={280}
            height={158}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* Center hole */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "16px", height: "16px",
            borderRadius: "50%",
            background: BORDEAUX_DARK,
            border: `2px solid rgba(185,161,103,0.5)`,
            zIndex: 2,
          }} />
        </div>
      </div>

      {/* Title */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 1.5rem" }}>
        <p style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 300,
          fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: GOLD, margin: "0 0 0.5rem",
        }}>
          {isHe ? "הפלייליסט של" : "AVI CAREL"}
        </p>
        <h1 style={{
          fontFamily: "'Frank Ruhl Libre', serif",
          fontWeight: 900,
          fontSize: "clamp(2rem, 8vw, 3.5rem)",
          color: "#fff",
          margin: "0 0 0.4rem",
          lineHeight: 1.05,
          letterSpacing: isHe ? "0.02em" : "0.01em",
        }}>
          {isHe ? "הפלייליסט של אבי" : "AVI'S PLAYLIST"}
        </h1>
        <div style={{
          width: "48px", height: "2px",
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          margin: "0.8rem auto",
        }} />
        <p style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 300,
          fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
          color: "rgba(232,220,200,0.75)",
          margin: 0, letterSpacing: "0.05em",
        }}>
          {isHe
            ? "מוזיקה שנבחרה בלב על ידי הבעלים"
            : "Music curated with love by the owner"}
        </p>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function PlaylistPage() {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  const [activeId, setActiveId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const activeSong = SONGS.find(s => s.id === activeId);

  const handleToggle = useCallback((song: typeof SONGS[0]) => {
    if (!song.src) return;

    if (activeId === song.id) {
      // Toggle play/pause
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      // Switch to new song
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = song.src;
        audioRef.current.load();
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => setIsPlaying(false));
      }
      setActiveId(song.id);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [activeId, isPlaying]);

  const handleSeek = useCallback((t: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = t;
      setCurrentTime(t);
    }
  }, []);

  // Audio event listeners
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      // Auto-advance to next song
      const idx = SONGS.findIndex(s => s.id === activeId);
      const next = SONGS[idx + 1];
      if (next?.src) {
        audio.src = next.src;
        audio.load();
        audio.play().then(() => {
          setActiveId(next.id);
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, [activeId]);

  return (
    <div style={{ minHeight: "100vh", background: BORDEAUX_DARK }}>
      <Navbar />

      <VinylHero isPlaying={isPlaying} isHe={isHe} />

      {/* Song list */}
      <div style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "0 0 4rem",
      }}>
        {/* List header */}
        <div style={{
          display: "flex", alignItems: "center",
          padding: "1.2rem 1.5rem 0.8rem",
          borderBottom: "1px solid rgba(185,161,103,0.2)",
          direction: isHe ? "rtl" : "ltr",
        }}>
          <span style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 700,
            fontSize: "0.6rem", letterSpacing: "0.25em",
            color: "rgba(185,161,103,0.5)", textTransform: "uppercase",
            flex: 1,
          }}>
            {isHe ? "שיר" : "TRACK"}
          </span>
          <span style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 700,
            fontSize: "0.6rem", letterSpacing: "0.25em",
            color: "rgba(185,161,103,0.5)", textTransform: "uppercase",
          }}>
            {isHe ? "השמעה" : "PLAY"}
          </span>
        </div>

        {SONGS.map((song, i) => (
          <SongRow
            key={song.id}
            song={song}
            index={i}
            isActive={activeId === song.id}
            isPlaying={isPlaying && activeId === song.id}
            isHe={isHe}
            onToggle={() => handleToggle(song)}
            currentTime={activeId === song.id ? currentTime : 0}
            duration={activeId === song.id ? duration : 0}
            onSeek={handleSeek}
          />
        ))}

        {/* Upload notice */}
        <div style={{
          margin: "2rem 1.5rem 0",
          padding: "1.2rem 1.5rem",
          border: "1px solid rgba(185,161,103,0.2)",
          background: "rgba(185,161,103,0.04)",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 400,
            fontSize: "0.8rem", color: "rgba(185,161,103,0.6)",
            margin: 0, letterSpacing: "0.04em",
            lineHeight: 1.6,
          }}>
            {isHe
              ? "השירים יועלו בקרוב — חזרו לבקר!"
              : "Songs coming soon — check back later!"}
          </p>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes barPulse1 {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
        @keyframes barPulse2 {
          from { transform: scaleY(0.6); }
          to   { transform: scaleY(0.9); }
        }
        @keyframes barPulse3 {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1); }
        }
        @keyframes barPulse4 {
          from { transform: scaleY(0.5); }
          to   { transform: scaleY(0.85); }
        }
      `}</style>
    </div>
  );
}
