"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, LogIn, BookOpen, Trophy, Zap, Users, Sparkles, Shield, Target } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId: email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("userId", data.userId);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Brand Panel */}
      <div className="auth-brand">
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "white", maxWidth: 380 }}>
          {/* Floating orbs */}
          <div style={{ position: "absolute", top: -120, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)", filter: "blur(1px)" }} className="animate-float" />
          <div style={{ position: "absolute", bottom: -80, right: -40, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.03)", filter: "blur(1px)", animationDelay: "1.5s" }} className="animate-float" />

          <div style={{ margin: "0 auto 28px", display: "flex", justifyContent: "center" }}>
            <Image src="/logo.png" alt="Vinsup Skill Academy" width={200} height={80} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} priority />
          </div>
          <p style={{ fontSize: "1.05rem", opacity: 0.85, marginBottom: "48px", lineHeight: 1.7, fontWeight: 400 }}>
            Your one-stop platform to crack aptitude rounds at top companies
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", textAlign: "left" }}>
            {[
              { icon: <Trophy size={18} />, text: "Compete with thousands of students nationwide" },
              { icon: <BookOpen size={18} />, text: "50 real-world questions: Aptitude + Verbal" },
              { icon: <Sparkles size={18} />, text: "Instant AI-powered scorecards & analysis" },
              { icon: <Shield size={18} />, text: "Anti-cheat proctored exam environment" },
            ].map((item, i) => (
              <div key={i} className="animate-fade-up" style={{ display: "flex", alignItems: "center", gap: "14px", animationDelay: `${0.3 + i * 0.1}s` }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "12px",
                  background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)"
                }}>
                  {item.icon}
                </div>
                <span style={{ opacity: 0.88, fontSize: "0.92rem", fontWeight: 400, lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ marginTop: "48px", display: "flex", justifyContent: "center", gap: "24px", opacity: 0.5, fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <span>🔒 Secure</span>
            <span>⚡ Fast</span>
            <span>📊 Analytics</span>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-side">
        <div className="auth-card animate-fade-up">
          {/* Logo & Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ margin: "0 auto 20px", display: "flex", justifyContent: "center" }}>
              <Image src="/logo.png" alt="Vinsup Skill Academy" width={160} height={64} style={{ objectFit: "contain" }} priority />
            </div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "8px", fontWeight: 800, letterSpacing: "-0.01em" }}>Welcome Back!</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", fontWeight: 400 }}>
              Sign in to continue your preparation journey
            </p>
          </div>

          {error && (
            <div style={{
              background: "rgba(240,93,94,0.06)", color: "var(--accent-dark)",
              padding: "13px 16px", borderRadius: "var(--radius-md)",
              marginBottom: "24px", border: "1.5px solid rgba(240,93,94,0.2)",
              fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px",
              fontWeight: 500
            }}>
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                required
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: "48px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--text-muted)", display: "flex", padding: "4px"
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: "100%", marginTop: "8px" }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span style={{ display: "inline-block", width: 18, height: 18, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginRight: 10 }} />
                  Signing in...
                </>
              ) : (
                <><LogIn size={18} style={{ marginRight: 8 }} /> Sign In</>
              )}
            </button>
          </form>

          <div style={{
            margin: "32px 0",
            display: "flex", alignItems: "center", gap: "16px"
          }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ color: "var(--text-muted)", fontSize: "0.82rem", whiteSpace: "nowrap", fontWeight: 500 }}>New to PrepZone?</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          <a
            href="/register"
            className="btn btn-outline btn-lg"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            Create Account
          </a>

          <p style={{
            textAlign: "center", marginTop: "24px",
            fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.7
          }}>
            By signing in, you agree to take tests fairly and honestly.<br />
            One attempt per student is strictly enforced.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
