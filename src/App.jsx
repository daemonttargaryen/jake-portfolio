import { useState, useEffect, useRef, useCallback } from "react";
import { ExternalLink, Code2, Globe, Smartphone, ChevronDown, Send, MapPin, CheckCircle, AlertCircle, Menu, X, Zap, Shield, Clock, Star } from "lucide-react";

const ACCENT = "#3B82F6";
const ACCENT_DIM = "#1D4ED8";

const NAV_LINKS = ["about", "services", "work", "contact"];

const SERVICES = [
  { icon: Globe, title: "Business websites", desc: "Clean, fast, professional sites for local businesses. Home, about, services, contact; everything you need to get found online.", price: "From €500" },
  { icon: Smartphone, title: "Mobile-ready design", desc: "Every site works flawlessly on phones and tablets. Over 60% of your customers will visit on mobile; it has to be perfect.", price: "Included" },
  { icon: Zap, title: "Fast turnaround", desc: "Most sites are live within 7 days. No waiting weeks for an agency to get back to you. Fast, direct, efficient.", price: "~7 days" },
  { icon: Shield, title: "Monthly maintenance", desc: "Ongoing support, updates, and fixes handled for you every month. Your site stays fresh without you lifting a finger.", price: "From €40/mo" },
  { icon: Code2, title: "SEO basics", desc: "Built with search engines in mind from day one. Proper titles, descriptions, and fast loading, so Google can actually find you.", price: "Included" },
  { icon: Clock, title: "Hosting & domain setup", desc: "I handle all the technical setup so you don't have to. Your domain, your hosting; registered in your name, always.", price: "Your cost only" },
];

const PROJECTS = [
  { title: "Forn", category: "Web", tag: "Restaurant", desc: "Full website for an Mdina restaurant. About Us, Menu, Reservations, and Contact Us on one page. ", tech: ["React", "Tailwind", "Firebase"] },
  { title: "Forme Salon", category: "Web", tag: "Salon", desc: "Booking-enabled site for a Sliema beauty salon. Online appointments, services, and photo gallery.", tech: ["Next.js", "Vercel", "Calendly"] },
  { title: "Casa Bajda", category: "Web", tag: "Hospitality", desc: "Accommodation site with room listings, availability info, and direct booking enquiry form.", tech: ["React", "Firebase", "Maps API"] },
];

const WHY = [
  { icon: MapPin, label: "Malta-based", text: "I'm local. We can speak the same language, communicate in the same timezone, and I understand the Maltese culture." },
  { icon: Star, label: "Student rates", text: "No agency overheads. You're paying for the work itself, with no fluff." },
  { icon: Shield, label: "You own everything", text: "Your domain and website are registered entirely in your name. You will never be locked out." },
  { icon: Zap, label: "One person, full accountability", text: "You deal with me directly from the first message to the last. No handoffs or middlemen." },
];

const FILTERS = ["All", "Web", "Mobile", "Design"];

const SOCIAL_LINKS = [
  { href: "mailto:jake@email.com", label: "Email", text: "✉" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", business: "", message: "" });
  const [formState, setFormState] = useState({ errors: {}, submitted: false, submitting: false });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heroVisible, setHeroVisible] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleCtaMove = useCallback((e) => {
    if (!ctaBtnRef.current) return;
    const rect = ctaBtnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    setCtaOffset({ x: dx, y: dy });
  }, []);

  const handleCtaLeave = useCallback(() => {
    setCtaOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.opacity})`;
        ctx.fill();
      });
      particlesRef.current.forEach((a, i) => {
        particlesRef.current.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) { setFormState({ ...formState, errors }); return; }
    setFormState({ ...formState, submitting: true, errors: {} });
    setTimeout(() => setFormState({ errors: {}, submitted: true, submitting: false }), 1500);
  };

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div style={{ background: "#09090b", color: "#fafafa", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #09090b; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 2px; }
        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .project-card { transition: transform 0.3s ease, border-color 0.3s ease; }
        .project-card:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.5) !important; }
        .project-overlay { opacity: 0; transition: opacity 0.25s ease; }
        .project-card:hover .project-overlay { opacity: 1; }
        .service-card { transition: border-color 0.25s ease, background 0.25s ease; }
        .service-card:hover { border-color: rgba(59,130,246,0.4) !important; background: rgba(59,130,246,0.04) !important; }
        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: #3B82F6 !important; }
        .filter-btn { transition: all 0.2s ease; }
        .shake { animation: shake 0.35s ease; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        .why-card { transition: border-color 0.25s, background 0.25s; }
        .why-card:hover { border-color: rgba(59,130,246,0.35) !important; background: rgba(59,130,246,0.04) !important; }
        input, textarea { outline: none; transition: border-color 0.2s ease; }
        input:focus, textarea:focus { border-color: #3B82F6 !important; }
        .cta-magnetic { transition: transform 0.18s ease; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .hero-line-1 { animation: fadeInUp 0.8s ease 0.1s both; }
        .hero-line-2 { animation: fadeInUp 0.8s ease 0.3s both; }
        .hero-line-3 { animation: fadeInUp 0.8s ease 0.5s both; }
        .hero-line-4 { animation: fadeInUp 0.8s ease 0.7s both; }
        .hero-line-5 { animation: fadeInUp 0.8s ease 0.9s both; }
        .dot-pulse { animation: dotPulse 2s ease-in-out infinite; }
        @keyframes dotPulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
      `}</style>

      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(9,9,11,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease"
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "15px", color: "#fafafa", letterSpacing: "-0.02em" }}>
          jake<span style={{ color: ACCENT }}>.</span>dev
        </span>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <button key={link} className="nav-link" onClick={() => scrollTo(link)}
              style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.01em" }}>
              {link}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            background: ACCENT, color: "#fff", border: "none", padding: "8px 18px",
            borderRadius: "6px", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", fontWeight: 500
          }}>
            Hire me
          </button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: "#fafafa", cursor: "pointer" }} className="mobile-menu-btn" aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: "60px", left: 0, right: 0, background: "#09090b", borderBottom: "1px solid rgba(255,255,255,0.08)", zIndex: 99, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "16px", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
              {link}
            </button>
          ))}
        </div>
      )}

      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "720px", marginTop: "4rem" }}>
          <div className="hero-line-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "100px", padding: "5px 14px", marginBottom: "2rem" }}>
            <span className="dot-pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3B82F6", display: "inline-block" }} />
            <span style={{ fontSize: "13px", color: "#93C5FD", fontFamily: "'DM Mono', monospace" }}>Available for projects in Malta</span>
          </div>
          <h1 className="hero-line-2" style={{ fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            I build websites<br />
            <span style={{ color: "#3f3f46" }}>for local</span>{" "}
            <span style={{ color: ACCENT }}>businesses.</span>
          </h1>
          <p className="hero-line-3" style={{ fontSize: "18px", color: "#71717a", lineHeight: 1.7, maxWidth: "480px", marginBottom: "2.5rem", fontWeight: 300 }}>
            Fast, professional, and affordable. If your business' website needs updating or does not exist altogether, I can help.
          </p>
          <div className="hero-line-4" style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
            <button
              ref={ctaBtnRef}
              className="cta-magnetic"
              onMouseMove={handleCtaMove}
              onMouseLeave={handleCtaLeave}
              onClick={() => scrollTo("contact")}
              style={{
                background: ACCENT, color: "#fff", border: "none",
                padding: "14px 28px", borderRadius: "8px", fontSize: "15px",
                cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
                transform: `translate(${ctaOffset.x}px, ${ctaOffset.y}px)`,
              }}>
              Get a free quote
            </button>
            <button onClick={() => scrollTo("work")} style={{
              background: "transparent", color: "#a1a1aa",
              border: "1px solid rgba(255,255,255,0.1)", padding: "14px 28px",
              borderRadius: "8px", fontSize: "15px", cursor: "pointer", fontFamily: "inherit"
            }}>
              See my work
            </button>
          </div>
          <div className="hero-line-5" style={{ display: "flex", gap: "20px", marginTop: "3rem" }}>
            {SOCIAL_LINKS.map(({ href, label, text }) => (
              <a key={label} href={href} aria-label={label}
                style={{ color: "#52525b", transition: "color 0.2s", fontSize: "13px", fontFamily: "'DM Mono', monospace", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.color = "#3B82F6"}
                onMouseLeave={e => e.currentTarget.style.color = "#52525b"}>
                {text}
              </a>
            ))}
          </div>
        </div>
        <button onClick={() => scrollTo("about")} style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", background: "none", border: "none", color: "#3f3f46", cursor: "pointer", animation: "fadeInUp 1s ease 1.2s both" }}>
          <ChevronDown size={22} style={{ animation: "dotPulse 2s ease-in-out infinite" }} />
        </button>
      </section>

      <section id="about" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel text="about" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Hi, I'm Jake.
            </h2>
            <p style={{ color: "#71717a", lineHeight: 1.8, marginBottom: "1rem", fontWeight: 300 }}>
              I'm a 22-year-old IT student studying my Bachelor's in Software Development. I build professional websites for local businesses, prioritising affordability, speed, and with no technical jargon.
            </p>
            <p style={{ color: "#71717a", lineHeight: 1.8, fontWeight: 300 }}>
              If you run a business that requires an online presence, my websites will help you get one, without breaking the bank or getting lost in the technical details. I handle everything from design to deployment, so you can focus on what you do best; running your business.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "2rem", flexWrap: "wrap" }}>
              {["React", "Next.js", "Tailwind CSS", "Firebase", "Vercel", "Figma"].map(tech => (
                <span key={tech} style={{
                  background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
                  color: "#93C5FD", padding: "5px 12px", borderRadius: "4px", fontSize: "13px",
                  fontFamily: "'DM Mono', monospace", transition: "all 0.2s ease", cursor: "default"
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.18)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,0.08)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)"; }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {WHY.map(({ icon: Icon, label, text }) => (
              <div key={label} className="why-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.25rem" }}>
                <Icon size={18} style={{ color: ACCENT, marginBottom: "10px" }} />
                <p style={{ fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "#fafafa" }}>{label}</p>
                <p style={{ fontSize: "12px", color: "#71717a", lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel text="services" />
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>What I offer</h2>
          <p style={{ color: "#71717a", marginBottom: "3rem", fontWeight: 300 }}>Everything a local business needs to get online and start winning customers.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            {SERVICES.map(({ icon: Icon, title, desc, price }) => (
              <div key={title} className="service-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div style={{ background: "rgba(59,130,246,0.1)", borderRadius: "8px", padding: "8px", display: "inline-flex" }}>
                    <Icon size={18} style={{ color: ACCENT }} />
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#3B82F6" }}>{price}</span>
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 500, marginBottom: "8px", color: "#fafafa" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: "#71717a", lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel text="work" />
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: "2rem" }}>Recent projects</h2>
        <div style={{ display: "flex", gap: "8px", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button key={f} className="filter-btn" onClick={() => setFilter(f)} style={{
              background: filter === f ? ACCENT : "rgba(255,255,255,0.04)",
              color: filter === f ? "#fff" : "#71717a",
              border: `1px solid ${filter === f ? ACCENT : "rgba(255,255,255,0.08)"}`,
              padding: "7px 16px", borderRadius: "6px", fontSize: "13px",
              cursor: "pointer", fontFamily: "inherit", fontWeight: filter === f ? 500 : 400
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {filtered.map((p, i) => (
            <div key={p.title} className="project-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden", cursor: "pointer", position: "relative" }}
              onClick={() => setExpandedProject(expandedProject === i ? null : i)}>
              <div style={{ height: "140px", background: `rgba(59,130,246,${0.04 + i * 0.02})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Globe size={32} style={{ color: "rgba(59,130,246,0.3)" }} />
                <div className="project-overlay" style={{ position: "absolute", inset: 0, background: "rgba(9,9,11,0.85)", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                  <button style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.4)", color: "#93C5FD", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Code2 size={14} /> Code
                  </button>
                  <button style={{ background: ACCENT, border: "none", color: "#fff", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ExternalLink size={14} /> Live
                  </button>
                </div>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 500 }}>{p.title}</h3>
                  <span style={{ background: "rgba(59,130,246,0.1)", color: "#93C5FD", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontFamily: "'DM Mono', monospace" }}>{p.tag}</span>
                </div>
                <p style={{ fontSize: "13px", color: "#71717a", lineHeight: 1.6, marginBottom: "12px", fontWeight: 300 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: "11px", color: "#52525b", fontFamily: "'DM Mono', monospace", background: "rgba(255,255,255,0.04)", padding: "2px 8px", borderRadius: "3px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <SectionLabel text="contact" />
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>Let's talk</h2>
          <p style={{ color: "#71717a", marginBottom: "2.5rem", fontWeight: 300 }}>Tell me about your business and what you need. I'll get back to you within 24 hours, with no commitment required.</p>

          {formState.submitted ? (
            <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "12px", padding: "2rem", textAlign: "center" }}>
              <CheckCircle size={32} style={{ color: "#10B981", margin: "0 auto 1rem" }} />
              <p style={{ fontWeight: 500, marginBottom: "6px" }}>Message sent!</p>
              <p style={{ fontSize: "14px", color: "#71717a" }}>I'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { id: "name", label: "Your name", type: "text", placeholder: "Maria Borg" },
                { id: "email", label: "Email address", type: "email", placeholder: "maria@example.com" },
                { id: "business", label: "Business name (optional)", type: "text", placeholder: "Bella Vista Restaurant" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label style={{ fontSize: "13px", color: "#a1a1aa", display: "block", marginBottom: "6px" }}>{label}</label>
                  <input
                    type={type} placeholder={placeholder}
                    value={formData[id]}
                    onChange={e => { setFormData({ ...formData, [id]: e.target.value }); setFormState(s => ({ ...s, errors: { ...s.errors, [id]: "" } })); }}
                    className={formState.errors[id] ? "shake" : ""}
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${formState.errors[id] ? "#EF4444" : formData[id] && id === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[id]) ? "#10B981" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: "8px", padding: "11px 14px", color: "#fafafa", fontSize: "14px", fontFamily: "inherit"
                    }} />
                  {formState.errors[id] && <p style={{ fontSize: "12px", color: "#EF4444", marginTop: "5px", display: "flex", alignItems: "center", gap: "4px" }}><AlertCircle size={12} />{formState.errors[id]}</p>}
                </div>
              ))}
              <div>
                <label style={{ fontSize: "13px", color: "#a1a1aa", display: "block", marginBottom: "6px" }}>Message</label>
                <textarea
                  rows={4} placeholder="Tell me about your business and what you're looking for..."
                  value={formData.message}
                  onChange={e => { setFormData({ ...formData, message: e.target.value }); setFormState(s => ({ ...s, errors: { ...s.errors, message: "" } })); }}
                  className={formState.errors.message ? "shake" : ""}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.03)", resize: "vertical",
                    border: `1px solid ${formState.errors.message ? "#EF4444" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "8px", padding: "11px 14px", color: "#fafafa", fontSize: "14px", fontFamily: "inherit"
                  }} />
                {formState.errors.message && <p style={{ fontSize: "12px", color: "#EF4444", marginTop: "5px", display: "flex", alignItems: "center", gap: "4px" }}><AlertCircle size={12} />{formState.errors.message}</p>}
              </div>
              <button type="submit" disabled={formState.submitting} style={{
                background: ACCENT, color: "#fff", border: "none",
                padding: "13px", borderRadius: "8px", fontSize: "15px",
                cursor: formState.submitting ? "wait" : "pointer", fontFamily: "inherit", fontWeight: 500,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                opacity: formState.submitting ? 0.7 : 1, transition: "opacity 0.2s"
              }}>
                <Send size={16} />
                {formState.submitting ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "13px", color: "#3f3f46", fontFamily: "'DM Mono', monospace" }}>
          © 2026 Jake · Malta · Built with React
        </p>
      </footer>
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: ACCENT, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
      — {text}
    </p>
  );
}