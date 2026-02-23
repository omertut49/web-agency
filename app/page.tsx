"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const WHATSAPP_NUMBER = "905456952696";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const EMAIL = "tutomer86@gmail.com";

type Plan = {
  id: string;
  title: string;
  oldPrice: string;
  price: string;
  items: string[];
  badge?: string;
  highlight?: boolean;
  kind: "website" | "maintenance";
};

const nav = [
  { label: "Paketler", href: "#paketler" },
  { label: "Portföy", href: "#portfoy" },
  { label: "Süreç", href: "#surec" },
  { label: "Hesapla", href: "#hesapla" },
  { label: "SSS", href: "#sss" },
  { label: "İletişim", href: "#iletisim" },
];

/* ===============================
   LOGO
   =============================== */
export function LogoIconAnimated({
  size = 52,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const cycle = 10.2;
  const xTravel = 150;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      aria-hidden="true"
      className={className}
      style={{ filter: "drop-shadow(0px 10px 18px rgba(0,0,0,.35))" }}
    >
      <defs>
        <linearGradient id="wm_orange" x1="18" y1="18" x2="112" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF8A52" />
          <stop offset="0.55" stopColor="#FF4B12" />
          <stop offset="1" stopColor="#DF3410" />
        </linearGradient>

        <filter id="wm_emboss" x="-35%" y="-35%" width="170%" height="170%">
          <feOffset dx="1.2" dy="1.8" in="SourceAlpha" result="off1" />
          <feGaussianBlur in="off1" stdDeviation="1.9" result="blur1" />
          <feComposite in="blur1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="innerShadow" />
          <feColorMatrix
            in="innerShadow"
            type="matrix"
            values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 .45 0"
            result="innerShadowColor"
          />

          <feOffset dx="-1.2" dy="-1.2" in="SourceAlpha" result="off2" />
          <feGaussianBlur in="off2" stdDeviation="1.6" result="blur2" />
          <feComposite in="blur2" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="innerLight" />
          <feColorMatrix
            in="innerLight"
            type="matrix"
            values="
              1 0 0 0 1
              0 1 0 0 1
              0 0 1 0 1
              0 0 0 .30 0"
            result="innerLightColor"
          />

          <feMerge>
            <feMergeNode in="innerShadowColor" />
            <feMergeNode in="innerLightColor" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="wm_light" x1="40" y1="84" x2="102" y2="114" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E5E7EB" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>

        <linearGradient id="wm_shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <clipPath id="wm_clip_cart">
          <path d="M34 44 H108 L95 88 H44 Z" />
        </clipPath>
      </defs>

      <motion.g
        animate={{
          x: [0, xTravel, xTravel, 0, 0, 0],
          opacity: [1, 1, 0, 0, 0, 1],
        }}
        transition={{
          duration: cycle,
          times: [0, 0.55, 0.62, 0.68, 0.82, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M28 44
             C28 30, 44 24, 56 32
             L64 38
             C67 40, 65 45, 61 44
             L54 41
             C46 37, 36 38, 34 46
             L34 50
             L28 50
             Z"
          fill="url(#wm_orange)"
          filter="url(#wm_emboss)"
        />

        <path
          d="M32 44
             H110
             C114 44, 116 48, 114 51
             L112 55
             H36
             L32 46
             Z"
          fill="rgba(255,255,255,0.20)"
          opacity="0.9"
        />

        <path d="M34 44 H108 L95 88 H44 Z" fill="url(#wm_orange)" filter="url(#wm_emboss)" />

        <path d="M46 54 H98" stroke="rgba(255,255,255,0.14)" strokeWidth="3" strokeLinecap="round" />
        <path d="M49 64 H95" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
        <path d="M52 74 H92" stroke="rgba(255,255,255,0.10)" strokeWidth="3" strokeLinecap="round" />

        <g opacity="0.95">
          <path
            d="M63 58 L53 66 L63 74"
            fill="none"
            stroke="rgba(10,10,10,0.92)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M70 56 L64 78"
            fill="none"
            stroke="rgba(10,10,10,0.92)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M75 58 L85 66 L75 74"
            fill="none"
            stroke="rgba(10,10,10,0.92)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <path
          d="M44 88
             H95
             C98 88, 101 87, 103 84
             L108 76
             H54
             C48 76, 44 80, 44 86
             Z"
          fill="url(#wm_light)"
          opacity="0.98"
        />

        <motion.g
          animate={{ rotate: [0, 720, 720, 720, 720, 720] }}
          transition={{
            duration: cycle,
            times: [0, 0.55, 0.62, 0.68, 0.82, 1],
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "58px 104px" }}
        >
          <circle cx="58" cy="104" r="10" fill="#F3F4F6" />
          <circle cx="58" cy="104" r="5" fill="rgba(0,0,0,0.12)" />
          <path d="M58 94 V114" stroke="rgba(0,0,0,0.14)" strokeWidth="2" strokeLinecap="round" />
          <path d="M48 104 H68" stroke="rgba(0,0,0,0.14)" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        <motion.g
          animate={{ rotate: [0, 720, 720, 720, 720, 720] }}
          transition={{
            duration: cycle,
            times: [0, 0.55, 0.62, 0.68, 0.82, 1],
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "92px 104px" }}
        >
          <circle cx="92" cy="104" r="10" fill="#F3F4F6" />
          <circle cx="92" cy="104" r="5" fill="rgba(0,0,0,0.12)" />
          <path d="M92 94 V114" stroke="rgba(0,0,0,0.14)" strokeWidth="2" strokeLinecap="round" />
          <path d="M82 104 H102" stroke="rgba(0,0,0,0.14)" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        <motion.rect
          x="-60"
          y="30"
          width="70"
          height="120"
          fill="url(#wm_shine)"
          clipPath="url(#wm_clip_cart)"
          opacity={0.55}
          transform="rotate(18 64 64)"
          animate={{ x: [-60, 170, 170, 170, 170, 170] }}
          transition={{
            duration: cycle,
            times: [0, 0.55, 0.62, 0.68, 0.82, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.g>
    </motion.svg>
  );
}

function LogoMark() {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-3">
      <motion.span whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}>
        <LogoIconAnimated size={48} />
      </motion.span>

      <span className="text-xs sm:text-sm font-semibold tracking-tight">
        <span className="text-zinc-100">WEBMARKET</span>
        <span className="ml-1 text-[#FF5A1F]">PRO</span>
      </span>
    </span>
  );
}

/* ===============================
   ICONS
   =============================== */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.33c-.28-.14-1.64-.81-1.89-.9-.25-.09-.44-.14-.62.14-.19.28-.71.9-.87 1.09-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.37-1.63-1.53-1.9-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.5-.07-.14-.62-1.49-.85-2.05-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.53-.01s-.5.07-.76.35c-.26.28-1 1-1 2.44s1.03 2.83 1.17 3.03c.14.19 2.02 3.08 4.9 4.32.69.3 1.22.48 1.64.61.69.22 1.32.19 1.82.12.56-.08 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32-.07-.12-.25-.19-.53-.33z"
      />
      <path
        fill="currentColor"
        d="M26.67 5.33A14.6 14.6 0 0 0 16.02 1C8.1 1 1.65 7.45 1.65 15.37c0 2.54.67 5.02 1.95 7.2L1.5 31l8.62-2.07a14.3 14.3 0 0 0 5.9 1.26h.01c7.92 0 14.37-6.45 14.37-14.37 0-3.84-1.49-7.45-4.1-10.49zM16.03 27.7h-.01c-1.98 0-3.92-.53-5.62-1.53l-.4-.24-5.12 1.23 1.37-4.99-.26-.43a11.8 11.8 0 0 1-1.8-6.37C4.19 9.03 9.68 3.53 16.02 3.53c3.17 0 6.15 1.23 8.4 3.47a11.82 11.82 0 0 1 3.48 8.42c0 6.34-5.5 11.28-11.87 12.28z"
      />
    </svg>
  );
}

function BurgerIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ===============================
   HERO SHOWCASE
   =============================== */
function HeroShowcase() {
  const slides = [
    { title: "Dosya", file: "/file.svg" },
    { title: "Dünya", file: "/globe.svg" },
    { title: "Next", file: "/next.svg" },
    { title: "Vercel", file: "/vercel.svg" },
    { title: "Window", file: "/window.svg" },
  ];

  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 2600);
    return () => clearInterval(t);
  }, []);

  const current = slides[i];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 ring-1 ring-white/5"
    >
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/12 blur-3xl" />
      <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="relative rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Canlı Demo</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{current.title}</span>
          </div>
        </div>

        <div className="mx-4 sm:mx-5 mb-4 sm:mb-5 overflow-hidden rounded-xl border border-white/10 bg-black/40">
          <div className="relative aspect-[16/10]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.file}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image src={current.file} alt={current.title} fill className="object-contain p-6 sm:p-10" priority />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0">
              <motion.div
                className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-2 text-xs font-semibold text-zinc-950 shadow-lg"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                Teklif Al
              </motion.div>

              <div className="absolute top-4 left-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-zinc-200">
                %50 İndirim • Sınırlı Süre
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
            <div className="text-xs text-zinc-300">
              <span className="text-zinc-400">Tema:</span> {current.title}
            </div>

            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={[
                    "h-1.5 w-6 rounded-full transition",
                    idx === i ? "bg-white/70" : "bg-white/15 hover:bg-white/25",
                  ].join(" ")}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===============================
   MAIN
   =============================== */
export default function Home() {
  const plans: Plan[] = useMemo(
    () => [
      {
        id: "basic",
        title: "Başlangıç",
        oldPrice: "₺7.500",
        price: "₺3.750",
        items: ["Tek sayfa", "Temel SEO", "1 revizyon"],
        kind: "website",
      },
      {
        id: "pro",
        title: "Profesyonel",
        oldPrice: "₺15.000",
        price: "₺7.500",
        items: ["5 sayfa", "İleri SEO", "3 revizyon"],
        badge: "En Çok Tercih Edilen",
        highlight: true,
        kind: "website",
      },
      {
        id: "corp",
        title: "Kurumsal",
        oldPrice: "₺25.000",
        price: "₺12.500",
        items: ["10+ sayfa", "Blog", "2 hafta destek"],
        kind: "website",
      },
      {
        id: "maint",
        title: "Site Bakımı (Aylık)",
        oldPrice: "₺7.000",
        price: "₺3.500",
        items: ["Güncelleme & yedek", "Hız/SEO kontrol", "Öncelikli destek"],
        badge: "%50 İndirim",
        kind: "maintenance",
      },
    ],
    []
  );

  const portfolio = [
    { title: "Dosya", slug: "file", file: "/file.svg", demoUrl: "https://example-demo.vercel.app" },
    { title: "Dünya", slug: "globe", file: "/globe.svg", demoUrl: "https://example-demo2.vercel.app" },
    { title: "Next", slug: "next", file: "/next.svg", demoUrl: "https://example-demo3.vercel.app" },
    { title: "Vercel", slug: "vercel", file: "/vercel.svg", demoUrl: "https://example-demo4.vercel.app" },
    { title: "Window", slug: "window", file: "/window.svg", demoUrl: "https://example-demo5.vercel.app" },
  ];

  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openPurchase = (plan?: Plan) => {
    setSelectedPlan(plan ?? null);
    setPurchaseOpen(true);
  };

  const closePurchase = () => setPurchaseOpen(false);

  const whatsappMessage = useMemo(() => {
    const base = "Merhaba WebMarket Pro, ";
    if (!selectedPlan) return encodeURIComponent(base + "satın alma hakkında bilgi almak istiyorum.");
    return encodeURIComponent(
      `${base}"${selectedPlan.title}" paketi için satın alma sürecini başlatmak istiyorum. Fiyat: ${selectedPlan.price}`
    );
  }, [selectedPlan]);

  const whatsappBuyLink = `${WHATSAPP_LINK}?text=${whatsappMessage}`;
  const mailSubject = encodeURIComponent("WebMarket Pro - Satın Alma");
  const mailBody = encodeURIComponent(
    selectedPlan
      ? `Merhaba,\n\n"${selectedPlan.title}" paketi için satın alma sürecini başlatmak istiyorum.\nFiyat: ${selectedPlan.price}\n\nİsim:\nTelefon:\nNot:\n`
      : `Merhaba,\n\nSatın alma süreci hakkında bilgi almak istiyorum.\n\nİsim:\nTelefon:\nNot:\n`
  );
  const mailtoLink = `mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <main className="min-h-screen text-zinc-100 neon-bg neon-noise neon-vignette">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/35 backdrop-blur-xl">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <a href="#" className="flex items-center gap-2">
            <LogoMark />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            {nav.map((x) => (
              <a key={x.href} href={x.href} className="hover:text-white">
                {x.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 hover:bg-white/10"
              aria-label="Menü"
            >
              <BurgerIcon />
            </button>

            {/* CTA */}
            <button
              onClick={() => openPurchase()}
              className="relative rounded-full px-4 sm:px-6 py-2 text-sm font-semibold text-white
                         bg-gradient-to-r from-blue-600 to-violet-600
                         shadow-lg shadow-blue-600/25
                         ring-1 ring-white/10
                         hover:shadow-blue-600/40 hover:opacity-95 transition
                         overflow-hidden"
            >
              <span className="absolute -left-16 top-0 h-full w-24 rotate-12 bg-white/20 blur-md opacity-0 hover:opacity-100 transition" />
              Teklif Al
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        </div>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              aria-label="Kapat"
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed right-0 top-0 z-[70] h-full w-full max-w-xs border-l border-white/10 bg-black/60 backdrop-blur-2xl p-5"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Menü</div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 hover:bg-white/10"
                >
                  Kapat
                </button>
              </div>

              <div className="mt-5 grid gap-2">
                {nav.map((x) => (
                  <a
                    key={x.href}
                    href={x.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                  >
                    {x.label}
                  </a>
                ))}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openPurchase();
                }}
                className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white
                           shadow-lg shadow-blue-600/25 ring-1 ring-white/10 hover:opacity-95 transition"
              >
                Teklif Al
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <h1 className="text-[34px] leading-[1.08] font-semibold tracking-tight sm:text-4xl md:text-6xl md:leading-[1.05]">
                Web siten{" "}
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-300 bg-clip-text text-transparent">
                  satış makinesine
                </span>{" "}
                dönüşsün.
              </h1>

              <p className="mt-4 sm:mt-5 max-w-xl text-zinc-300 text-base md:text-lg">
                Stratejik tasarım, hızlı teslim ve güçlü dijital konumlandırma. 7–14 gün içinde yayında.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-200">
                <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,.9)]" />
                %50 indirim • Bu hafta sınırlı kontenjan
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mt-7 sm:mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#paketler"
                  className="relative rounded-full px-6 py-3 text-sm font-semibold text-white
                             bg-gradient-to-r from-blue-600 to-violet-600
                             shadow-lg shadow-blue-600/30
                             ring-1 ring-white/10
                             hover:shadow-blue-600/45 hover:opacity-95 transition overflow-hidden"
                >
                  <span className="absolute -left-16 top-0 h-full w-24 rotate-12 bg-white/20 blur-md opacity-0 hover:opacity-100 transition" />
                  <span className="relative">Paketleri İncele</span>
                </a>

                <a
                  href="#portfoy"
                  className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white
                             hover:border-white/20 hover:bg-white/10 transition"
                >
                  Çalışmaları Gör
                </a>
              </motion.div>

              <div className="mt-7 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 text-xs text-zinc-300">
                {["50+ Proje", "7–14 Gün Teslim", "SEO Altyapısı", "Sürekli Destek"].map((x) => (
                  <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 ring-1 ring-white/5">
                    {x}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <HeroShowcase />
        </div>
      </section>

      {/* Pricing */}
      <section id="paketler" className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
        <div>
          <h2 className="text-2xl font-semibold">Paketler</h2>
          <p className="mt-2 text-zinc-300">Özel indirim aktif. “Teklif Al” ile WhatsApp/E-posta üzerinden hemen başla.</p>
        </div>

        <div className="mt-7 sm:mt-8 grid gap-4 md:grid-cols-3">
          {plans
            .filter((p) => p.kind === "website")
            .map((p) => (
              <PlanCard key={p.id} plan={p} onBuy={() => openPurchase(p)} />
            ))}
        </div>

        <div className="mt-4">
          <PlanCard plan={plans.find((p) => p.kind === "maintenance")!} onBuy={() => openPurchase(plans[3])} />
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfoy" className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
        <h2 className="text-2xl font-semibold">Portföy</h2>
        <p className="mt-2 text-zinc-300">Şablonları ürün gibi incele. Detay sayfasında paket seçip teklif alabilirsin.</p>

        <div className="mt-6 sm:mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {portfolio.map((it) => (
            <div
              key={it.slug}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4
                         transition hover:-translate-y-2 hover:border-white/20 ring-1 ring-white/5"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/16 via-transparent to-violet-600/14" />
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
                <Image
                  src={it.file}
                  alt={it.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-6 sm:p-10 transition duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
                />
              </div>

              <div className="relative mt-3 text-sm text-zinc-200">{it.title}</div>
              <div className="relative mt-1 text-xs text-zinc-400">Kurumsal / Landing / Portföy</div>

              <div className="relative mt-4 flex items-center gap-2">
                <Link
                  href={`/urun/${it.slug}?plan=pro`}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white
                             shadow-lg shadow-blue-600/20 ring-1 ring-white/10 hover:opacity-95 transition"
                >
                  Detay
                </Link>

                {it.demoUrl ? (
                  <a
                    href={it.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white
                               hover:border-white/20 hover:bg-white/10 transition"
                  >
                    Demo
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="surec" className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
        <h2 className="text-2xl font-semibold">Süreç</h2>

        <div className="mt-7 sm:mt-8 grid gap-4 md:grid-cols-4">
          {["Keşif", "Tasarım", "Revizyon", "Yayın"].map((x, idx) => (
            <div
              key={x}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 ring-1 ring-white/5"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              <div className="text-xs text-zinc-400">Adım {idx + 1}</div>
              <div className="mt-2 text-lg font-semibold">{x}</div>
              <div className="mt-2 text-sm text-zinc-300">Kısa, net, takip edilebilir ilerleyiş.</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Calculator under Process */}
      <PriceCalculator />

      {/* FAQ */}
      <section id="sss" className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
        <h2 className="text-2xl font-semibold">SSS</h2>

        <div className="mt-6 grid gap-3">
          {[
            ["Teslim süresi ne kadar?", "Genelde 7–14 gün. İçerik ve sayfa sayısına göre netleştiriyoruz."],
            ["Revizyon var mı?", "Pakete göre değişir. Profesyonel pakette 3 revizyon var."],
            ["Bakım paketi neleri kapsar?", "Güncellemeler, yedek, hız/SEO kontrol ve öncelikli destek içerir."],
          ].map(([q, a]) => (
            <details key={q} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 ring-1 ring-white/5">
              <summary className="cursor-pointer text-sm font-medium text-zinc-200">{q}</summary>
              <p className="mt-3 text-sm text-zinc-300">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="iletisim" className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-14">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 ring-1 ring-white/5">
          <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-blue-600/16 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          <div className="relative flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">İletişim</h2>
              <p className="mt-2 text-zinc-300">WhatsApp veya e-posta ile hızlıca ulaş.</p>

              <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-200">
                <a className="inline-flex items-center gap-2 hover:text-white" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                  <span className="text-green-400">
                    <WhatsAppIcon />
                  </span>
                  <span>WhatsApp: +{WHATSAPP_NUMBER}</span>
                </a>

                <a className="hover:text-white" href={`mailto:${EMAIL}`}>
                  E-posta: {EMAIL}
                </a>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 md:mt-0">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white
                           shadow-[0_0_30px_rgba(34,197,94,.35)] ring-1 ring-white/10 hover:bg-green-400 transition"
              >
                <WhatsAppIcon />
                WhatsApp’tan Yaz
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-zinc-100
                           hover:border-white/20 hover:bg-white/10 transition"
              >
                E-posta Gönder
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} WebMarket Pro. Tüm hakları saklıdır.
      </footer>

      {/* Fixed WhatsApp (mobile smaller) */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 inline-flex items-center gap-2 rounded-full
                   bg-green-500 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-white
                   shadow-[0_0_30px_rgba(34,197,94,.35)]
                   ring-1 ring-white/10
                   hover:bg-green-400 transition"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>

      {/* Purchase Panel */}
      <AnimatePresence>
        {purchaseOpen && (
          <PurchaseDrawer
            onClose={closePurchase}
            planTitle={selectedPlan?.title}
            price={selectedPlan?.price}
            whatsappLink={whatsappBuyLink}
            mailtoLink={mailtoLink}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ===============================
   COMPONENTS
   =============================== */
function PlanCard({ plan, onBuy }: { plan: Plan; onBuy: () => void }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border p-6 transition",
        "bg-white/5 backdrop-blur-xl ring-1 ring-white/5",
        "hover:-translate-y-1 hover:border-white/20",
        plan.highlight ? "border-blue-500/40 shadow-xl shadow-blue-600/10" : "border-white/10",
      ].join(" ")}
    >
      {plan.highlight && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/18 via-transparent to-violet-600/16" />
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/18 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        </>
      )}

      {plan.badge && (
        <div className="absolute right-5 top-5 rounded-full bg-red-600/15 px-3 py-1 text-xs text-red-200 ring-1 ring-white/10">
          {plan.badge}
        </div>
      )}

      <div className="relative text-lg font-semibold">{plan.title}</div>

      <div className="relative mt-3">
        <div className="text-sm text-zinc-400 line-through">{plan.oldPrice}</div>
        <div className="text-4xl font-semibold tracking-tight text-white">{plan.price}</div>
        <div className="mt-2 inline-flex items-center gap-2 text-xs text-zinc-200">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,.9)]" />
          %50 İndirim • Sınırlı Süre
        </div>
      </div>

      <ul className="relative mt-5 space-y-2 text-sm text-zinc-300">
        {plan.items.map((x) => (
          <li key={x}>• {x}</li>
        ))}
      </ul>

      <button
        onClick={onBuy}
        className="relative mt-6 inline-flex w-full justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition overflow-hidden
                   bg-gradient-to-r from-blue-600 to-violet-600 text-white
                   shadow-lg shadow-blue-600/25 ring-1 ring-white/10
                   hover:shadow-blue-600/45 hover:opacity-95"
      >
        <span className="absolute -left-16 top-0 h-full w-24 rotate-12 bg-white/20 blur-md opacity-0 hover:opacity-100 transition" />
        <span className="relative">Teklif Al</span>
      </button>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-4 py-3
                   text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
      >
        <span className="text-green-400">
          <WhatsAppIcon />
        </span>
        WhatsApp’tan Yaz
      </a>
    </div>
  );
}

function PurchaseDrawer({
  onClose,
  planTitle,
  price,
  whatsappLink,
  mailtoLink,
}: {
  onClose: () => void;
  planTitle?: string;
  price?: string;
  whatsappLink: string;
  mailtoLink: string;
}) {
  return (
    <>
      <motion.button
        aria-label="Kapat"
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.aside
        className="fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l border-white/10 bg-black/55 backdrop-blur-2xl p-6"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-zinc-400">Satın Alma</div>
            <div className="mt-1 text-xl font-semibold">{planTitle ? planTitle : "Paket Seçimi"}</div>
            {price && <div className="mt-1 text-sm text-zinc-300">Fiyat: {price}</div>}
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 hover:bg-white/10"
          >
            Kapat
          </button>
        </div>

        <div className="mt-6 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 ring-1 ring-white/5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
          <div className="text-sm font-semibold text-zinc-200">Hızlı seçenekler</div>
          <p className="mt-2 text-sm text-zinc-300">En hızlı yol WhatsApp. İstersen e-posta ile de başlatabiliriz.</p>

          <div className="mt-4 grid gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-white
                         shadow-[0_0_30px_rgba(34,197,94,.35)] ring-1 ring-white/10 hover:bg-green-400 transition"
            >
              <WhatsAppIcon />
              WhatsApp ile Satın Al
            </a>

            <a
              href={mailtoLink}
              className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-4 py-3
                         text-sm font-semibold text-zinc-100 hover:border-white/20 hover:bg-white/10 transition"
            >
              E-posta ile Satın Al
            </a>
          </div>
        </div>

        <div className="mt-6 text-xs text-zinc-400">Not: Satın alma; brief → ödeme → teslim şeklinde ilerler.</div>
      </motion.aside>
    </>
  );
}

/* ===============================
   LIVE PRICE CALCULATOR (animated + countdown)
   =============================== */
function PriceCalculator() {
  const [pages, setPages] = useState(5);
  const [blog, setBlog] = useState(false);
  const [seo, setSeo] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  const basePrice = pages * 1000;
  const blogPrice = blog ? 2500 : 0;
  const seoPrice = seo ? 3000 : 0;
  const maintenancePrice = maintenance ? 3500 : 0;
  const total = basePrice + blogPrice + seoPrice + maintenancePrice;

  const mv = useMotionValue(total);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const display = useTransform(rounded, (v) => `₺${v.toLocaleString("tr-TR")}`);

  useEffect(() => {
    const controls = animate(mv, total, { duration: 0.55, ease: "easeOut" });
    return () => controls.stop();
  }, [total, mv]);

  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const getEndOfWeek = () => {
      const now = new Date();
      const day = now.getDay();
      const daysUntilSunday = (7 - day) % 7;
      const end = new Date(now);
      end.setDate(now.getDate() + daysUntilSunday);
      end.setHours(23, 59, 59, 999);
      return end;
    };

    const end = getEndOfWeek();

    const tick = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, end.getTime() - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setLeft({ d, h, m, s });
    };

    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const message = encodeURIComponent(
    `Merhaba WebMarket Pro,

Canlı hesaplama seçimlerim:
- Sayfa: ${pages}
- Blog: ${blog ? "Evet" : "Hayır"}
- SEO: ${seo ? "Evet" : "Hayır"}
- Bakım: ${maintenance ? "Evet" : "Hayır"}

Tahmini fiyat: ₺${total.toLocaleString("tr-TR")}

Detaylı teklif almak istiyorum.`
  );

  const whatsappHref = `${WHATSAPP_LINK}?text=${message}`;

  return (
    <section id="hesapla" className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 ring-1 ring-white/5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        <div className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-blue-600/14 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Canlı Fiyat Hesapla</h2>
            <p className="mt-2 text-zinc-300">İhtiyacını seç — fiyatı anında gör.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 ring-1 ring-white/5">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,.9)]" />
              Kampanya bitişine
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
              <span className="tabular-nums">{String(left.d).padStart(2, "0")}g</span>
              <span className="text-white/25">:</span>
              <span className="tabular-nums">{String(left.h).padStart(2, "0")}s</span>
              <span className="text-white/25">:</span>
              <span className="tabular-nums">{String(left.m).padStart(2, "0")}d</span>
              <span className="text-white/25">:</span>
              <span className="tabular-nums">{String(left.s).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-5 ring-1 ring-white/5">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-200">Sayfa Sayısı</label>
              <span className="text-sm font-semibold text-white tabular-nums">{pages}</span>
            </div>

            <input
              type="range"
              min={1}
              max={20}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="mt-4 w-full"
            />

            <div className="mt-2 text-xs text-zinc-400">Daha fazla sayfa = daha iyi içerik kapsama + SEO.</div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <Toggle label="Blog Sistemi" sub="+₺2.500" value={blog} setValue={setBlog} />
            <Toggle label="SEO Paketi" sub="+₺3.000" value={seo} setValue={setSeo} />
            <Toggle label="Bakım Paketi" sub="+₺3.500 / ay" value={maintenance} setValue={setMaintenance} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/25 p-6 ring-1 ring-white/5">
            <div className="text-sm text-zinc-400">Tahmini Toplam</div>
            <motion.div className="mt-2 text-4xl font-semibold tracking-tight text-white">{display}</motion.div>

            <div className="mt-2 text-xs text-zinc-400">Net fiyat: içerik ve kapsamla birlikte kesinleşir.</div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="relative mt-6 inline-flex w-full items-center justify-center rounded-2xl
                         bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white
                         shadow-lg shadow-blue-600/25 ring-1 ring-white/10
                         hover:shadow-blue-600/45 hover:opacity-95 transition overflow-hidden"
            >
              <span className="absolute -left-16 top-0 h-full w-24 rotate-12 bg-white/20 blur-md opacity-0 hover:opacity-100 transition" />
              <span className="relative">WhatsApp’tan Teklif Al</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toggle({
  label,
  sub,
  value,
  setValue,
}: {
  label: string;
  sub: string;
  value: boolean;
  setValue: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => setValue(!value)}
      className={[
        "text-left rounded-2xl border p-5 transition ring-1 ring-white/5",
        value
          ? "border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-600/10"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-zinc-100">{label}</div>
          <div className="mt-1 text-xs text-zinc-400">{sub}</div>
        </div>

        <div
          className={[
            "mt-0.5 h-5 w-9 rounded-full border transition",
            value ? "border-blue-500/40 bg-blue-500/30" : "border-white/15 bg-white/5",
          ].join(" ")}
        >
          <div
            className={[
              "h-4 w-4 rounded-full bg-white transition translate-y-[2px]",
              value ? "translate-x-[18px]" : "translate-x-[2px] opacity-70",
            ].join(" ")}
          />
        </div>
      </div>
    </button>
  );
}