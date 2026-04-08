"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, UserPlus, CheckCircle, ArrowRight } from "lucide-react";

const DEGREES = [
  "B.Tech - Computer Science Engineering",
  "B.Tech - Information Technology",
  "B.Tech - Electronics & Communication",
  "B.Tech - Electrical Engineering",
  "B.Tech - Mechanical Engineering",
  "B.Tech - Civil Engineering",
  "B.Tech - Data Science & AI",
  "B.E. - Computer Science",
  "B.E. - Electronics",
  "B.Sc - Computer Science",
  "B.Sc - Information Technology",
  "B.Sc - Mathematics",
  "B.Sc - Data Science",
  "BCA - Computer Applications",
  "MCA - Computer Applications",
  "M.Tech - Computer Science",
  "M.Tech - Software Engineering",
  "M.Tech - Data Science",
  "MBA - Business Administration",
  "M.Sc - Computer Science",
  "M.Sc - Mathematics",
  "B.Com - Commerce",
  "BBA - Business Administration",
  "B.Sc - Physics",
  "Diploma - Computer Engineering",
];

const LOCATIONS: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool", "Rajahmundry", "Kakinada"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar", "Rohtak", "Sonipat"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi", "Kalaburagi", "Shivamogga"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Thane", "Navi Mumbai"],
  "Manipur": ["Imphal", "Thoubal", "Churachandpur"],
  "Meghalaya": ["Shillong", "Tura"],
  "Mizoram": ["Aizawl", "Lunglei"],
  "Nagaland": ["Kohima", "Dimapur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
  "Punjab": ["Ludhiana", "Amritsar", "Chandigarh", "Jalandhar", "Patiala", "Bathinda"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar"],
  "Sikkim": ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Tirunelveli", "Vellore", "Erode"],
  "Telangana": ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam", "Secunderabad"],
  "Tripura": ["Agartala", "Udaipur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Noida", "Ghaziabad", "Meerut", "Bareilly"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Roorkee", "Haldwani"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol", "Kharagpur"],
  "Delhi": ["New Delhi", "Dwarka", "Rohini", "Laxmi Nagar", "Saket", "Janakpuri"],
  "Chandigarh": ["Chandigarh"],
  "Puducherry": ["Puducherry", "Karaikal"],
  "Jammu & Kashmir": ["Srinagar", "Jammu", "Anantnag"],
  "Ladakh": ["Leh", "Kargil"],
  "Andaman & Nicobar": ["Port Blair"],
};

export default function RegisterPage() {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    name: "", degree: "", phone: "", email: "",
    state: "", city: "", password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const availableCities = formData.state ? LOCATIONS[formData.state] || [] : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, ...(name === "state" ? { city: "" } : {}) }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (formData.password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      localStorage.setItem("userId", data.userId);
      setDone(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--gradient-bg)" }}>
        <div className="auth-card animate-fade-scale" style={{ textAlign: "center", maxWidth: 420, padding: "48px 40px" }}>
          <div style={{ animation: "float 2s ease-in-out infinite", fontSize: "4rem", marginBottom: 20 }}>🎉</div>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(0,168,150,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <CheckCircle size={36} color="var(--primary)" />
          </div>
          <h2 style={{ marginBottom: 8, fontSize: "1.6rem", fontWeight: 800 }}>Registration Complete!</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>Redirecting you to the dashboard...</p>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "var(--gradient-card)", margin: "20px auto 0", animation: "shimmer 1.5s infinite" }} />
        </div>
        <style>{`@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`}</style>
      </div>
    );
  }

  return (
    <div className="auth-page">
      {/* Left Brand Panel */}
      <div className="auth-brand">
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "white", maxWidth: 340 }}>
          <div style={{ margin: "0 auto 24px", display: "flex", justifyContent: "center" }}>
            <Image src="/logo.png" alt="Vinsup Skill Academy" width={200} height={80} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} priority />
          </div>
          <h1 style={{ color: "white", fontSize: "2.2rem", marginBottom: "12px", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Join PrepZone
          </h1>
          <p style={{ fontSize: "0.95rem", opacity: 0.85, marginBottom: "40px", lineHeight: 1.7, fontWeight: 400 }}>
            Register once, access the most comprehensive aptitude portal for placement prep in India.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", textAlign: "left" }}>
            {[
              { num: "1", label: "Fill your details", active: true },
              { num: "2", label: "Create your account", active: false },
              { num: "3", label: "Start your test journey!", active: false },
            ].map((s, i) => (
              <div key={i} className="animate-fade-up" style={{ display: "flex", alignItems: "center", gap: "14px", animationDelay: `${0.2 + i * 0.1}s` }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "12px",
                  background: s.active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: "0.88rem", color: "white", flexShrink: 0,
                  border: `1px solid ${s.active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'}`
                }}>
                  {s.num}
                </div>
                <span style={{ opacity: s.active ? 1 : 0.7, fontWeight: s.active ? 600 : 400, fontSize: "0.92rem" }}>{s.label}</span>
                {s.active && <ArrowRight size={14} style={{ marginLeft: "auto", opacity: 0.6 }} />}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px", display: "flex", justifyContent: "center", gap: "24px", opacity: 0.45, fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <span>🔒 Encrypted</span>
            <span>🎓 Free Test</span>
            <span>📊 AI Insights</span>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-side">
        <div className="auth-card animate-fade-up" style={{ maxWidth: 520 }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ margin: "0 auto 16px", display: "flex", justifyContent: "center" }}>
              <Image src="/logo.png" alt="Vinsup Skill Academy" width={160} height={64} style={{ objectFit: "contain" }} priority />
            </div>
            <h2 style={{ fontSize: "1.7rem", marginBottom: "6px" }}>Create Account</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Fill in your details to get started</p>
          </div>

          {error && (
            <div style={{
              background: "rgba(240,93,94,0.09)", color: "var(--accent-dark)",
              padding: "12px 15px", borderRadius: "var(--radius-md)",
              marginBottom: "20px", border: "1.5px solid rgba(240,93,94,0.3)",
              fontSize: "0.9rem"
            }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input required type="text" name="name" className="form-input" placeholder="Arjun Sharma" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Degree / Qualification</label>
              <select required name="degree" className="form-input" value={formData.degree} onChange={handleChange}>
                <option value="" disabled>Select your degree</option>
                {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input required type="tel" name="phone" className="form-input" placeholder="9876543210" value={formData.phone} onChange={handleChange} pattern="[0-9]{10}" title="Enter 10-digit mobile number" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input required type="email" name="email" className="form-input" placeholder="arjun@example.com" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">State</label>
                <select required name="state" className="form-input" value={formData.state} onChange={handleChange}>
                  <option value="" disabled>Select State</option>
                  {Object.keys(LOCATIONS).sort().map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <select required name="city" className="form-input" value={formData.city} onChange={handleChange} disabled={!formData.state}>
                  <option value="" disabled>Select City</option>
                  {availableCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-input"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ paddingRight: "44px" }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    required
                    type={showConfirm ? "text" : "password"}
                    className="form-input"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ paddingRight: "44px" }}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "8px" }} disabled={loading}>
              {loading ? (
                <>
                  <span style={{ display: "inline-block", width: 18, height: 18, border: "2.5px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginRight: 10 }} />
                  Creating Account...
                </>
              ) : (
                <><UserPlus size={18} style={{ marginRight: 8 }} /> Create Account</>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Already have an account? <a href="/login" style={{ fontWeight: 600 }}>Sign In</a>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
