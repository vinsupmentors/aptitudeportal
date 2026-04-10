"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  LogOut, PlayCircle, BarChart2, User, Clock, HelpCircle,
  ChevronRight, Zap, Building2, Cpu, FlaskConical, Menu, X,
  ArrowLeft, Lock, Target,
} from "lucide-react";
import { Category, CATEGORIES, TEST_CARDS, DIFF_PILL } from "./testData";

/* ─────────────────────────────────────────────
   SVG ICON LIBRARY  — premium outlined vectors
───────────────────────────────────────────── */
const CategoryIcons: Record<string, JSX.Element> = {
  "Basic Aptitude & Verbal Test": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <rect x="6" y="5" width="22" height="30" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M10 13h14M10 18h14M10 23h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="31" cy="31" r="5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2"/>
      <path d="M29 31l1.5 1.5 2.5-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Logical Reasoning": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="28" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="28" r="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="28" cy="28" r="5" stroke="currentColor" strokeWidth="2"/>
      <path d="M17 12h6M12 17v6M28 17v6M17 28h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "Quantitative Aptitude": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <path d="M8 32l7-10 6 6 5-8 6-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="5" y="5" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="13" cy="14" r="2" fill="currentColor"/>
      <circle cx="20" cy="20" r="2" fill="currentColor"/>
      <circle cx="27" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
  "Verbal Ability": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <path d="M7 10h26v16a3 3 0 01-3 3H10a3 3 0 01-3-3V10z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M13 29l-3 5M27 29l3 5M16 34h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 17h12M14 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "Data Interpretation": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <rect x="5" y="25" width="7" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="16" y="18" width="7" height="17" rx="1.5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="27" y="10" width="7" height="25" rx="1.5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M7 22l10-8 11-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 2"/>
    </svg>
  ),
  "Technical Aptitude": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 7v4M20 29v4M7 20h4M29 20h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M11.5 11.5l2.8 2.8M25.7 25.7l2.8 2.8M11.5 28.5l2.8-2.8M25.7 14.3l2.8-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "English Grammar": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <path d="M10 32V14l10-6 10 6v18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M15 32v-8h10v8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M17 20h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "Coding & Programming": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <rect x="5" y="8" width="30" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M14 17l-5 3 5 3M26 17l5 3-5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 15l-4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "Abstract Reasoning": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <polygon points="20,6 34,30 6,30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <circle cx="20" cy="22" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M20 17v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  "Current Affairs & GK": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M20 7c0 0-5 5-5 13s5 13 5 13M20 7c0 0 5 5 5 13s-5 13-5 13M7 20h26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  "Psychometric Test": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <path d="M20 8c-6.6 0-12 5.4-12 12 0 3.8 1.8 7.2 4.5 9.4V32h15v-2.6C30.2 27.2 32 23.8 32 20c0-6.6-5.4-12-12-12z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M16 32h8M20 20v-6M20 20l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "Mock Interview Prep": (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <circle cx="20" cy="13" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M8 34c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M26 22l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

/* Fallback SVG for unknown categories */
const DefaultIcon = (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
    <rect x="7" y="7" width="26" height="26" rx="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

function getCategoryIcon(label: string) {
  return CategoryIcons[label] ?? DefaultIcon;
}

/* ─────────────────────────────────────────────
   FEATURED TEST CARD
   Shows the Basic Aptitude & Verbal Test above
   the category grid on the All view
───────────────────────────────────────────── */
function FeaturedTestCard({
  hasTakenTest,
  onStart,
  onResults,
}: {
  hasTakenTest: boolean;
  onStart: () => void;
  onResults: () => void;
}) {
  const featured = TEST_CARDS.find(c => c.id === "basic");
  if (!featured) return null;

  return (
    <div className="animate-fade-up featured-test-card" style={{
      marginBottom: "24px", borderRadius: "20px", overflow: "hidden",
      boxShadow: "0 8px 40px rgba(1,79,94,0.22), 0 2px 8px rgba(0,0,0,0.07)",
      border: "1.5px solid rgba(0,168,150,0.25)",
      background: "linear-gradient(135deg, rgba(0,168,150,0.06) 0%, rgba(2,128,144,0.04) 50%, #ffffff 100%)",
      position: "relative",
    }}>
      {/* Subtle top accent line */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #028090, #00A896, #05668D)", position: "absolute", top: 0, left: 0, right: 0 }} />

      {/* Urgency banner */}
      <div style={{
        background: "linear-gradient(90deg, #014f5e, #028090, #00A896, #028090, #014f5e)",
        backgroundSize: "300% 100%",
        animation: "shimmer 3s ease infinite",
        padding: "7px 20px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
        fontSize: "0.72rem", fontWeight: 800, color: "white",
        letterSpacing: "0.08em", textTransform: "uppercase",
        marginTop: 3,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFD700"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        Free for 7 Days Only — Start Now!
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFD700"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      </div>

      {/* Main horizontal body */}
      <div className="featured-card-body" style={{ display: "flex", alignItems: "center", gap: "20px", padding: "18px 22px" }}>

        {/* Left: Number badge */}
        <div style={{
          width: 52, height: 52, borderRadius: "14px", flexShrink: 0,
          background: "linear-gradient(135deg, #028090, #00A896)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 20px rgba(2,128,144,0.35)",
          position: "relative",
        }}>
          {/* Glow ring */}
          <div style={{ position: "absolute", inset: -3, borderRadius: "17px", border: "1.5px solid rgba(0,168,150,0.35)", pointerEvents: "none" }} />
          <span style={{ color: "white", fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>01</span>
        </div>

        {/* Middle: info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "3px 10px", borderRadius: "20px",
              background: "rgba(2,128,144,0.1)", color: "var(--primary-dark)",
              border: "1px solid rgba(2,128,144,0.2)",
            }}>⭐ Start Here</span>
            <span style={{
              fontSize: "0.6rem", fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
              background: DIFF_PILL[featured.difficulty].bg, color: DIFF_PILL[featured.difficulty].color,
            }}>{featured.difficulty}</span>
          </div>

          <h4 style={{ margin: "0 0 5px", fontSize: "1.08rem", color: "var(--primary-dark)", fontWeight: 900, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
            {featured.title}
          </h4>

          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.75rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600 }}>{featured.company}</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Clock size={11} /> {featured.duration}</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><HelpCircle size={11} /> {featured.questions} Questions</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ color: "var(--success)", fontWeight: 600 }}>No Negative Marking</span>
          </div>
        </div>

        {/* Right: CTA */}
        <div style={{ flexShrink: 0 }}>
          {hasTakenTest ? (
            <button onClick={onResults} style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "11px 22px", borderRadius: "12px",
              background: "var(--gradient-primary)", border: "none",
              color: "white", fontWeight: 800, fontSize: "0.88rem",
              cursor: "pointer", boxShadow: "0 6px 20px rgba(2,128,144,0.3)",
              whiteSpace: "nowrap",
            }}>
              <BarChart2 size={15} /> View Results
            </button>
          ) : (
            <button onClick={onStart} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "12px 24px", borderRadius: "12px",
              background: "linear-gradient(135deg, #028090, #00A896)",
              border: "none", color: "white", fontWeight: 800, fontSize: "0.9rem",
              cursor: "pointer", boxShadow: "0 6px 24px rgba(2,128,144,0.35)",
              whiteSpace: "nowrap",
            }}>
              <PlayCircle size={16} /> Start Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */
function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [hasTakenTest, setHasTakenTest] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeCategory: Category = useMemo(() => {
    const slug = searchParams.get("category");
    if (!slug) return "All";
    const found = CATEGORIES.find(c => c.slug === slug);
    return found ? found.id : "All";
  }, [searchParams]);

  const setActiveCategory = (cat: Category) => {
    if (cat === "All") {
      router.push("/dashboard");
    } else {
      const found = CATEGORIES.find(c => c.id === cat);
      if (found) router.push(`/dashboard?category=${found.slug}`);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) { router.push("/login"); return; }
    setUserId(id);
    fetch(`/api/user?userId=${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.name) setUserName(d.name);
        if (d.hasTakenTest) {
          setHasTakenTest(true);
          fetch(`/api/results?userId=${id}`)
            .then(r => r.json())
            .then(result => { if (!result.error) setTestResult(result); });
        }
      })
      .catch(() => {});
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const filtered = TEST_CARDS.filter(
    c => activeCategory === "All" || c.category === activeCategory,
  );

  if (!userId) return null;

  const hr = new Date().getHours();
  const greeting =
    hr < 5 ? "Good Night" :
    hr < 12 ? "Good Morning" :
    hr < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div style={{ minHeight: "100vh", background: "var(--gradient-bg)" }}>

      {/* ── Navbar ── */}
      <nav className="navbar" style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image src="/logo.png" alt="Vinsup Skill Academy" width={140} height={48} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} priority />
        </div>
        <div className="navbar-actions" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {hasTakenTest && (
            <button className="btn btn-ghost btn-sm" onClick={() => router.push("/results")}>
              <BarChart2 size={15} style={{ marginRight: 6 }} /> My Results
            </button>
          )}
          <button className="btn btn-ghost btn-sm" onClick={() => router.push("/profile")}>
            <User size={15} style={{ marginRight: 6 }} /> Profile
          </button>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            <LogOut size={15} style={{ marginRight: 6 }} /> Logout
          </button>
        </div>
        <button
          className="menu-btn"
          style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "none" }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── Mobile greeting strip ── */}
      {/* ── Mobile Hero Banner ── */}
      <div className="mobile-greeting" style={{ display: "none" }}>
        {/* Gradient background panel */}
        <div style={{
          background: "var(--gradient-primary)",
          backgroundSize: "200% 200%",
          padding: "20px 18px 24px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative orbs */}
          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "14px", position: "relative", zIndex: 1 }}>
            {/* Avatar */}
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              border: "2.5px solid rgba(255,255,255,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.3rem", fontWeight: 800, color: "white", flexShrink: 0,
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}>
              {userName ? userName[0].toUpperCase() : "U"}
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ margin: "0 0 2px", fontWeight: 800, fontSize: "1.05rem", color: "white", letterSpacing: "-0.01em" }}>
                {greeting}, {userName ? userName.split(" ")[0] : "Student"} 👋
              </p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.72)", fontWeight: 500 }}>
                Ready to ace your placement test?
              </p>
            </div>

            {hasTakenTest && testResult && (
              <div style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "12px",
                padding: "8px 12px",
                textAlign: "center",
                flexShrink: 0,
              }}>
                <div style={{ color: "white", fontWeight: 900, fontSize: "1.3rem", lineHeight: 1 }}>
                  {testResult.score.totalScore}<span style={{ fontSize: "0.7rem", opacity: 0.7, fontWeight: 600 }}>/50</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 2 }}>Score</div>
              </div>
            )}
          </div>

          {/* Rank badge strip */}
          {hasTakenTest && testResult && (
            <div style={{
              marginTop: "16px", position: "relative", zIndex: 1,
              display: "flex", gap: "8px",
            }}>
              {[
                { label: "Rank", value: `#${testResult.rank}`, bg: "rgba(255,255,255,0.15)" },
                { label: "Percentile", value: `${testResult.percentile}th`, bg: "rgba(255,255,255,0.10)" },
                { label: "Accuracy", value: `${Math.round((testResult.score.totalScore / 50) * 100)}%`, bg: "rgba(255,255,255,0.10)" },
              ].map((item, i) => (
                <div key={i} style={{
                  flex: 1, background: item.bg,
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "10px", padding: "8px 6px", textAlign: "center",
                }}>
                  <div style={{ color: "white", fontWeight: 800, fontSize: "1rem" }}>{item.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Drawer overlay ── */}
      <div className={`drawer-overlay ${mobileMenuOpen ? "visible" : ""}`} onClick={() => setMobileMenuOpen(false)} />

      <div className="dashboard-layout" style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>

        {/* ────────── SIDEBAR ────────── */}
        <aside
          className={`dashboard-sidebar ${mobileMenuOpen ? "open" : ""}`}
          style={{
            width: 270, background: "var(--surface)", borderRight: "1px solid var(--border)",
            padding: "20px 14px", flexShrink: 0,
            position: "sticky", top: 60, height: "calc(100vh - 60px)",
            overflowY: "auto", transition: "transform 0.3s ease",
          }}
        >
          {/* User card */}
          <div style={{
            padding: "18px 16px", borderRadius: "16px",
            background: "var(--gradient-primary)", color: "white",
            marginBottom: "18px", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, background: "rgba(255,255,255,0.06)", borderRadius: "50%" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "14px", position: "relative", zIndex: 1 }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%",
                background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.15rem", fontWeight: 700, flexShrink: 0,
              }}>
                {userName ? userName[0].toUpperCase() : "U"}
              </div>
              <div>
                <p style={{ fontWeight: 700, margin: "0 0 2px", fontSize: "0.95rem" }}>{userName || "Student"}</p>
                <p style={{ opacity: 0.7, margin: 0, fontSize: "0.72rem" }}>{greeting} ✨</p>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "6px", paddingLeft: "12px" }}>Quick Access</p>
          {[
            { label: "All Categories", icon: <HelpCircle size={15} />, action: () => { router.push("/dashboard"); setMobileMenuOpen(false); }, bg: "linear-gradient(135deg, #028090, #00A896)" },
            ...(hasTakenTest ? [{ label: "My Results", icon: <BarChart2 size={15} />, action: () => { router.push("/results"); setMobileMenuOpen(false); }, bg: "linear-gradient(135deg, #F7A500, #FF8C00)" }] : []),
            { label: "Profile", icon: <User size={15} />, action: () => { router.push("/profile"); setMobileMenuOpen(false); }, bg: "linear-gradient(135deg, #7B2C8B, #A83DBF)" },
          ].map((item, i) => (
            <button key={i} onClick={item.action} style={{
              display: "flex", alignItems: "center", gap: "10px", width: "100%",
              padding: "9px 12px", border: "none", borderRadius: "10px", cursor: "pointer",
              background: "transparent", color: "var(--text-main)", fontSize: "0.85rem",
              fontWeight: 600, transition: "all 0.2s ease", textAlign: "left", marginBottom: "2px",
            }}>
              <div style={{ width: 30, height: 30, borderRadius: "8px", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
                {item.icon}
              </div>
              {item.label}
            </button>
          ))}

          <div style={{ height: 1, background: "var(--border)", margin: "10px 12px 14px" }} />

          {/* Categories */}
          <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "6px", paddingLeft: "12px" }}>Categories</p>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setMobileMenuOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: "10px", width: "100%",
                padding: "10px 14px", border: "none", borderRadius: "10px", cursor: "pointer",
                background: isActive ? "rgba(0,168,150,0.1)" : "transparent",
                color: isActive ? "var(--primary-dark)" : "var(--text-main)",
                fontSize: "0.9rem", fontWeight: isActive ? 700 : 500,
                transition: "all 0.2s ease", textAlign: "left", marginBottom: "2px",
                borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent",
              }}>
                <span style={{ flex: 1, lineHeight: 1.3 }}>{cat.label}</span>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "20px",
                  background: isActive ? "var(--primary)" : "var(--surface-2)",
                  color: isActive ? "white" : "var(--text-muted)", minWidth: 22, textAlign: "center",
                }}>{cat.count}</span>
              </button>
            );
          })}

          {/* Logout */}
          <button onClick={handleLogout} style={{
            display: "flex", alignItems: "center", gap: "10px", width: "100%",
            padding: "10px 12px", border: "1px solid rgba(240,93,94,0.2)", borderRadius: "10px",
            cursor: "pointer", background: "rgba(240,93,94,0.04)", color: "var(--accent-dark)",
            fontSize: "0.82rem", fontWeight: 600, transition: "all 0.2s ease",
            textAlign: "left", marginTop: "14px",
          }}>
            <LogOut size={15} /> Sign Out
          </button>
        </aside>

        {/* ────────── MAIN CONTENT ────────── */}
        <main className="dashboard-main" style={{ flex: 1, padding: "28px 32px", overflowX: "hidden" }}>

          {/* KPI strip (only after test taken) */}
          {hasTakenTest && testResult && (
            <div className="kpi-scroll-wrapper">
            <div className="kpi-grid animate-fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "20px" }}>
              {/* Rank */}
              <div className="stat-card kpi-rank" style={{ padding: "16px", textAlign: "left", display: "flex", flexDirection: "column", gap: "4px", borderTop: "3px solid #028090" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(2,128,144,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BarChart2 size={14} color="var(--primary-dark)" />
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Global Rank</div>
                </div>
                <div className="kpi-value" style={{ fontSize: "1.7rem", fontWeight: 900, color: "var(--primary-dark)", lineHeight: 1 }}>#{testResult.rank}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--success)", fontWeight: 600 }}>Top {100 - testResult.percentile}% Achievers</div>
              </div>

              {/* Score */}
              <div className="stat-card" style={{ padding: "16px", textAlign: "left", display: "flex", flexDirection: "column", gap: "4px", borderTop: "3px solid #05668D" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(5,102,141,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Target size={14} color="var(--secondary)" />
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Score</div>
                </div>
                <div className="kpi-value" style={{ fontSize: "1.7rem", fontWeight: 900, color: "var(--secondary)", lineHeight: 1 }}>
                  {testResult.score.totalScore}<span className="kpi-sub" style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>/50</span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 }}>Accuracy: {Math.round((testResult.score.totalScore / 50) * 100)}%</div>
              </div>

              {/* Time */}
              <div className="stat-card" style={{ padding: "16px", textAlign: "left", display: "flex", flexDirection: "column", gap: "4px", borderTop: "3px solid #7B2C8B" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(123,44,139,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Clock size={14} color="#7B2C8B" />
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Time Spent</div>
                </div>
                <div className="kpi-value" style={{ fontSize: "1.7rem", fontWeight: 900, color: "#7B2C8B", lineHeight: 1 }}>
                  {testResult.score.timeTaken ? `${Math.floor(testResult.score.timeTaken / 60)}m` : "50m"}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 }}>{testResult.score.tabSwitches || 0} Tab Switch Violations</div>
              </div>

              {/* Strongest Area */}
              <div className="stat-card kpi-hide-mobile" style={{ padding: "16px", textAlign: "left", display: "flex", flexDirection: "column", gap: "4px", borderTop: "3px solid #F7A500" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(247,165,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Zap size={14} color="var(--gold-dark)" />
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Strongest</div>
                </div>
                <div className="kpi-value-text" style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--gold-dark)", lineHeight: 1.2, margin: "2px 0" }}>{testResult.score.strengths}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 }}>Focus: {testResult.score.weaknesses}</div>
              </div>
              {(() => {
                const available = TEST_CARDS.filter(t => t.available).length;
                const completed = hasTakenTest ? 1 : 0;
                const comingSoon = TEST_CARDS.filter(t => !t.available).length;
                const total = available + completed + comingSoon;
                const pctCompleted = (completed / total) * 100;
                const pctAvailable = (available / total) * 100;
                return (
                  <div className="stat-card" style={{ padding: "14px 16px", borderTop: "3px solid #028090" }}>
                    {/* Desktop: donut + legend side by side */}
                    <div className="progress-desktop" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{
                        width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
                        background: `conic-gradient(#028090 0% ${pctCompleted}%, #00A896 ${pctCompleted}% ${pctCompleted + pctAvailable}%, #e0e5ec ${pctCompleted + pctAvailable}% 100%)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 800, color: "var(--primary-dark)" }}>
                          {Math.round(((completed + available) / total) * 100)}%
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "2px" }}>Progress</div>
                        {[
                          { label: "Completed", value: completed, color: "#028090" },
                          { label: "Available", value: available, color: "#00A896" },
                          { label: "Locked", value: comingSoon, color: "#d0d9e0" },
                        ].map((s, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.72rem" }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                            <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
                            <span style={{ fontWeight: 700, color: "var(--text-main)", marginLeft: "auto" }}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Mobile: compact stacked */}
                    <div className="progress-mobile" style={{ display: "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                        <div style={{ width: 22, height: 22, borderRadius: "6px", background: "rgba(2,128,144,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <BarChart2 size={12} color="var(--primary-dark)" />
                        </div>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Progress</div>
                      </div>
                      <div className="kpi-value" style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--primary-dark)", lineHeight: 1 }}>
                        {Math.round(((completed + available) / total) * 100)}%
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 500, marginTop: 3 }}>
                        {completed} done · {comingSoon} locked
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
            </div>
          )}

          {/* Section heading + stats strip */}
          <div className="animate-fade-up mobile-section-header" style={{
            marginBottom: "16px", padding: "0 2px",
          }}>
            {/* Mobile: full-width pill strip */}
            <div className="mobile-stats-strip" style={{
              display: "none",
              background: "linear-gradient(135deg, #028090 0%, #05668D 100%)",
              borderRadius: "14px",
              padding: "14px 16px",
              marginBottom: "14px",
            }}>
              <div style={{ color: "white", fontWeight: 800, fontSize: "0.95rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "1rem" }}>📂</span>
                {activeCategory === "All" ? "Explore Categories" : activeCategory}
              </div>
              <div style={{ display: "flex", gap: "0" }}>
                {[
                  { value: "80+", label: "Tests" },
                  { value: "12", label: "Categories" },
                  { value: "2K+", label: "Questions" },
                ].map((s, i) => (
                  <div key={i} style={{
                    flex: 1, textAlign: "center",
                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.2)" : "none",
                  }}>
                    <div style={{ color: "white", fontWeight: 900, fontSize: "1.1rem" }}>{s.value}</div>
                    <div style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: side-by-side */}
            <div className="desktop-section-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <h3 style={{ fontSize: "1.05rem", color: "var(--secondary)", fontWeight: 800, margin: 0 }}>
                {activeCategory === "All" ? "📂 Explore Categories" : activeCategory}
              </h3>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                {[
                  { value: "80+", label: "Tests" },
                  { value: "12", label: "Categories" },
                  { value: "2K+", label: "Questions" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.88rem", color: "var(--primary-dark)" }}>{s.value}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              ALL CATEGORIES VIEW
          ══════════════════════════════════════ */}
          {activeCategory === "All" ? (
            <>
              {/* ── FEATURED TEST CARD ── */}
              <FeaturedTestCard
                hasTakenTest={hasTakenTest}
                onStart={() => router.push("/exam")}
                onResults={() => router.push("/results")}
              />

              {/* ── CATEGORY GRID — 3 columns, SVG icons ── */}
              <div
                className="category-grid stagger"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                }}
              >
                {CATEGORIES.map((cat, idx) => (
                  <div
                    key={cat.id}
                    className="card animate-fade-up category-card"
                    style={{
                      cursor: "pointer",
                      animationDelay: `${idx * 0.04}s`,
                      display: "flex",
                      flexDirection: "column",
                      padding: "22px 20px",
                      gap: "12px",
                      background: "var(--surface)",
                      borderRadius: "var(--radius-xl)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-sm)",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {/* SVG Icon container — no emoji */}
                    <div
                      className="cat-icon"
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "14px",
                        background: cat.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        boxShadow: "var(--shadow-sm)",
                        flexShrink: 0,
                      }}
                    >
                      {getCategoryIcon(cat.label)}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3
                        className="cat-title"
                        style={{
                          fontSize: "0.95rem",
                          color: "var(--secondary)",
                          fontWeight: 800,
                          margin: "0 0 5px",
                          lineHeight: 1.3,
                        }}
                      >
                        {cat.label}
                      </h3>
                      <p
                        className="cat-count"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "0.78rem",
                          color: "var(--text-muted)",
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        {cat.count > 0 ? (
                          <><Zap size={12} color="var(--primary)" /> {cat.count} Module{cat.count !== 1 && "s"}</>
                        ) : (
                          <><Clock size={12} color="var(--text-muted)" /> Locked</>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>

          ) : (
            /* ══════════════════════════════════════
               FILTERED CATEGORY VIEW (unchanged)
            ══════════════════════════════════════ */
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <button className="btn btn-ghost" onClick={() => router.push("/dashboard")} style={{ padding: "8px 0", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 700 }}>
                  <ArrowLeft size={16} style={{ marginRight: "6px" }} /> BACK TO DIRECTORY
                </button>
                <h3 style={{ fontSize: "1rem", color: "var(--secondary)", margin: 0 }}>
                  {activeCategory}
                  <span style={{ marginLeft: "8px", fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 400 }}>({filtered.length} tests)</span>
                </h3>
              </div>

              {filtered.length === 0 ? (
                <div className="animate-fade-up" style={{ textAlign: "center", padding: "60px 20px", borderRadius: "var(--radius-xl)", border: "2px dashed var(--border)", color: "var(--text-muted)", background: "var(--surface)" }}>
                  <FlaskConical size={40} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
                  <h4 style={{ color: "var(--text-muted)", fontWeight: 600 }}>Curriculum in Development</h4>
                  <p style={{ fontSize: "0.88rem", maxWidth: 360, margin: "8px auto 0" }}>
                    High-quality mock tests for {activeCategory} are currently being curated by our evaluation team.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {filtered.map((card, idx) => (
                    <div
                      key={card.id}
                      style={{
                        display: "flex", alignItems: "center", gap: "18px",
                        padding: card.available ? "40px 20px 16px" : "16px 20px",
                        borderRadius: "14px", position: "relative", overflow: "hidden",
                        background: card.available
                          ? "linear-gradient(135deg, rgba(2,128,144,0.06) 0%, rgba(0,168,150,0.03) 50%, rgba(255,255,255,1) 100%)"
                          : "var(--surface)",
                        border: card.available ? "2.5px solid var(--primary)" : "1px solid var(--border)",
                        boxShadow: card.available
                          ? "0 0 24px rgba(0,168,150,0.25), 0 4px 20px rgba(0,168,150,0.12)"
                          : "0 1px 4px rgba(0,0,0,0.04)",
                        borderLeft: !card.available ? `4px solid ${card.tagColor}` : undefined,
                        opacity: !card.available ? 0.85 : 1,
                        animation: card.available ? "pulse-ring 2.5s ease-in-out infinite" : undefined,
                        transform: card.available ? "scale(1.01)" : undefined,
                        transition: "all 0.2s ease",
                        animationDelay: `${idx * 0.03}s`,
                      }}
                      className="animate-fade-up"
                    >
                      {card.available && (
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0,
                          background: "linear-gradient(90deg, #014d5a, #028090, #00A896, #028090, #014d5a)",
                          backgroundSize: "300% 100%",
                          animation: "shimmer 2.5s ease infinite",
                          padding: "7px 16px",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                          fontSize: "0.78rem", fontWeight: 800, color: "white",
                          letterSpacing: "0.05em", textTransform: "uppercase",
                        }}>
                          ⚡ Free for 7 days only — Start now! ⚡
                        </div>
                      )}
                      <div style={{
                        width: 36, height: 36, borderRadius: "10px", flexShrink: 0,
                        background: card.available ? "var(--gradient-primary)" : "var(--surface-2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.82rem", fontWeight: 800,
                        color: card.available ? "white" : "var(--text-muted)",
                        border: card.available ? "none" : "1px solid var(--border)",
                      }}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                          <span style={{
                            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                            padding: "2px 8px", borderRadius: "6px",
                            background: card.available ? `${card.tagColor}18` : "rgba(107,126,143,0.08)",
                            color: card.available ? card.tagColor : "var(--text-muted)",
                          }}>{card.tag}</span>
                          {!card.available && (
                            <span style={{
                              fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px",
                              borderRadius: "6px", background: "rgba(240,93,94,0.08)",
                              color: "var(--accent-dark)", letterSpacing: "0.04em", textTransform: "uppercase",
                              display: "flex", alignItems: "center", gap: "3px",
                            }}>
                              <Lock size={10} /> Locked
                            </span>
                          )}
                          <span style={{
                            fontSize: "0.65rem", fontWeight: 600, padding: "2px 8px", borderRadius: "6px",
                            background: card.available ? DIFF_PILL[card.difficulty].bg : "rgba(107,126,143,0.08)",
                            color: card.available ? DIFF_PILL[card.difficulty].color : "var(--text-muted)",
                          }}>{card.difficulty}</span>
                        </div>
                        <h4 style={{
                          margin: "0 0 3px", fontSize: "1rem",
                          color: card.available ? "var(--secondary)" : "var(--text-main)",
                          fontWeight: 700,
                        }}>{card.title}</h4>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.76rem", color: "var(--text-muted)" }}>
                          <span>{card.company}</span>
                          <span style={{ opacity: 0.4 }}>•</span>
                          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Clock size={12} /> {card.duration}</span>
                          <span style={{ opacity: 0.4 }}>•</span>
                          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><HelpCircle size={12} /> {card.questions} Questions</span>
                        </div>
                      </div>
                      <div style={{ flexShrink: 0 }}>
                        {!card.available ? (
                          <div style={{
                            padding: "9px 20px", borderRadius: "10px",
                            background: "var(--surface-2)", border: "1px solid var(--border)",
                            textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600,
                            display: "flex", alignItems: "center", gap: "6px",
                          }}>
                            <Lock size={13} /> Locked
                          </div>
                        ) : hasTakenTest && card.id === "basic" ? (
                          <button className="btn btn-secondary" style={{ fontSize: "0.85rem", padding: "9px 20px" }} onClick={() => router.push("/results")}>
                            <BarChart2 size={15} style={{ marginRight: 6 }} /> View Results
                          </button>
                        ) : (
                          <button className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "9px 20px" }} onClick={() => router.push("/exam")}>
                            <PlayCircle size={16} style={{ marginRight: 6 }} /> Start Test
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(0,168,150,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(0,168,150,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,168,150,0); }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .category-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md) !important;
          border-color: var(--primary) !important;
        }
        @media (max-width: 1024px) {
          .category-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .category-grid { grid-template-columns: 1fr !important; }
          .dashboard-main { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--gradient-bg)" }}>
        <h3 style={{ color: "var(--secondary)" }}>Loading Dashboard...</h3>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}