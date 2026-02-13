"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";


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

// ✅ Logo seçenekleri (3 adet). Birini seçmek için aşağıdaki `ACTIVE_LOGO` değişkenini 1/2/3 yap.
function LogoMark1() {
  // Minimal “P” hissi veren geometrik icon
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(37,99,235)" stopOpacity="0.9" />
          <stop offset="1" stopColor="rgb(124,58,237)" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="7" fill="url(#g1)" />
      <path
        d="M9 16V8h4.2c1.8 0 3 1.1 3 2.7S15 13.4 13.2 13.4H11.2V16H9Z"
        fill="rgba(255,255,255,0.92)"
      />
    </svg>
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
    const base = "Merhaba Web Pazarı, ";
    if (!selectedPlan) return encodeURIComponent(base + "satın alma hakkında bilgi almak istiyorum.");
    return encodeURIComponent(
      `${base}"${selectedPlan.title}" paketi için satın alma sürecini başlatmak istiyorum. Fiyat: ${selectedPlan.price}`
    );
  }, [selectedPlan]);

  const whatsappBuyLink = `${WHATSAPP_LINK}?text=${whatsappMessage}`;
  const mailSubject = encodeURIComponent("Web Pazarı - Satın Alma");
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
            <span className="text-sm font-semibold tracking-tight">Web Pazarı</span>
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
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-4xl font-semibold leading-tight md:text-6xl"
            >
              Web siten <span className="text-zinc-300">satışa dönüşsün.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-5 max-w-xl text-zinc-300"
            >
              Stratejik tasarım, hızlı teslim ve güçlü dijital konumlandırma.
              7–14 gün içinde yayında.
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

          {/* Right premium preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#161A22] p-6"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
              {/* Browser top bar */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                </div>
                <div className="text-xs text-zinc-400">Örnek Önizleme</div>
              </div>

              {/* Preview surface */}
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <div className="h-28 bg-gradient-to-br from-blue-600/25 via-white/5 to-violet-600/15" />
                <div className="bg-[#0F1115] p-4">
                  <div className="h-3 w-32 rounded bg-white/10" />
                  <div className="mt-3 grid gap-2">
                    <div className="h-8 rounded-lg bg-white/5" />
                    <div className="h-8 rounded-lg bg-white/5" />
                    <div className="h-16 rounded-lg bg-white/5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
          <Link key={it.slug} href={`/portfolio/${it.slug}`} className="block">
            <div className="group rounded-3xl border border-white/10 bg-[#161A22] p-4 cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#0F1115] p-6 border border-white/10 transition duration-500 group-hover:-translate-y-2">
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
          </Link>
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
        © {new Date().getFullYear()} Web Pazarı
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
