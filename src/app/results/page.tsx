"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, Home, Award, TrendingUp, AlertCircle, BarChart2, Clock, ShieldAlert, Target, Sparkles, ArrowUpRight, ChevronRight } from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }

    fetch(`/api/results?userId=${userId}`)
      .then(res => res.json())
      .then(result => {
        if (result.error) throw new Error(result.error);
        setData(result);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/login");
  };

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--gradient-bg)" }}>
      <div className="animate-fade-up" style={{ textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", border: "3px solid var(--border)", borderTopColor: "var(--primary)", animation: "spin 0.8s linear infinite", margin: "0 auto 20px" }} />
        <h3 style={{ color: "var(--secondary)", fontWeight: 700 }}>Analyzing Results...</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Crunching your performance data</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--gradient-bg)" }}>
      <div className="card animate-fade-up" style={{ textAlign: "center", maxWidth: 420, padding: "40px" }}>
        <AlertCircle size={48} color="var(--error)" style={{ margin: "0 auto 16px" }} />
        <h3 style={{ marginBottom: 8 }}>{error}</h3>
        <button className="btn btn-primary" onClick={() => router.push("/dashboard")}>Go to Dashboard</button>
      </div>
    </div>
  );

  const { score, rank, totalStudents, percentile } = data;
  const accuracy = Math.round((score.totalScore / 50) * 100);
  const aptAccuracy = Math.round((score.aptitudeScore / 25) * 100);
  const verAccuracy = Math.round((score.verbalScore / 25) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "var(--gradient-bg)" }}>
      {/* NavBar */}
      <nav className="navbar" style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Image src="/logo.png" alt="Vinsup Skill Academy" width={130} height={44} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} priority />
          <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.25)" }} />
          <div>
            <h1 style={{ color: "white", margin: 0, fontSize: "1.15rem", fontWeight: 800 }}>Performance Scorecard</h1>
            <p className="hide-mobile" style={{ color: "rgba(255,255,255,0.6)", margin: 0, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Detailed Analysis</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button className="btn btn-ghost btn-sm" onClick={() => router.push("/dashboard")}>
            <Home size={15} style={{ marginRight: 6 }} /> Dashboard
          </button>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            <LogOut size={15} style={{ marginRight: 6 }} /> Logout
          </button>
        </div>
      </nav>

      <main className="container" style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Hero Score Banner */}
        <div className="rank-card animate-fade-up" style={{ marginBottom: "32px", padding: "48px 32px" }}>
          <div style={{ position: "absolute", top: 20, right: 24, background: "rgba(255,255,255,0.12)", padding: "6px 14px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", zIndex: 1 }}>
            BASIC APTITUDE TEST
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <Award size={52} style={{ margin: "0 auto 16px", display: "block", opacity: 0.9 }} />
            <h2 style={{ color: "white", fontSize: "3.5rem", fontWeight: 900, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
              {score.totalScore}<span style={{ fontSize: "1.5rem", opacity: 0.6, fontWeight: 600 }}> / 50</span>
            </h2>
            <p style={{ fontSize: "1.1rem", opacity: 0.85, margin: "0 0 24px", fontWeight: 500 }}>
              Congratulations, {score.user?.name || "Student"}! 🎉
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
              {[
                { label: "Percentile", value: `${percentile}th`, icon: <ArrowUpRight size={14} /> },
                { label: "Accuracy", value: `${accuracy}%`, icon: <Target size={14} /> },
                { label: "Rank", value: `#${rank}`, icon: <TrendingUp size={14} /> },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center", opacity: 0.7, fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                    {item.icon} {item.label}
                  </div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Grid KPIs */}
        <div className="kpi-grid stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
          <div className="stat-card animate-fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px" }}>
            <div style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(0,168,150,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
              <TrendingUp size={26} color="var(--primary)" />
            </div>
            <h3 style={{ color: "var(--text-muted)", marginBottom: "8px", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Overall Rank</h3>
            <div className="kpi-value" style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--secondary)", lineHeight: 1 }}>
              #{rank} <span className="kpi-sub" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-muted)" }}>/ {totalStudents}</span>
            </div>
            <p style={{ marginTop: "10px", color: "var(--success)", fontWeight: 700, fontSize: "0.78rem", padding: "4px 12px", background: "rgba(0,168,150,0.08)", borderRadius: "var(--radius-full)" }}>Top {100 - percentile}% of candidates</p>
          </div>

          <div className="stat-card animate-fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px" }}>
            <div style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(255,179,71,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
              <Target size={26} color="var(--gold)" />
            </div>
            <h3 style={{ color: "var(--text-muted)", marginBottom: "8px", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Global Accuracy</h3>
            <div className="kpi-value" style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--gold-dark)", lineHeight: 1 }}>
              {accuracy}%
            </div>
            <p style={{ marginTop: "10px", color: "var(--text-muted)", fontSize: "0.82rem" }}>Based on 50 questions</p>
          </div>

          <div className="stat-card animate-fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px" }}>
            <div style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(240,93,94,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
              <Clock size={26} color="var(--accent-dark)" />
            </div>
            <h3 style={{ color: "var(--text-muted)", marginBottom: "8px", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Time Taken</h3>
            <div className="kpi-value" style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1 }}>
              {score.timeTaken ? `${Math.floor(score.timeTaken / 60)}m ${score.timeTaken % 60}s` : '50m 12s'}
            </div>
            <p style={{ marginTop: "10px", color: "var(--text-muted)", fontSize: "0.82rem" }}>Limit: 60 minutes</p>
          </div>

          <div className="stat-card animate-fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px" }}>
            <div style={{ width: 52, height: 52, borderRadius: "14px", background: score.tabSwitches > 0 ? "rgba(240,93,94,0.08)" : "rgba(0,168,150,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
              <ShieldAlert size={26} color={score.tabSwitches > 0 ? "var(--error)" : "var(--success)"} />
            </div>
            <h3 style={{ color: "var(--text-muted)", marginBottom: "8px", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Test Integrity</h3>
            <div className="kpi-value" style={{ fontSize: "2.2rem", fontWeight: 800, color: score.tabSwitches > 0 ? "var(--error)" : "var(--success)", lineHeight: 1 }}>
              {score.tabSwitches || 0}
            </div>
            <p style={{ marginTop: "10px", color: "var(--text-muted)", fontSize: "0.82rem" }}>Tab switch warnings</p>
          </div>
        </div>

        {/* Analysis Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {/* Subject Breakdown */}
          <div className="card animate-fade-up" style={{ padding: "32px" }}>
            <h3 style={{ marginBottom: "28px", display: "flex", alignItems: "center", fontSize: "1.1rem", fontWeight: 800, gap: "10px" }}>
              <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(0,168,150,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BarChart2 size={20} color="var(--primary)" />
              </div>
              Subject Analysis
            </h3>

            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--primary)" }} />
                  <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>Logical Aptitude</span>
                </div>
                <div>
                  <strong style={{ color: "var(--primary-dark)", fontSize: "1rem" }}>{score.aptitudeScore}</strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}> / 25</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: "8px" }}>({aptAccuracy}%)</span>
                </div>
              </div>
              <div style={{ height: "10px", width: "100%", background: "var(--surface-3)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${aptAccuracy}%`, background: "var(--gradient-card)", borderRadius: "var(--radius-full)", transition: "width 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--secondary)" }} />
                  <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>Verbal Ability</span>
                </div>
                <div>
                  <strong style={{ color: "var(--secondary)", fontSize: "1rem" }}>{score.verbalScore}</strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}> / 25</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: "8px" }}>({verAccuracy}%)</span>
                </div>
              </div>
              <div style={{ height: "10px", width: "100%", background: "var(--surface-3)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${verAccuracy}%`, background: "linear-gradient(90deg, var(--secondary), var(--secondary-dark))", borderRadius: "var(--radius-full)", transition: "width 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)" }} />
              </div>
            </div>

            {/* Quick comparison */}
            <div style={{ marginTop: "28px", padding: "16px", background: "var(--surface-2)", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Attempted</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--secondary)" }}>50 / 50</div>
              </div>
              <div style={{ width: "1px", background: "var(--border)" }} />
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Correct</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--success)" }}>{score.totalScore}</div>
              </div>
              <div style={{ width: "1px", background: "var(--border)" }} />
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Incorrect</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--error)" }}>{50 - score.totalScore}</div>
              </div>
            </div>
          </div>

          {/* AI Feedback */}
          <div className="card animate-fade-up" style={{ padding: "32px" }}>
            <h3 style={{ marginBottom: "28px", display: "flex", alignItems: "center", fontSize: "1.1rem", fontWeight: 800, gap: "10px" }}>
              <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(240,93,94,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={20} color="var(--accent)" />
              </div>
              AI Performance Insights
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ padding: "18px", background: "rgba(0,168,150,0.04)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--success)" }}>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--success)", marginBottom: "8px", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  <ChevronRight size={14} /> Top Strengths
                </strong>
                <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-main)", fontWeight: 500 }}>{score.strengths}</p>
              </div>

              <div style={{ padding: "18px", background: "rgba(240,93,94,0.04)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--error)" }}>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--error)", marginBottom: "8px", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  <ChevronRight size={14} /> Weaknesses
                </strong>
                <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-main)", fontWeight: 500 }}>{score.weaknesses}</p>
              </div>

              <div style={{ padding: "18px", background: "rgba(255,179,71,0.06)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--gold)" }}>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--gold-dark)", marginBottom: "8px", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  <ChevronRight size={14} /> Areas to Improve
                </strong>
                <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-main)", fontWeight: 500 }}>{score.areasToImprove}</p>
              </div>
            </div>

            {/* Action */}
            <button className="btn btn-primary" style={{ width: "100%", marginTop: "24px", gap: "8px" }} onClick={() => router.push("/dashboard")}>
              <Home size={16} /> Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
