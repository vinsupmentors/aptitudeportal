"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AlertTriangle, Clock, ChevronLeft, ChevronRight, BookmarkPlus, Send, ShieldCheck } from "lucide-react";

const QUESTIONS = [
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `apt_${i + 1}`,
    type: "Aptitude" as const,
    text: `Aptitude Question ${i + 1}: If train A travels at 60km/hr and train B travels at 90km/hr in opposite directions, and they are 300km apart, how long before they meet?`,
    options: ["2 hours", "2.5 hours", "3 hours", "1.5 hours"],
    correctAnswer: "2 hours"
  })),
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `ver_${i + 1}`,
    type: "Verbal" as const,
    text: `Verbal Question ${i + 1}: What is the closest synonym for the word 'ubiquitous'?`,
    options: ["Rare", "Everywhere", "Hidden", "Loud"],
    correctAnswer: "Everywhere"
  }))
];

const EXAM_RULES = [
  "Do not switch or minimise browser tabs — you will be auto-submitted after 3 violations.",
  "This exam can only be taken once. Your attempt is final.",
  "Each question carries equal marks. There is no negative marking.",
  "You may navigate freely between questions using the palette or Prev/Next buttons.",
  "The timer starts the moment you click 'Start Exam'. Manage your time wisely.",
  "Ensure a stable internet connection before starting.",
];

export default function ExamPage() {
  const router = useRouter();

  // Pre-exam state
  const [examStarted, setExamStarted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Exam state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [warningText, setWarningText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const tabSwitchCount = useRef(0);
  const userId = useRef<string | null>(null);

  const submitExam = useCallback(async (forced = false) => {
    if (submitting) return;
    setSubmitting(true);
    setShowConfirmSubmit(false);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId.current,
          answers,
          forcedSubmission: forced,
          questionsSent: QUESTIONS,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      router.push("/results");
    } catch (err) {
      console.error(err);
      alert("Error submitting exam. Please check your connection.");
      setSubmitting(false);
    }
  }, [answers, router, submitting]);

  useEffect(() => {
    userId.current = localStorage.getItem("userId");
    if (!userId.current) router.push("/login");
  }, [router]);

  useEffect(() => {
    if (!examStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); submitExam(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, submitExam]);

  useEffect(() => {
    if (!examStarted) return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchCount.current += 1;
        setWarningText(`Warning! Tab switched ${tabSwitchCount.current} time(s). Auto-submit triggers after 3 violations.`);
        if (tabSwitchCount.current >= 3) submitExam(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [examStarted, submitExam]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const answeredCount = Object.keys(answers).length;
  const currentQ = QUESTIONS[currentIndex];

  // Question status: "answered" | "marked" | "current" | "visited" | "unvisited"
  const getStatus = (idx: number) => {
    const q = QUESTIONS[idx];
    if (idx === currentIndex) return "current";
    if (answers[q.id]) return "marked" in q && marked.has(q.id) ? "marked" : "answered";
    if (marked.has(q.id)) return "marked";
    return "unvisited";
  };

  const statusStyle = (idx: number) => {
    const s = getStatus(idx);
    const base: React.CSSProperties = {
      width: 36, height: 36, borderRadius: "8px",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
      border: "2px solid transparent", transition: "all 0.15s ease",
    };
    if (s === "current") return { ...base, background: "#028090", color: "white", border: "2px solid #028090", boxShadow: "0 0 0 3px rgba(2,128,144,0.25)" };
    if (s === "answered") return { ...base, background: "#00A896", color: "white" };
    if (s === "marked") return { ...base, background: "#F7A500", color: "white" };
    return { ...base, background: "var(--surface-2)", color: "var(--text-muted)", border: "2px solid var(--border)" };
  };

  // ── PRE-EXAM SCREEN ──────────────────────────────────────────────────────────
  if (!examStarted) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--gradient-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ maxWidth: 720, width: "100%", background: "var(--surface)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)", overflow: "hidden" }} className="animate-fade-up">
          {/* Header strip */}
          <div style={{ background: "var(--gradient-primary)", padding: "28px 40px", color: "white" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <ShieldCheck size={28} />
                <h2 style={{ color: "white", margin: 0, fontSize: "1.5rem", fontWeight: 800 }}>Basic Aptitude Test</h2>
              </div>
              <Image src="/logo.png" alt="Vinsup Skill Academy" width={140} height={50} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} priority />
            </div>
            <p style={{ opacity: 0.85, margin: 0, fontSize: "0.92rem" }}>Read all instructions carefully before starting the exam.</p>
          </div>

          <div style={{ padding: "32px 40px" }}>
            {/* Exam stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
              {[
                { label: "Total Questions", value: "50", sub: "25 Aptitude + 25 Verbal" },
                { label: "Time Limit", value: "60 Mins", sub: "Timer starts on click" },
                { label: "Marking Scheme", value: "+1 / 0", sub: "No negative marking" },
              ].map((stat, i) => (
                <div key={i} style={{ background: "rgba(0,168,150,0.07)", border: "1px solid rgba(0,168,150,0.2)", borderRadius: "var(--radius-md)", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-dark)" }}>{stat.value}</div>
                  <div style={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--secondary)", marginBottom: "2px" }}>{stat.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Rules */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <AlertTriangle size={18} color="var(--accent)" /> Exam Rules
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {EXAM_RULES.map((rule, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(240,93,94,0.12)", color: "var(--accent-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>
                      {i + 1}
                    </div>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-main)", lineHeight: 1.6 }}>{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Question palette legend */}
            <div style={{ background: "var(--surface-2)", borderRadius: "var(--radius-md)", padding: "16px", marginBottom: "24px", border: "1px solid var(--border)" }}>
              <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>Question Palette Legend</p>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {[
                  { color: "var(--surface-2)", border: "2px solid var(--border)", label: "Not Attempted" },
                  { color: "#00A896", border: "none", label: "Answered" },
                  { color: "#F7A500", border: "none", label: "Marked for Review" },
                  { color: "#028090", border: "2px solid #028090", label: "Current Question" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "6px", background: item.color, border: item.border, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms checkbox */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", marginBottom: "24px" }}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                style={{ width: 18, height: 18, marginTop: "2px", accentColor: "var(--primary)", cursor: "pointer", flexShrink: 0 }}
              />
              <span style={{ fontSize: "0.9rem", color: "var(--text-main)", lineHeight: 1.6 }}>
                I have read and understood all the exam rules. I agree to take this test honestly and fairly.
                I understand that <strong>switching tabs 3 times will auto-submit my exam</strong>, and this is a <strong>one-time attempt</strong>.
              </span>
            </label>

            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%", fontSize: "1.05rem", opacity: termsAccepted ? 1 : 0.5 }}
              disabled={!termsAccepted}
              onClick={() => setExamStarted(true)}
            >
              <ShieldCheck size={20} style={{ marginRight: 10 }} />
              Start Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── EXAM SCREEN ──────────────────────────────────────────────────────────────
  return (
    <div style={{ background: "#f0f4f8", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Sticky Header */}
      <header className="mock-header" style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "var(--surface)", boxShadow: "var(--shadow-md)",
        padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid var(--border)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Image src="/logo.png" alt="Vinsup Skill Academy" width={110} height={40} style={{ objectFit: "contain" }} />
          <div style={{ width: 1, height: 28, background: "var(--border)" }} />
          <div>
            <h2 style={{ margin: 0, fontSize: "1.1rem", color: "var(--primary-dark)" }}>Basic Aptitude Test</h2>
            <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>
              {answeredCount} of {QUESTIONS.length} answered
              {marked.size > 0 && ` · ${marked.size} marked for review`}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ flex: 1, maxWidth: 300, margin: "0 24px" }}>
          <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(answeredCount / QUESTIONS.length) * 100}%`, background: "var(--primary)", borderRadius: 3, transition: "width 0.3s ease" }} />
          </div>
          <p style={{ margin: "4px 0 0", fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center" }}>
            {Math.round((answeredCount / QUESTIONS.length) * 100)}% complete
          </p>
        </div>

        <div className="mock-header-actions" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 16px", borderRadius: "var(--radius-md)",
            background: timeLeft < 300 ? "rgba(240,93,94,0.1)" : "rgba(0,168,150,0.08)",
            border: `1px solid ${timeLeft < 300 ? "rgba(240,93,94,0.3)" : "rgba(0,168,150,0.2)"}`,
            fontWeight: 700, fontSize: "1.1rem",
            color: timeLeft < 300 ? "var(--error)" : "var(--primary-dark)"
          }}>
            <Clock size={18} />
            {formatTime(timeLeft)}
          </div>
          <button
            className="btn btn-accent"
            onClick={() => setShowConfirmSubmit(true)}
            disabled={submitting}
            style={{ gap: "8px" }}
          >
            <Send size={16} />
            {submitting ? "Submitting..." : "Submit Exam"}
          </button>
        </div>
      </header>

      {warningText && (
        <div style={{ background: "rgba(240,93,94,0.1)", color: "var(--error)", padding: "10px 24px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(240,93,94,0.2)", fontSize: "0.88rem" }}>
          <AlertTriangle size={16} />
          {warningText}
        </div>
      )}

      <div className="exam-layout" style={{ display: "flex", flex: 1, gap: 0 }}>
        {/* ── LEFT: Question Palette ── */}
        <aside className="exam-palette" style={{
          width: 220, background: "var(--surface)", borderRight: "1px solid var(--border)",
          padding: "20px 16px", overflowY: "auto", flexShrink: 0, position: "sticky", top: 72, alignSelf: "flex-start", maxHeight: "calc(100vh - 72px)"
        }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>Aptitude (1–25)</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px", marginBottom: "20px" }}>
            {QUESTIONS.slice(0, 25).map((_, idx) => (
              <button key={idx} style={statusStyle(idx)} onClick={() => setCurrentIndex(idx)}>
                {idx + 1}
              </button>
            ))}
          </div>

          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>Verbal (26–50)</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px", marginBottom: "20px" }}>
            {QUESTIONS.slice(25).map((_, i) => {
              const idx = i + 25;
              return (
                <button key={idx} style={statusStyle(idx)} onClick={() => setCurrentIndex(idx)}>
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { bg: "#00A896", label: "Answered" },
              { bg: "#F7A500", label: "Marked" },
              { bg: "var(--surface-2)", label: "Not Attempted", border: "var(--border)" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: 14, height: 14, borderRadius: "4px", background: item.bg, border: item.border ? `1px solid ${item.border}` : "none", flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Summary counts */}
          <div style={{ borderTop: "1px solid var(--border)", marginTop: "16px", paddingTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Answered</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary)" }}>{answeredCount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Not Attempted</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>{QUESTIONS.length - answeredCount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Marked</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#c87400" }}>{marked.size}</span>
            </div>
          </div>
        </aside>

        {/* ── MAIN: Question Area ── */}
        <main className="exam-main" style={{ flex: 1, padding: "28px 32px", display: "flex", flexDirection: "column" }}>
          <div className="card" style={{ flex: 1 }}>
            {/* Question header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{
                  padding: "4px 12px", borderRadius: "var(--radius-full)",
                  background: currentQ.type === "Aptitude" ? "rgba(2,128,144,0.1)" : "rgba(5,102,141,0.1)",
                  color: currentQ.type === "Aptitude" ? "var(--primary-dark)" : "var(--secondary)",
                  fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em"
                }}>
                  {currentQ.type}
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Question {currentIndex + 1} of {QUESTIONS.length}</span>
              </div>
              <button
                onClick={() => setMarked(prev => {
                  const next = new Set(prev);
                  next.has(currentQ.id) ? next.delete(currentQ.id) : next.add(currentQ.id);
                  return next;
                })}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "6px 14px", borderRadius: "var(--radius-md)",
                  border: `1.5px solid ${marked.has(currentQ.id) ? "#F7A500" : "var(--border)"}`,
                  background: marked.has(currentQ.id) ? "rgba(247,165,0,0.1)" : "transparent",
                  color: marked.has(currentQ.id) ? "#c87400" : "var(--text-muted)",
                  cursor: "pointer", fontSize: "0.82rem", fontWeight: 600
                }}
              >
                <BookmarkPlus size={15} />
                {marked.has(currentQ.id) ? "Marked" : "Mark for Review"}
              </button>
            </div>

            {/* Question text */}
            <p style={{ fontSize: "1.05rem", fontWeight: 500, lineHeight: 1.7, marginBottom: "24px", color: "var(--text-main)" }}>
              {currentQ.text}
            </p>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {currentQ.options.map((opt, oi) => {
                const selected = answers[currentQ.id] === opt;
                return (
                  <label
                    key={opt}
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "14px 18px", borderRadius: "var(--radius-md)",
                      border: `2px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                      background: selected ? "rgba(0,168,150,0.07)" : "var(--surface-2)",
                      cursor: "pointer", transition: "var(--transition)",
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                      border: `2px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                      background: selected ? "var(--primary)" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.78rem", fontWeight: 700,
                      color: selected ? "white" : "var(--text-muted)"
                    }}>
                      {String.fromCharCode(65 + oi)}
                    </div>
                    <input type="radio" name={currentQ.id} value={opt} checked={selected} onChange={() => setAnswers(prev => ({ ...prev, [currentQ.id]: opt }))} style={{ display: "none" }} />
                    <span style={{ fontSize: "0.95rem", color: selected ? "var(--primary-dark)" : "var(--text-main)", fontWeight: selected ? 600 : 400 }}>{opt}</span>
                  </label>
                );
              })}
            </div>

            {/* Clear selection */}
            {answers[currentQ.id] && (
              <button
                onClick={() => setAnswers(prev => { const n = { ...prev }; delete n[currentQ.id]; return n; })}
                style={{ marginTop: "16px", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.82rem", textDecoration: "underline" }}
              >
                Clear selection
              </button>
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
            <button
              className="btn btn-outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(i => i - 1)}
              style={{ gap: "8px" }}
            >
              <ChevronLeft size={18} /> Previous
            </button>

            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {currentIndex + 1} / {QUESTIONS.length}
            </span>

            <button
              className="btn btn-primary"
              disabled={currentIndex === QUESTIONS.length - 1}
              onClick={() => setCurrentIndex(i => i + 1)}
              style={{ gap: "8px" }}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </main>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
        }}>
          <div style={{ background: "var(--surface)", borderRadius: "var(--radius-xl)", padding: "36px", maxWidth: 440, width: "100%", boxShadow: "var(--shadow-lg)" }}>
            <h3 style={{ marginBottom: "12px" }}>Submit Exam?</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "8px" }}>
              You have answered <strong style={{ color: "var(--primary-dark)" }}>{answeredCount}</strong> out of <strong>{QUESTIONS.length}</strong> questions.
            </p>
            {answeredCount < QUESTIONS.length && (
              <p style={{ color: "var(--accent-dark)", fontSize: "0.88rem", marginBottom: "20px" }}>
                ⚠ {QUESTIONS.length - answeredCount} question(s) are unanswered. You cannot change your answers after submitting.
              </p>
            )}
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowConfirmSubmit(false)}>
                Go Back
              </button>
              <button className="btn btn-accent" style={{ flex: 1 }} onClick={() => submitExam(false)} disabled={submitting}>
                {submitting ? "Submitting..." : "Confirm Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .card { background: var(--surface); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm); }
      `}</style>
    </div>
  );
}
