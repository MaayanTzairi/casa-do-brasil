import { useState } from "react";
import { useLocation } from "wouter";

const ADMIN_EMAIL = "test@casatest.com";
const ADMIN_PASSWORD = "12345";
const SESSION_KEY = "casa_admin_auth";

export function setAdminAuth() {
  sessionStorage.setItem(SESSION_KEY, "true");
}

export function clearAdminAuth() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setAdminAuth();
        navigate("/admin");
      } else {
        setError("מייל או סיסמה שגויים");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a0a00 0%, #2d1200 40%, #1a0a00 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Heebo', 'Assistant', sans-serif",
        padding: "24px",
      }}
    >
      {/* Background texture */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 30% 20%, rgba(180,120,40,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(180,120,40,0.06) 0%, transparent 60%)",
      }} />

      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(180,120,40,0.25)",
        borderRadius: "20px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "420px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: "64px", height: "64px",
            background: "linear-gradient(135deg, #b87828, #d4a04a)",
            borderRadius: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 8px 24px rgba(180,120,40,0.4)",
          }}>
            <span style={{ fontSize: "28px" }}>🥩</span>
          </div>
          <h1 style={{
            color: "#f5e6c8",
            fontSize: "22px",
            fontWeight: 700,
            margin: "0 0 4px",
            letterSpacing: "0.5px",
          }}>
            CASA DO BRASIL
          </h1>
          <p style={{ color: "rgba(245,230,200,0.5)", fontSize: "13px", margin: 0 }}>
            מערכת ניהול תוכן
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block",
              color: "rgba(245,230,200,0.7)",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "8px",
            }}>
              כתובת מייל
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="הכנס מייל"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${error ? "rgba(220,80,80,0.6)" : "rgba(180,120,40,0.3)"}`,
                borderRadius: "10px",
                color: "#f5e6c8",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                direction: "ltr",
                textAlign: "left",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(180,120,40,0.7)"}
              onBlur={e => e.target.style.borderColor = error ? "rgba(220,80,80,0.6)" : "rgba(180,120,40,0.3)"}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              color: "rgba(245,230,200,0.7)",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "8px",
            }}>
              סיסמה
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="הכנס סיסמה"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${error ? "rgba(220,80,80,0.6)" : "rgba(180,120,40,0.3)"}`,
                borderRadius: "10px",
                color: "#f5e6c8",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                direction: "ltr",
                textAlign: "left",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(180,120,40,0.7)"}
              onBlur={e => e.target.style.borderColor = error ? "rgba(220,80,80,0.6)" : "rgba(180,120,40,0.3)"}
            />
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              background: "rgba(220,80,80,0.12)",
              border: "1px solid rgba(220,80,80,0.4)",
              borderRadius: "8px",
              padding: "10px 14px",
              color: "#ff9090",
              fontSize: "13px",
              marginBottom: "16px",
              textAlign: "center",
            }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading
                ? "rgba(180,120,40,0.4)"
                : "linear-gradient(135deg, #b87828, #d4a04a)",
              border: "none",
              borderRadius: "10px",
              color: loading ? "rgba(255,255,255,0.5)" : "#1a0a00",
              fontSize: "15px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.5px",
              transition: "all 0.2s",
              boxShadow: loading ? "none" : "0 4px 16px rgba(180,120,40,0.35)",
            }}
          >
            {loading ? "מתחבר..." : "כניסה למערכת"}
          </button>
        </form>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          color: "rgba(245,230,200,0.25)",
          fontSize: "12px",
          marginTop: "28px",
          marginBottom: 0,
        }}>
          גישה מורשית בלבד
        </p>
      </div>
    </div>
  );
}
