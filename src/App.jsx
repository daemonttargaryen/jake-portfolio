import { useState, useEffect, useRef, useCallback } from "react";
import { ExternalLink, Code2, Globe, Smartphone, ChevronDown, Send, MapPin, CheckCircle, Menu, X, Zap, Shield, Clock, Star, Calculator, ChevronRight, MessageCircle, HelpCircle } from "lucide-react";
import { useForm, ValidationError } from '@formspree/react';

const ACCENT = "#3B82F6";

const NAV_LINKS = ["about", "services", "pricing", "work", "faq", "contact"];

const SERVICES = [
  { icon: Globe, title: "Business websites", desc: "Clean, fast, professional sites. Home, about, services, contact; everything you need to get found online.", price: "From €500" },
  { icon: Smartphone, title: "Mobile-ready design", desc: "Every site works flawlessly on phones and tablets. Over 60% of your customers will visit on mobile; it has to be perfect.", price: "Included" },
  { icon: Zap, title: "Fast turnaround", desc: "Most sites are live within 7 days. No waiting weeks for an agency to get back to you. Fast, direct, efficient.", price: "~7 days" },
  { icon: Shield, title: "Monthly maintenance", desc: "Ongoing support, updates, and fixes handled for you every month. Your site stays fresh without you lifting a finger.", price: "From €40/mo" },
  { icon: Code2, title: "SEO basics", desc: "Built with search engines in mind from day one. Proper titles, descriptions, and fast loading, so Google can actually find you.", price: "Included" },
  { icon: Clock, title: "Hosting & domain setup", desc: "I handle all the technical setup so you don't have to. Your domain, your hosting; registered in your name, always.", price: "Your cost only" },
];

const PROJECTS = [
  { title: "Forn", category: "Web", tag: "Restaurant", desc: "Full website for a restaurant. About Us, Menu, Reservations, and Contact Us on one page.", tech: ["HTML", "CSS", "Vercel"], liveUrl: "https://bella-vista-bay.vercel.app/", codeUrl: "https://github.com/daemonttargaryen/bella-vista" },
  { title: "Forme Studio", category: "Web", tag: "Salon", desc: "Booking-enabled site for a beauty salon. Online appointments, services, and photo gallery.", tech: ["HTML", "CSS", "Vercel"], liveUrl: "https://forme-studio-rho.vercel.app/", codeUrl: "https://github.com/daemonttargaryen/forme-studio" },
  { title: "Casa Bajda", category: "Web", tag: "Hospitality", desc: "Accommodation site with room listings, availability info, and direct booking enquiry form.", tech: ["HTML", "CSS", "Vercel"], liveUrl: "https://casa-bajda.vercel.app/", codeUrl: "https://github.com/daemonttargaryen/casa-bajda" },
];

const WHY = [
  { icon: MapPin, label: "Malta-based", text: "I'm local. We can speak the same language, communicate in the same timezone, and I understand the culture." },
  { icon: Star, label: "Student rates", text: "No agency overheads. You're paying for the work itself, with no fluff." },
  { icon: Shield, label: "You own everything", text: "Your domain and website are registered entirely in your name. You will never be locked out." },
  { icon: Zap, label: "One person, full accountability", text: "You deal with me directly from the first message to the last. No handoffs or middlemen." },
];

const FILTERS = ["All", "Web", "Mobile", "Design"];

 const SOCIAL_LINKS = [
  { href: "mailto:jakewebopsdesign@gmail.com", label: "Email", text: "✉" },
];

const TIERS = [
  {
    name: "Starter", price: "€500",
    desc: "Everything a small business needs to get online. Clean, fast, professional.",
    features: ["Single-page website", "Mobile-ready design", "Contact form", "Google Maps embed", "Hosted & live in 7 days"],
    note: null,
  },
  {
    name: "Standard", price: "€800",
    desc: "More content, more sections, more features. Ideal for salons, studios, and service businesses.",
    features: ["Multi-section site (3 pages)", "Booking / enquiry form", "Services & pricing page", "Testimonials section", "SEO basics included"],
    note: "Most popular",
  },
  {
    name: "Premium", price: "€1,200+",
    desc: "A full website with multiple pages, rich content, and everything a hospitality or retail business needs.",
    features: ["Full multi-page site (5+ pages)", "Room / product listings", "FAQ & location pages", "Advanced contact & booking", "Full SEO & analytics setup"],
    note: "Best value",
  },
];

const ADDONS = [
  {
    category: "Communication",
    items: [
      { name: "WhatsApp click-to-chat", desc: "A floating button that opens a WhatsApp conversation instantly.", price: "€40" },
      { name: "AI chatbot", desc: "Answers common questions automatically — hours, pricing, location.", price: "€250" },
      { name: "Newsletter signup", desc: "Mailchimp-connected signup form to build your mailing list.", price: "€80" },
    ],
  },
  {
    category: "Bookings & availability",
    items: [
      { name: "Appointment booking system", desc: "Online booking via Calendly or a custom form. Ideal for salons and clinics.", price: "€150" },
      { name: "Availability calendar", desc: "Live calendar showing available dates. Perfect for guesthouses and rentals.", price: "€200" },
    ],
  },
  {
    category: "Content",
    items: [
      { name: "Photo gallery", desc: "Lightbox gallery with smooth transitions. Upload your own photos anytime.", price: "€75" },
      { name: "Blog / news section", desc: "Post updates, news, or articles. Great for SEO and keeping your site fresh.", price: "€120" },
      { name: "Instagram feed embed", desc: "Your latest Instagram posts displayed automatically on your site.", price: "€60" },
      { name: "Online menu with PDF download", desc: "A styled digital menu with a download button. Restaurants and cafés.", price: "€80" },
    ],
  },
  {
    category: "Visibility & setup",
    items: [
      { name: "Google Maps integration", desc: "Interactive map with a Directions button linking straight to Google Maps.", price: "€50" },
      { name: "Google Analytics setup", desc: "See how many people visit your site, where they come from, and what they click.", price: "€50" },
      { name: "SEO optimisation", desc: "Meta titles, descriptions, image compression, sitemap — so Google finds you.", price: "€120" },
      { name: "Cookie consent banner", desc: "GDPR-compliant cookie notice. Legally required for all websites.", price: "€50" },
      { name: "Multi-language toggle", desc: "Switch between English and Maltese. Great for tourist-facing businesses.", price: "€150" },
      { name: "Advanced search", desc: "Autocomplete search with filters. For sites with large menus or catalogues.", price: "€200" },
    ],
  },
];

const PROCESS = [
  { step: "01", title: "You reach out", desc: "Fill in the contact form or send me a message. Tell me about your business and what you're looking for — no technical knowledge needed." },
  { step: "02", title: "We have a chat", desc: "I'll get back to you within 24 hours. We'll go over what you need, agree on a price, and I'll answer any questions you have." },
  { step: "03", title: "I build it", desc: "I handle everything: design, development, and testing. You'll get updates along the way and a chance to review before anything goes live." },
  { step: "04", title: "You go live", desc: "Your site is published, your domain is set up, and everything is registered in your name. I stay available for any tweaks or support after launch." },
];

const FAQS = [
  { q: "Do I own the website once it's done?", a: "Yes, completely. Your domain and all website files are registered in your name from day one." },
  { q: "What if I need changes after the site is live?", a: "Small changes (text, photos, hours) are quick and I'm happy to help. For ongoing updates, the monthly maintenance plan (from €40/mo) covers this so you never have to worry about it." },
  { q: "Do you need my logo and photos before you start?", a: "It helps, but it's not required to get started. I can work with what you have and placeholder content first." },
  { q: "How does payment work?", a: "By default, I ask for 50% upfront to begin work, and the remaining 50% once you're happy with the finished site before it goes live. However, this can be negotiated. Simply bring it up and we'll discuss." },
  { q: "How long does it take?", a: "Most sites are live within 7 days of us agreeing on the brief. More complex multi-page sites may take up to 2–3 weeks. I'll always give you a clear timeline before we start." },
  { q: "Will my site work on mobile phones?", a: "Every site I build is fully mobile-responsive by default." },
  { q: "Do I need to understand any of the technical side?", a: "Not at all. I'll handle everything technical." },
  { q: "Can you help if I already have a website that just needs updating?", a: "Absolutely. Whether it needs a visual refresh, new content, or a full rebuild, get in touch and I'll take a look." },
];

const ESTIMATOR_BASE = [
  { id: "starter", label: "Starter", desc: "Single-page site", price: 500 },
  { id: "standard", label: "Standard", desc: "Multi-section (3 pages)", price: 800 },
  { id: "premium", label: "Premium", desc: "Full site (5+ pages)", price: 1200 },
];

const ESTIMATOR_ADDON_CATEGORIES = [
  {
    category: "Communication",
    items: [
      { id: "whatsapp", label: "WhatsApp click-to-chat", desc: "A floating quick-chat button for fast customer contact.", price: 40 },
      { id: "chatbot", label: "AI chatbot", desc: "Auto-answers common questions so you spend less time replying.", price: 250 },
      { id: "newsletter", label: "Newsletter signup", desc: "Simple email capture to grow your mailing list.", price: 80 },
    ],
  },
  {
    category: "Bookings & availability",
    items: [
      { id: "booking", label: "Appointment booking", desc: "Online scheduling for salon or service appointments.", price: 150 },
      { id: "calendar", label: "Availability calendar", desc: "Shows available dates and prevents double bookings.", price: 200 },
    ],
  },
  {
    category: "Content",
    items: [
      { id: "gallery", label: "Photo gallery", desc: "A polished image gallery with lightbox preview.", price: 75 },
      { id: "blog", label: "Blog / news section", desc: "Post updates and news to keep your site fresh.", price: 120 },
      { id: "instagram", label: "Instagram feed embed", desc: "Displays your latest Instagram posts automatically.", price: 60 },
      { id: "menu", label: "Online menu + PDF", desc: "A digital menu with download option for customers.", price: 80 },
    ],
  },
  {
    category: "Visibility & setup",
    items: [
      { id: "analytics", label: "Google Analytics setup", desc: "Track visitors so you can see what actually works.", price: 50 },
      { id: "seo", label: "SEO optimisation", desc: "Meta tags, image compression, and better search visibility.", price: 120 },
      { id: "cookie", label: "Cookie consent banner", desc: "Legal cookie notice for GDPR-friendly sites.", price: 50 },
      { id: "multilang", label: "Multi-language toggle", desc: "Switch between English and Maltese for more guests.", price: 150 },
      { id: "maintenance", label: "Monthly maintenance", desc: "Ongoing support and updates for your website.", price: 40 },
    ],
  },
];

const ESTIMATOR_ADDONS = ESTIMATOR_ADDON_CATEGORIES.flatMap(({ items }) => items);

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState(null);
  const [formspree, handleFormspreeSubmit] = useForm("xkoevnbk");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0 });
  const [openAddon, setOpenAddon] = useState(() => ADDONS.map(({ category }) => category));
  const [hoveredEstimatorAddon, setHoveredEstimatorAddon] = useState(null);
  const [hoveredPricingAddon, setHoveredPricingAddon] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [estimatorBase, setEstimatorBase] = useState("starter");
  const [estimatorAddons, setEstimatorAddons] = useState([]);
  const [quoteText, setQuoteText] = useState("");
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  const estimatorTotal = (() => {
    const base = ESTIMATOR_BASE.find(b => b.id === estimatorBase)?.price ?? 0;
    const addonsTotal = estimatorAddons.reduce((sum, id) => {
      return sum + (ESTIMATOR_ADDONS.find(a => a.id === id)?.price ?? 0);
    }, 0);
    return base + addonsTotal;
  })();

  const quoteSummary = (() => {
    const base = ESTIMATOR_BASE.find(b => b.id === estimatorBase);
    const extras = estimatorAddons
      .map((id) => ESTIMATOR_ADDONS.find((a) => a.id === id)?.label)
      .filter(Boolean);
    const baseText = base ? `${base.label} (${base.desc})` : "No package selected yet";
    const extrasText = extras.length ? `Extras: ${extras.join(", ")}.` : "No extras selected.";
    return `Selected package: ${baseText}. ${extrasText} Estimated total: €${estimatorTotal.toLocaleString()}.`;
  })();

  const quoteActive = quoteText.trim().length > 0;
  const quoteButtonStyle = {
    background: quoteActive ? ACCENT : "rgba(148,163,184,0.18)",
    border: quoteActive ? `1px solid ${ACCENT}` : "1px solid rgba(148,163,184,0.35)",
    color: quoteActive ? "#fff" : "#cbd5e1",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: quoteActive ? "pointer" : "default",
    opacity: quoteActive ? 1 : 0.35,
    pointerEvents: quoteActive ? "auto" : "none",
    transition: "opacity 0.25s ease, background 0.25s ease, border-color 0.25s ease"
  };

  const modifyQuoteButtonStyle = {
    background: ACCENT,
    border: `1px solid ${ACCENT}`,
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: "pointer",
    opacity: 1,
    transition: "opacity 0.25s ease, background 0.25s ease, border-color 0.25s ease"
  };

  const handleGetQuote = () => {
    setQuoteText(quoteSummary);
    scrollTo("contact");
    window.setTimeout(() => {
      messageRef.current?.focus();
    }, 700);
  };

  const resetQuote = () => {
    setQuoteText("");
    setMessage("");
  };

  const toggleEstimatorAddon = (id) => {
    setEstimatorAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll('button:not(.no-hover-effect)'));
    const handleMove = (event) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty('--pointer-x', `${x}%`);
      target.style.setProperty('--pointer-y', `${y}%`);
    };
    const handleLeave = (event) => {
      const target = event.currentTarget;
      target.style.setProperty('--pointer-x', '50%');
      target.style.setProperty('--pointer-y', '50%');
    };
    buttons.forEach((button) => {
      button.addEventListener('mousemove', handleMove);
      button.addEventListener('mouseleave', handleLeave);
    });
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('mousemove', handleMove);
        button.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  const handleCtaMove = useCallback((e) => {
    if (!ctaBtnRef.current) return;
    const rect = ctaBtnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setCtaOffset({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 });
  }, []);

  const handleCtaLeave = useCallback(() => { setCtaOffset({ x: 0, y: 0 }); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.4 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.opacity})`; ctx.fill();
      });
      particlesRef.current.forEach((a, i) => {
        particlesRef.current.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animFrameRef.current); window.removeEventListener("resize", resize); };
  }, []);

  const smoothScrollTo = (targetY) => {
    const startY = window.scrollY || window.pageYOffset;
    const diff = targetY - startY;
    const duration = 600;
    let startTime = null;

    const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOut(progress);
      window.scrollTo(0, startY + diff * eased);
      if (elapsed < duration) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) {
      setMenuOpen(false);
      return;
    }
    setScrolling(true);
    const offset = 70;
    const targetY = Math.max(target.getBoundingClientRect().top + window.scrollY - offset, 0);
    smoothScrollTo(targetY);
    setMenuOpen(false);
    window.setTimeout(() => {
      setScrolling(false);
    }, 650);
  };
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div style={{ background: "#09090b", color: "#fafafa", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "rgba(9,9,11,0.14)", opacity: scrolling ? 1 : 0, transition: "opacity 0.28s ease", zIndex: 900 }} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #09090b; } ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 2px; }
        .project-card { transition: transform 0.3s ease, border-color 0.3s ease; }
        .project-card:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.5) !important; }
        .project-overlay { opacity: 0; transition: opacity 0.25s ease; }
        .project-card:hover .project-overlay { opacity: 1; }
        .service-card { transition: border-color 0.25s ease, background 0.25s ease; }
        .service-card:hover { border-color: rgba(59,130,246,0.4) !important; background: rgba(59,130,246,0.04) !important; }
        button:not(.no-hover-effect) {
          position: relative;
          overflow: hidden;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease, opacity 0.18s ease;
          transform: translateZ(0);
        }
        button:not(.no-hover-effect)::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(59,130,246,0.18), transparent 42%);
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          transform: scale(1);
        }
        button:not(.no-hover-effect):hover::before {
          opacity: 1;
          transform: scale(1.08);
        }
        button:not(.no-hover-effect):active::before {
          opacity: 0.8;
          transform: scale(1.02);
        }
        button:hover:not(:disabled):not(.no-hover-effect) {
          transform: translateX(calc((var(--pointer-x, 50%) - 50%) * 0.08)) translateY(-1px);
          box-shadow: calc((var(--pointer-x, 50%) - 50%) * 9px) calc((var(--pointer-y, 50%) - 50%) * 9px) 34px rgba(59,130,246,0.16);
        }
        button:active:not(:disabled):not(.no-hover-effect) {
          transform: translateX(calc((var(--pointer-x, 50%) - 50%) * 0.06)) translateY(0px) scale(0.98);
          box-shadow: calc((var(--pointer-x, 50%) - 50%) * 6px) calc((var(--pointer-y, 50%) - 50%) * 6px) 18px rgba(59,130,246,0.18);
        }
        button:focus-visible {
          outline: 2px solid rgba(59,130,246,0.7);
          outline-offset: 3px;
        }
        button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
        .dropdown-toggle {
          transition: background-color 0.18s ease, color 0.18s ease;
          border-radius: 10px;
        }
        .dropdown-toggle:hover {
          background: rgba(255,255,255,0.06);
        }
        .dropdown-toggle:active {
          background: rgba(255,255,255,0.08);
        }
        .dropdown-panel {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          padding-bottom: 0;
          transition: max-height 0.32s ease, opacity 0.24s ease, padding-bottom 0.24s ease;
        }
        .dropdown-panel.open {
          max-height: 1000px;
          opacity: 1;
          padding-bottom: 1.5rem;
        }
        .nav-link { transition: color 0.2s ease; } .nav-link:hover { color: #3B82F6 !important; }
        .filter-btn { transition: all 0.2s ease; }
        .why-card { transition: border-color 0.25s, background 0.25s; }
        .why-card:hover { border-color: rgba(59,130,246,0.35) !important; background: rgba(59,130,246,0.04) !important; }
        input, textarea { outline: none; transition: border-color 0.2s ease; }
        input:focus, textarea:focus { border-color: #3B82F6 !important; }
        .cta-magnetic { transition: transform 0.18s ease; }
        .estimator-addon-group { border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; background: rgba(255,255,255,0.02); padding: 1rem; }
        .estimator-addon-group + .estimator-addon-group { margin-top: 1rem; }
        .estimator-addon-group-title { font-size: 13px; font-weight: 600; color: #fafafa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.85rem; }
        .estimator-addon-card { transition: all 0.2s ease, border-color 0.2s ease, background 0.2s ease; position: relative; overflow: hidden; text-align: left; }
        .estimator-addon-card:hover { border-color: rgba(59,130,246,0.45); background: rgba(59,130,246,0.08); }
        .addon-hover-desc { color: #cbd5e1; font-size: 11px; line-height: 1.5; margin-top: 0.6rem; opacity: 0; max-height: 0; overflow: hidden; visibility: hidden; transition: opacity 0.2s ease, max-height 0.2s ease, visibility 0.2s ease; }
        @media (max-width: 768px) {
          #estimator-grid { grid-template-columns: 1fr !important; }
          #estimator-addons-grid { grid-template-columns: 1fr !important; }
          #about-grid { grid-template-columns: 1fr !important; }
          .mobile-menu-btn { display: flex !important; }
          .desktop-nav { display: none !important; }
        }
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
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button key={link} className="nav-link no-hover-effect" onClick={() => scrollTo(link)}
              style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.01em" }}>
              {link}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            background: ACCENT, color: "#fff", border: "none", padding: "8px 18px",
            borderRadius: "6px", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", fontWeight: 500
          }}>Hire me</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: "#fafafa", cursor: "pointer" }} className="mobile-menu-btn no-hover-effect dropdown-toggle" aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: "60px", left: 0, right: 0, background: "#09090b", borderBottom: "1px solid rgba(255,255,255,0.08)", zIndex: 99, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)} className="no-hover-effect"
              style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "16px", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
              {link}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "720px", marginTop: "4rem" }}>
          <div className="hero-line-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "100px", padding: "5px 14px", marginBottom: "2rem" }}>
            <span className="dot-pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3B82F6", display: "inline-block" }} />
            <span style={{ fontSize: "13px", color: "#93C5FD", fontFamily: "'DM Mono', monospace" }}>Available for projects</span>
          </div>
          <h1 className="hero-line-2" style={{ fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            I build websites<br />
            <span style={{ color: "#3f3f46" }}>for</span>{" "}
            <span style={{ color: ACCENT }}>businesses.</span>
          </h1>
          <p className="hero-line-3" style={{ fontSize: "18px", color: "#71717a", lineHeight: 1.7, maxWidth: "480px", marginBottom: "2.5rem", fontWeight: 300 }}>
            Fast, professional, and affordable. If your business' website needs updating or does not exist altogether, I can help.
          </p>
          <div className="hero-line-4" style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
            <button ref={ctaBtnRef} className="cta-magnetic" onMouseMove={handleCtaMove} onMouseLeave={handleCtaLeave} onClick={() => scrollTo("contact")}
              style={{ background: ACCENT, color: "#fff", border: "none", padding: "14px 28px", borderRadius: "8px", fontSize: "15px", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, transform: `translate(${ctaOffset.x}px, ${ctaOffset.y}px)` }}>
              Get a free quote
            </button>
            <button onClick={() => scrollTo("work")} style={{ background: "transparent", color: "#a1a1aa", border: "1px solid rgba(255,255,255,0.1)", padding: "14px 28px", borderRadius: "8px", fontSize: "15px", cursor: "pointer", fontFamily: "inherit" }}>
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
        <button onClick={() => scrollTo("about")} style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", background: "none", border: "none", color: "#3f3f46", cursor: "pointer" }}>
          <ChevronDown size={22} style={{ animation: "dotPulse 2s ease-in-out infinite" }} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel text="about" />
        <div id="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1.5rem" }}>Hi, I'm Jake.</h2>
            <p style={{ color: "#71717a", lineHeight: 1.8, marginBottom: "1rem", fontWeight: 300 }}>
              I'm a 22-year-old IT student studying my Bachelor's in Software Development. I build professional websites, prioritising affordability, speed, and with no technical jargon.
            </p>
            <p style={{ color: "#71717a", lineHeight: 1.8, fontWeight: 300 }}>
              If you run a business that requires an online presence, my websites will help you get one, without breaking the bank or getting lost in the technical details. I handle everything from design to deployment, so you can focus on what you do best; running your business.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "2rem", flexWrap: "wrap" }}>
              {["React", "Next.js", "Tailwind CSS", "Firebase", "Vercel", "Figma"].map(tech => (
                <span key={tech} style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "#93C5FD", padding: "5px 12px", borderRadius: "4px", fontSize: "13px", fontFamily: "'DM Mono', monospace", transition: "all 0.2s ease", cursor: "default" }}
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

      {/* SERVICES */}
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

      {/* PRICING */}
      <section id="pricing" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel text="pricing" />
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>Simple, honest pricing</h2>
          <p style={{ color: "#71717a", marginBottom: "3rem", fontWeight: 300 }}>Three tiers to suit any business. Every site can be extended with add-ons.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "4rem" }}>
            {TIERS.map(({ name, price, desc, features, note }) => (
              <div key={name} style={{ background: note === "Most popular" ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${note === "Most popular" ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.07)"}`, borderRadius: "12px", padding: "1.75rem", position: "relative" }}>
                {note && <span style={{ position: "absolute", top: "-12px", left: "1.5rem", background: ACCENT, color: "#fff", fontSize: "11px", padding: "3px 10px", borderRadius: "100px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>{note}</span>}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600 }}>{name}</h3>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "18px", color: ACCENT, fontWeight: 500 }}>{price}</span>
                </div>
                <p style={{ fontSize: "13px", color: "#71717a", lineHeight: 1.65, marginBottom: "1.5rem" }}>{desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: ACCENT, fontSize: "14px" }}>✓</span>
                      <span style={{ fontSize: "13px", color: "#a1a1aa" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo("contact")} style={{ marginTop: "1.75rem", width: "100%", background: note === "Most popular" ? ACCENT : "rgba(255,255,255,0.05)", color: "#fff", border: `1px solid ${note === "Most popular" ? ACCENT : "rgba(255,255,255,0.1)"}`, borderRadius: "8px", padding: "11px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
                  Get a quote
                </button>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "3rem" }}>
            <h3 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>Add-ons & extras</h3>
            <p style={{ fontSize: "13px", color: "#71717a", fontWeight: 300, marginBottom: "2rem" }}>Extend any site with the features your business actually needs.</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {ADDONS.map(({ category, items }) => {
                const isOpen = openAddon.includes(category);
                return (
                  <div key={category} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button className="dropdown-toggle no-hover-effect" onClick={() => setOpenAddon(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category])} style={{ width: "100%", background: "none", border: "none", color: "#fafafa", cursor: "pointer", padding: "1.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "inherit", fontSize: "14px", fontWeight: 500 }}>
                      <span>{category}</span>
                      <span style={{ color: ACCENT, fontSize: "20px", transition: "transform 0.25s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block", lineHeight: 1 }}>+</span>
                    </button>
                    <div className={`dropdown-panel${isOpen ? " open" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                        {items.map(({ name, desc, price }) => {
                          const isHovered = hoveredPricingAddon === name;
                          return (
                            <button key={name}
                              onMouseEnter={() => setHoveredPricingAddon(name)}
                              onMouseLeave={() => setHoveredPricingAddon(null)}
                              className="estimator-addon-card"
                              style={{
                                width: "100%",
                                textAlign: "left",
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "12px",
                                padding: "1.25rem",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                flexDirection: "column",
                                transition: "all 0.2s"
                              }}>
                              <div>
                                <span style={{ fontSize: "13px", fontWeight: 500, color: "#fafafa", lineHeight: 1.4 }}>{name}</span>
                                <p className="addon-hover-desc" style={{ opacity: isHovered ? 1 : 0, maxHeight: isHovered ? "4rem" : "0", visibility: isHovered ? "visible" : "hidden" }}>{desc}</p>
                              </div>
                              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: ACCENT, flexShrink: 0 }}>{price}</span>
                            </button>
                          );
                        })}
                      </div>
                  </div>
                );
              })}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel text="work" />
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: "2rem" }}>Recent projects</h2>
        <div style={{ display: "flex", gap: "8px", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button key={f} className="filter-btn" onClick={() => setFilter(f)} style={{ background: filter === f ? ACCENT : "rgba(255,255,255,0.04)", color: filter === f ? "#fff" : "#71717a", border: `1px solid ${filter === f ? ACCENT : "rgba(255,255,255,0.08)"}`, padding: "7px 16px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", fontWeight: filter === f ? 500 : 400 }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {filtered.map((p, i) => (
            <div key={p.title} className="project-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
              <div style={{ height: "140px", background: `rgba(59,130,246,${0.04 + i * 0.02})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Globe size={32} style={{ color: "rgba(59,130,246,0.3)" }} />
                <div className="project-overlay" style={{ position: "absolute", inset: 0, background: "rgba(9,9,11,0.85)", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                  <a href={p.codeUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                    style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.4)", color: "#93C5FD", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
                    <Code2 size={14} /> Code
                  </a>
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                    style={{ background: ACCENT, border: "none", color: "#fff", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
                    <ExternalLink size={14} /> Live
                  </a>
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

      {/* PROCESS */}
      <section id="process" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel text="how it works" />
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>From first message to live site</h2>
          <p style={{ color: "#71717a", marginBottom: "3rem", fontWeight: 300 }}>A simple, four-step process. No technical knowledge required on your end.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0" }}>
            {PROCESS.map(({ step, title, desc }, i) => (
              <div key={step} style={{ position: "relative", padding: "2rem 1.75rem", borderLeft: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none", borderTop: "1px solid rgba(255,255,255,0.07)", borderRight: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.01)" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: ACCENT, letterSpacing: "0.1em", marginBottom: "1rem", opacity: 0.7 }}>{step}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#fafafa", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: "#71717a", lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
                {i < PROCESS.length - 1 && (
                  <div style={{ display: "none" }} className="process-arrow" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section id="estimator" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel text="price estimator" />
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>Build your own quote</h2>
          <p style={{ color: "#71717a", marginBottom: "3rem", fontWeight: 300 }}>Pick a package and any extras you need. See the price update in real time.</p>
          <div id="estimator-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
            {/* Left: controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <p style={{ fontSize: "13px", color: "#a1a1aa", fontWeight: 500, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace" }}>1. Choose a package</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {ESTIMATOR_BASE.map(({ id, label, desc, price }) => (
                    <button key={id} onClick={() => setEstimatorBase(id)} style={{ background: estimatorBase === id ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${estimatorBase === id ? "rgba(59,130,246,0.45)" : "rgba(255,255,255,0.07)"}`, borderRadius: "10px", padding: "1rem 1.25rem", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}>
                      <div style={{ textAlign: "left" }}>
                        <p style={{ fontSize: "14px", fontWeight: 500, color: estimatorBase === id ? "#fafafa" : "#a1a1aa", marginBottom: "2px" }}>{label}</p>
                        <p style={{ fontSize: "12px", color: "#52525b" }}>{desc}</p>
                      </div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", color: estimatorBase === id ? ACCENT : "#52525b", fontWeight: 500 }}>€{price}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: "13px", color: "#a1a1aa", fontWeight: 500, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace" }}>2. Add extras (optional)</p>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {ESTIMATOR_ADDON_CATEGORIES.map(({ category, items }) => (
                    <div key={category} className="estimator-addon-group">
                      <div className="estimator-addon-group-title">{category}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
                        {items.map(({ id, label, desc, price }) => {
                          const active = estimatorAddons.includes(id);
                          const isHovered = hoveredEstimatorAddon === id;
                          return (
                            <button key={id}
                              onMouseEnter={() => setHoveredEstimatorAddon(id)}
                              onMouseLeave={() => setHoveredEstimatorAddon(null)}
                              onClick={() => toggleEstimatorAddon(id)}
                              title={desc}
                              className="estimator-addon-card"
                              style={{
                                background: active ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)",
                                border: `1px solid ${active ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.06)"}`,
                                borderRadius: "12px",
                                padding: "1rem",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                flexDirection: "column",
                                transition: "all 0.2s"
                              }}>
                              <div>
                                <span style={{ fontSize: "13px", fontWeight: 500, color: active ? "#fafafa" : "#e5e7eb", lineHeight: 1.4 }}>{label}</span>
                                <p className="addon-hover-desc" style={{ opacity: isHovered ? 1 : 0, maxHeight: isHovered ? "4rem" : "0", visibility: isHovered ? "visible" : "hidden" }}>{desc}</p>
                              </div>
                              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: active ? ACCENT : "#a1a1aa", flexShrink: 0 }}>+€{price}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right: summary */}
            <div style={{ position: "sticky", top: "80px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "2rem", display: "flex", flexDirection: "column", gap: "0" }}>
              <p style={{ fontSize: "12px", color: "#52525b", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Your estimate</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.5rem" }}>
                {(() => {
                  const base = ESTIMATOR_BASE.find(b => b.id === estimatorBase);
                  return (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <span style={{ fontSize: "13px", color: "#a1a1aa" }}>{base.label} package</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#fafafa" }}>€{base.price}</span>
                    </div>
                  );
                })()}
                {estimatorAddons.length === 0 && (
                  <p style={{ fontSize: "12px", color: "#3f3f46", fontStyle: "italic" }}>No extras selected yet.</p>
                )}
                {estimatorAddons.map(id => {
                  const addon = ESTIMATOR_ADDONS.find(a => a.id === id);
                  return (
                    <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "#71717a" }}>{addon.label}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#71717a" }}>+€{addon.price}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.25rem", marginBottom: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: "14px", color: "#a1a1aa", fontWeight: 500 }}>Estimated total</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "28px", color: ACCENT, fontWeight: 500, letterSpacing: "-0.03em" }}>€{estimatorTotal.toLocaleString()}</span>
                </div>
                <p style={{ fontSize: "11px", color: "#3f3f46", marginTop: "6px" }}>* This is an estimate. Final price confirmed after we chat.</p>
              </div>
              <button onClick={handleGetQuote} style={{ background: ACCENT, color: "#fff", border: "none", padding: "13px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <MessageCircle size={15} /> Get this quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <SectionLabel text="faq" />
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>Common questions</h2>
          <p style={{ color: "#71717a", marginBottom: "3rem", fontWeight: 300 }}>Everything most business owners ask before getting in touch.</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQS.map(({ q, a }, i) => (
              <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <button className="no-hover-effect" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", color: openFaq === i ? "#fafafa" : "#a1a1aa", cursor: "pointer", padding: "1.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "inherit", fontSize: "14px", fontWeight: openFaq === i ? 500 : 400, gap: "1rem", textAlign: "left", transition: "color 0.2s" }}>
                  <span>{q}</span>
                  <span style={{ color: ACCENT, fontSize: "18px", transition: "transform 0.25s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block", lineHeight: 1, flexShrink: 0 }}>+</span>
                </button>
                <div className={`dropdown-panel${openFaq === i ? " open" : ""}`}>
                  <p style={{ fontSize: "14px", color: "#71717a", lineHeight: 1.8, margin: 0, fontWeight: 300 }}>{a}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
          <div style={{ marginTop: "2.5rem", background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "12px", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <HelpCircle size={20} style={{ color: ACCENT, flexShrink: 0 }} />
            <p style={{ fontSize: "13px", color: "#71717a", lineHeight: 1.6 }}>
              Have a question not listed here?{" "}
              <button className="no-hover-effect" onClick={() => scrollTo("contact")} style={{ background: "none", border: "none", color: ACCENT, cursor: "pointer", fontFamily: "inherit", fontSize: "13px", padding: 0, textDecoration: "underline" }}>Send me a message</button>
              {" "}— I'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <SectionLabel text="contact" />
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>Let's talk</h2>
          <p style={{ color: "#71717a", marginBottom: "2.5rem", fontWeight: 300 }}>Tell me about your business and what you need. I'll get back to you within 24 hours, with no commitment required.</p>
          {formspree.succeeded ? (
            <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "12px", padding: "2rem", textAlign: "center" }}>
              <CheckCircle size={32} style={{ color: "#10B981", margin: "0 auto 1rem", display: "block" }} />
              <p style={{ fontWeight: 500, marginBottom: "6px" }}>Message sent!</p>
              <p style={{ fontSize: "14px", color: "#71717a" }}>I'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleFormspreeSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", color: "#a1a1aa", display: "block", marginBottom: "6px" }}>Your name</label>
                <input type="text" name="name" placeholder="Name" required style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "11px 14px", color: "#fafafa", fontSize: "14px", fontFamily: "inherit" }} />
                <ValidationError field="name" errors={formspree.errors} style={{ fontSize: "12px", color: "#EF4444", marginTop: "5px", display: "block" }} />
              </div>
              <div>
                <label style={{ fontSize: "13px", color: "#a1a1aa", display: "block", marginBottom: "6px" }}>Email address</label>
                <input type="email" name="email" placeholder="name@example.com" required style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "11px 14px", color: "#fafafa", fontSize: "14px", fontFamily: "inherit" }} />
                <ValidationError field="email" errors={formspree.errors} style={{ fontSize: "12px", color: "#EF4444", marginTop: "5px", display: "block" }} />
              </div>
              <div>
                <label style={{ fontSize: "13px", color: "#a1a1aa", display: "block", marginBottom: "6px" }}>Business name (optional)</label>
                <input type="text" name="business" placeholder="Business Name" style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "11px 14px", color: "#fafafa", fontSize: "14px", fontFamily: "inherit" }} />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                  <label style={{ fontSize: "13px", color: "#a1a1aa", display: "block" }}>Selected quote <span style={{ color: "#a1a1aa", fontSize: "11px", fontWeight: 400 }}>(optional)</span></label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button type="button" onClick={resetQuote} style={quoteButtonStyle}>
                      Reset quote
                    </button>
                    <button type="button" onClick={() => scrollTo("estimator")} style={modifyQuoteButtonStyle}>
                      Modify quote
                    </button>
                  </div>
                </div>
                <textarea name="quote" rows={4} value={quoteText} readOnly placeholder="Get this quote to populate your selected package and extras." style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "11px 14px", color: "#fafafa", fontSize: "14px", fontFamily: "inherit", resize: "vertical" }} />
              </div>
              <div>
                <label style={{ fontSize: "13px", color: "#a1a1aa", display: "block", marginBottom: "6px" }}>Message</label>
                <textarea
                  ref={messageRef}
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me what you're looking for..."
                  required
                  style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "11px 14px", color: "#fafafa", fontSize: "14px", fontFamily: "inherit", resize: "vertical" }}
                />
                <ValidationError field="message" errors={formspree.errors} style={{ fontSize: "12px", color: "#EF4444", marginTop: "5px", display: "block" }} />
              </div>
              <button type="submit" disabled={formspree.submitting} style={{ background: ACCENT, color: "#fff", border: "none", padding: "13px", borderRadius: "8px", fontSize: "15px", cursor: formspree.submitting ? "wait" : "pointer", fontFamily: "inherit", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", opacity: formspree.submitting ? 0.7 : 1, transition: "opacity 0.2s" }}>
                <Send size={16} />
                {formspree.submitting ? "Sending..." : "Send message"}
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