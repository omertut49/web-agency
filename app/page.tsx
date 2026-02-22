"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

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
  { label: "SSS", href: "#sss" },
  { label: "İletişim", href: "#iletisim" },
];

// ✅ SADECE EKLENDİ: 6 portföy görseli (public/portfolio içindeki png’ler)
const portfolioItems = [
  {
    title: "E-Ticaret",
    subtitle: "Kurumsal / Landing / Portföy",
    image: "/portfolio/eticaret.png",
  },
  {
    title: "Klinik",
    subtitle: "Kurumsal / Landing / Portföy",
    image: "/portfolio/klinik.png",
  },
  {
    title: "Gayrimenkul",
    subtitle: "Kurumsal / Landing / Portföy",
    image: "/portfolio/gayrimenkul.png",
  },
  {
    title: "Restoran",
    subtitle: "Kurumsal / Landing / Portföy",
    image: "/portfolio/restoran.png",
  },
  {
    title: "Hukuk",
    subtitle: "Kurumsal / Landing / Portföy",
    image: "/portfolio/hukuk.png",
  },
  {
    title: "Danışmanlık",
    subtitle: "Kurumsal / Landing / Portföy",
    image: "/portfolio/danismanlik.png",
  },
];


/**
 * WebMarket Pro – Premium cart logo
 * Animasyon:
 * - 0%    : solda, görünür
 * - 55%   : sağa gider (teker döner), görünür
 * - 62%   : fade-out
 * - 68%   : başa teleport (görünmez)
 * - 82%   : bekle (görünmez)
 * - 100%  : fade-in (başta)
 */
export function LogoIconAnimated({
  size = 52,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const cycle = 10.2; // toplam döngü
  const xTravel = 150; // “site ortasına kadar” hissi için (120–190 arası oynayabilirsin)

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
        {/* Turuncu – 3D hissi */}
        <linearGradient id="wm_orange" x1="18" y1="18" x2="112" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF8A52" />
          <stop offset="0.55" stopColor="#FF4B12" />
          <stop offset="1" stopColor="#DF3410" />
        </linearGradient>

        {/* Turuncu emboss (iç gölge + highlight) */}
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

        {/* Alt parça – açık cam rengi */}
        <linearGradient id="wm_light" x1="40" y1="84" x2="102" y2="114" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E5E7EB" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>

        {/* Sepet içi shine */}
        <linearGradient id="wm_shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <clipPath id="wm_clip_cart">
          <path d="M34 44 H108 L95 88 H44 Z" />
        </clipPath>
      </defs>

      {/* ✅ Hareket eden grup */}
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
        {/* Sap (daha sepet gibi) */}
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

        {/* Üst ağız / rim */}
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

        {/* Sepet gövde (daha net form) */}
        <path
          d="M34 44
             H108
             L95 88
             H44
             Z"
          fill="url(#wm_orange)"
          filter="url(#wm_emboss)"
        />

        {/* İç panel çizgileri (daha “sepet” hissi) */}
        <path d="M46 54 H98" stroke="rgba(255,255,255,0.14)" strokeWidth="3" strokeLinecap="round" />
        <path d="M49 64 H95" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
        <path d="M52 74 H92" stroke="rgba(255,255,255,0.10)" strokeWidth="3" strokeLinecap="round" />

        {/* ✅ Kod ikonu </> — PATH ile (tam ortalı, text yok) */}
        <g opacity="0.95">
          {/* < */}
          <path
            d="M63 58 L53 66 L63 74"
            fill="none"
            stroke="rgba(10,10,10,0.92)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* / */}
          <path
            d="M70 56 L64 78"
            fill="none"
            stroke="rgba(10,10,10,0.92)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* > */}
          <path
            d="M75 58 L85 66 L75 74"
            fill="none"
            stroke="rgba(10,10,10,0.92)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Alt ayak / çizgi (açık renk) */}
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

        {/* ✅ Tekerler: sadece yürürken dönsün (0->55%) sonra dursun */}
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

        {/* Shine: sadece yürürken çalışsın; sonra görünmez */}
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

export function LogoMark1({ iconSize = 52 }: { iconSize?: number }) {
  return (
    <span className="inline-flex items-center gap-3">
      <motion.span
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <LogoIconAnimated size={iconSize} />
      </motion.span>

      <span className="text-sm font-semibold tracking-tight">
        <span className="text-zinc-100">WEBMARKET</span>
        <span className="ml-1 text-[#FF5A1F]">PRO</span>
      </span>
    </span>
  );
}
function LogoMark2() {
  // Minimal “WP” monogram vibe
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="7" fill="rgba(255,255,255,0.06)" />
      <path
        d="M6.8 8.2h2l1.2 6.7 1.4-4.4h1.2l1.4 4.4 1.2-6.7h2l-2 9.6h-1.7l-1.5-4.4-1.5 4.4H8.8l-2-9.6Z"
        fill="rgba(255,255,255,0.88)"
      />
      <path
        d="M2.5 12c0-5.2 4.3-9.5 9.5-9.5S21.5 6.8 21.5 12 17.2 21.5 12 21.5 2.5 17.2 2.5 12Z"
        fill="none"
        stroke="rgba(37,99,235,0.35)"
      />
    </svg>
  );
}

function LogoMark3() {
  // Minimal “market” hissi: 3 çizgi + nokta
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(37,99,235)" stopOpacity="0.85" />
          <stop offset="1" stopColor="rgb(37,99,235)" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="18" height="16" rx="6" fill="rgba(255,255,255,0.06)" />
      <rect x="7" y="8" width="10" height="1.8" rx="0.9" fill="url(#g3)" />
      <rect x="7" y="11.2" width="10" height="1.8" rx="0.9" fill="rgba(255,255,255,0.35)" />
      <rect x="7" y="14.4" width="7" height="1.8" rx="0.9" fill="rgba(124,58,237,0.35)" />
      <circle cx="17.2" cy="15.3" r="1" fill="rgba(37,99,235,0.9)" />
    </svg>
  );
}

const ACTIVE_LOGO: 1 | 2 | 3 = 1;

function LogoMark() {
  if (ACTIVE_LOGO === 2) return <LogoMark2 />;
  if (ACTIVE_LOGO === 3) return <LogoMark3 />;
  return <LogoMark1 />;
}

// WhatsApp icon (inline)
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
function HeroShowcase() {
  const slides = [
    { title: "E-Ticaret", file: "/portfolio/eticaret.png" },
    { title: "Klinik", file: "/portfolio/klinik.png" },
    { title: "Gayrimenkul", file: "/portfolio/gayrimenkul.png" },
    { title: "Restoran", file: "/portfolio/restoran.png" },
    { title: "Hukuk", file: "/portfolio/hukuk.png" },
    { title: "Danışmanlık", file: "/portfolio/danismanlik.png" },
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
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#161A22] p-6"
    >
      {/* premium glow */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
        {/* Browser bar */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1">
              Canlı Demo
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{current.title}</span>
          </div>
        </div>

        {/* Showcase */}
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0F1115]">
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
                <Image
                  src={current.file}
                  alt={current.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* UI overlays (satış hissi) */}
            <div className="pointer-events-none absolute inset-0">
              {/* CTA pulse */}
              <motion.div
                className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-2 text-xs font-semibold text-zinc-950 shadow-lg"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                Teklif Al
              </motion.div>

              {/* mini badge */}
              <div className="absolute top-47 left-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-zinc-200">
                %50 İndirim • Sınırlı Süre
              </div>

              {/* moving cursor */}
              <motion.div
                className="absolute h-3 w-3 rounded-full bg-white/80 shadow"
                animate={{
                  x: [20, 200, 260, 120, 20],
                  y: [30, 40, 160, 220, 30],
                }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>

          {/* “mini analytics” strip */}
          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
            <div className="text-xs text-zinc-300">
              <span className="text-zinc-400">Sektör:</span> {current.title}
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

  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const openPurchase = (plan?: Plan) => {
    setSelectedPlan(plan ?? null);
    setPurchaseOpen(true);
  };

  const closePurchase = () => setPurchaseOpen(false);

  const whatsappMessage = useMemo(() => {
    const base = "Merhaba Web Marketı, ";
    if (!selectedPlan) return encodeURIComponent(base + "satın alma hakkında bilgi almak istiyorum.");
    return encodeURIComponent(
      `${base}"${selectedPlan.title}" paketi için satın alma sürecini başlatmak istiyorum. Fiyat: ${selectedPlan.price}`
    );
  }, [selectedPlan]);

  const whatsappBuyLink = `${WHATSAPP_LINK}?text=${whatsappMessage}`;
  const mailSubject = encodeURIComponent("Web Marketı - Satın Alma");
  const mailBody = encodeURIComponent(
    selectedPlan
      ? `Merhaba,\n\n"${selectedPlan.title}" paketi için satın alma sürecini başlatmak istiyorum.\nFiyat: ${selectedPlan.price}\n\nİsim:\nTelefon:\nNot:\n`
      : `Merhaba,\n\nSatın alma süreci hakkında bilgi almak istiyorum.\n\nİsim:\nTelefon:\nNot:\n`
  );
  const mailtoLink = `mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <main className="min-h-screen bg-[#0F1115] text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0F1115]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-sm font-semibold tracking-tight"> </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            {nav.map((x) => (
              <a key={x.href} href={x.href} className="hover:text-white">
                {x.label}
              </a>
            ))}
          </nav>

          {/* Header CTA: Satın Al (panel açar) */}
          <button
            onClick={() => openPurchase()}
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500"
          >
            Satın Al
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
           <motion.a
  href="#paketler"
  initial={{ opacity: 0, scale: 0.985 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.55 }}
  className="relative block cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#161A22] p-6 transition hover:-translate-y-1"
>
              Web siten <span className="text-zinc-300">satışa dönüşsün.</span>
            </motion.a>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-5 max-w-xl text-zinc-300"
            >
              Stratejik tasarım, hızlı teslim ve güçlü dijital konumlandırma.
              z gün içinde yayında.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#paketler"
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
              >
                Paketleri İncele
              </a>
              <a
                href="#portfoy"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white hover:border-white/20"
              >
                Çalışmaları Gör
              </a>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-400">
              {["50+ Proje", "7–14 Gün Teslim", "SEO Altyapısı", "Sürekli Destek"].map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  {x}
                </span>
              ))}
            </div>
          </div>

{/* Right premium preview -> GERÇEK PORTFÖY + CANLI DEMO */}
<HeroShowcase />
        </div>
      </section>

      {/* Pricing */}
      <section id="paketler" className="mx-auto max-w-6xl px-6 py-12">
        <div>
          <h2 className="text-2xl font-semibold">Paketler</h2>
          <p className="mt-2 text-zinc-300">
            Özel indirim aktif. “Satın Al” ile WhatsApp/E-posta üzerinden hemen başla.
          </p>
        </div>

        {/* 3 web paketi */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans
            .filter((p) => p.kind === "website")
            .map((p) => (
              <PlanCard key={p.id} plan={p} onBuy={() => openPurchase(p)} />
            ))}
        </div>

        {/* Bakım paketi */}
        <div className="mt-4">
          <PlanCard
            plan={plans.find((p) => p.kind === "maintenance")!}
            onBuy={() => openPurchase(plans.find((p) => p.kind === "maintenance")!)}
          />
        </div>
      </section>
{/* Portfolio */}
<section id="portfoy" className="mx-auto max-w-6xl px-6 py-12">
  <h2 className="text-2xl font-semibold">Portföy</h2>
  <p className="mt-2 text-zinc-300">Birkaç örnek çalışma.</p>

  {(() => {
    const items = [
      { title: "E-Ticaret", slug: "eticaret", file: "/portfolio/eticaret.png" },
      { title: "Klinik", slug: "klinik", file: "/portfolio/klinik.png" },
      { title: "Gayrimenkul", slug: "gayrimenkul", file: "/portfolio/gayrimenkul.png" },
      { title: "Restoran", slug: "restoran", file: "/portfolio/restoran.png" },
      { title: "Hukuk", slug: "hukuk", file: "/portfolio/hukuk.png" },
      { title: "Danışmanlık", slug: "danismanlik", file: "/portfolio/danismanlik.png" },
    ];

    return (
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((it) => (
  <div key={it.title} className="group rounded-3xl border border-white/10 bg-[#161A22] p-4">
    <div className="aspect-[16/10] group relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#0F1115] p-6 transition duration-500 hover:-translate-y-2 border border-white/10">
      {/* Glow efekti */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-violet-600/10 opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Görsel */}
      <img
        src={it.file}
        alt={it.title}
        className="relative z-10 max-h-full max-w-full object-contain transition duration-700 group-hover:scale-125"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          console.error("Görsel yüklenemedi:", it.file);
        }}
      />
    </div>

    <div className="mt-3 text-sm text-zinc-200">{it.title}</div>
    <div className="mt-1 text-xs text-zinc-400">Kurumsal / Landing / Portföy</div>
  </div>
))}
      </div>
    );
  })()}
</section>



      {/* Process */}
      <section id="surec" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold">Süreç</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {["Keşif", "Tasarım", "Yayın", "Büyüme"].map((x, idx) => (
            <div key={x} className="rounded-3xl border border-white/10 bg-[#161A22] p-5">
              <div className="text-xs text-zinc-400">Adım {idx + 1}</div>
              <div className="mt-2 text-lg font-semibold">{x}</div>
              <div className="mt-2 text-sm text-zinc-300">Kısa, net, takip edilebilir ilerleyiş.</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="sss" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold">SSS</h2>
        <div className="mt-6 grid gap-3">
          {[
            ["Teslim süresi ne kadar?", "Genelde 7–14 gün. İçerik ve sayfa sayısına göre netleştiriyoruz."],
            ["Revizyon var mı?", "Pakete göre değişir. Profesyonel pakette 3 revizyon var."],
            ["Bakım paketi neleri kapsar?", "Güncellemeler, yedek, hız/SEO kontrol ve öncelikli destek içerir."],
          ].map(([q, a]) => (
            <details key={q} className="rounded-2xl border border-white/10 bg-[#161A22] p-5">
              <summary className="cursor-pointer text-sm font-medium text-zinc-200">{q}</summary>
              <p className="mt-3 text-sm text-zinc-300">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="iletisim" className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-3xl border border-white/10 bg-[#161A22] p-6 md:p-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">İletişim</h2>
              <p className="mt-2 text-zinc-300">WhatsApp veya e-posta ile hızlıca ulaş.</p>

              <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-200">
                <a
                  className="inline-flex items-center gap-2 hover:text-white"
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
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
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-green-500/30 hover:bg-green-400"
              >
                <WhatsAppIcon />
                WhatsApp’tan Yaz
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:border-white/25"
              >
                E-posta Gönder
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} 
      </footer>

      {/* Fixed WhatsApp button (ikonlu) */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 hover:bg-green-400"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>

      {/* Purchase Panel (Satın Al -> WhatsApp / E-posta daha göze çarpsın) */}
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

function PlanCard({ plan, onBuy }: { plan: Plan; onBuy: () => void }) {
  return (
    <div
      className={[
        "relative rounded-3xl border bg-[#161A22] p-6 transition hover:-translate-y-1",
        plan.highlight ? "border-blue-500/40 shadow-lg shadow-blue-500/10" : "border-white/10",
      ].join(" ")}
    >
      {plan.badge && (
        <div className="absolute right-5 top-5 rounded-full bg-red-600/15 px-3 py-1 text-xs text-red-300">
          {plan.badge}
        </div>
      )}

      <div className="text-lg font-semibold">{plan.title}</div>

      <div className="mt-3">
        <div className="text-sm text-zinc-400 line-through">{plan.oldPrice}</div>
        <div className="text-3xl font-semibold text-white">{plan.price}</div>
        <div className="mt-1 text-xs text-green-400">%50 İndirim • Sınırlı Süre</div>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-zinc-300">
        {plan.items.map((x) => (
          <li key={x}>• {x}</li>
        ))}
      </ul>

      {/* 1) Satın Al: premium panel açar */}
      <button
        onClick={onBuy}
        className={[
          "mt-6 inline-flex w-full justify-center rounded-2xl px-4 py-3 text-sm font-medium transition",
          plan.highlight
            ? "bg-white text-zinc-950 hover:bg-zinc-200"
            : "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500",
        ].join(" ")}
      >
        Satın Al
      </button>

      {/* 2) Diğer seçenek: WhatsApp’tan yaz */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:border-white/20 hover:bg-white/10"
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
      {/* Backdrop */}
      <motion.button
        aria-label="Kapat"
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Drawer */}
      <motion.aside
        className="fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l border-white/10 bg-[#0F1115] p-6"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-zinc-400">Satın Alma</div>
            <div className="mt-1 text-xl font-semibold">
              {planTitle ? planTitle : "Paket Seçimi"}
            </div>
            {price && <div className="mt-1 text-sm text-zinc-300">Fiyat: {price}</div>}
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 hover:bg-white/10"
          >
            Kapat
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#161A22] p-5">
          <div className="text-sm font-medium text-zinc-200">Hızlı seçenekler</div>
          <p className="mt-2 text-sm text-zinc-300">
            En hızlı yol WhatsApp. İstersen e-posta ile de başlatabiliriz.
          </p>

          <div className="mt-4 grid gap-3">
            {/* WhatsApp primary (çok dikkat çeksin) */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 hover:bg-green-400"
            >
              <WhatsAppIcon />
              WhatsApp ile Satın Al
            </a>

            {/* Email secondary */}
            <a
              href={mailtoLink}
              className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-100 hover:border-white/20 hover:bg-white/10"
            >
              E-posta ile Satın Al
            </a>
          </div>
        </div>

        <div className="mt-6 text-xs text-zinc-500">
          Not: Satın alma; brief → ödeme → teslim şeklinde ilerler.
        </div>
      </motion.aside>
    </>
  );
}
