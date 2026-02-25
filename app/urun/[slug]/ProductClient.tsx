"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnimatedLogo from "@/app/components/AnimatedLogo";
import { THEMES, ThemeSlug } from "@/src/lib/themes";
import { useDrawerA11y } from "@/app/components/drawerA11y";

const WHATSAPP_NUMBER = "905456952696";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const EMAIL = "tutomer86@gmail.com";

type PlanKey = "basic" | "pro" | "corp";
type AddonKey = "seoPro" | "copy" | "brand" | "speed" | "analytics" | "maintenance";

type Plan = {
  key: PlanKey;
  title: string;
  desc: string;
  oldPrice: number;
  price: number;
  bullets: string[];
  delivery: string;
  support: string;
  highlight?: boolean;
};

type Addon = {
  key: AddonKey;
  title: string;
  desc: string;
  price: number;
  badge?: string;
};

function formatTRY(n: number) {
  const s = Math.round(n).toString();
  const parts: string[] = [];
  for (let i = s.length; i > 0; i -= 3) parts.unshift(s.slice(Math.max(0, i - 3), i));
  return `₺${parts.join(".")}`;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/5">
      {children}
    </span>
  );
}

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

function useCountUp(target: number, durationMs = 650) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = value;
    const diff = target - from;
    if (diff === 0) return;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + diff * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

function PurchaseDrawer({
  open,
  onClose,
  whatsappLink,
  mailtoLink,
  title,
  priceText,
}: {
  open: boolean;
  onClose: () => void;
  whatsappLink: string;
  mailtoLink: string;
  title: string;
  priceText: string;
}) {
  // ✅ ESC + focus restore + scroll lock
  useDrawerA11y({ open, onClose, focusSelector: "#drawer-close" });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Kapat"
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l border-white/10 bg-[#0B0D12] p-6"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-label="Satın alma drawer"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-zinc-400">Satın Alma</div>
                <div className="mt-1 text-xl font-semibold">{title}</div>
                <div className="mt-1 text-sm text-zinc-300">Toplam: {priceText}</div>
              </div>

              <button
                id="drawer-close"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 hover:bg-white/10"
              >
                Kapat
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-zinc-200">Hızlı başlat</div>
              <p className="mt-2 text-sm text-zinc-300">
                WhatsApp en hızlı yol. İstersen e-posta ile de başlatabiliriz.
              </p>

              <div className="mt-4 grid gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 hover:bg-green-400 transition"
                >
                  <WhatsAppIcon /> WhatsApp ile Satın Al
                </a>

                <a
                  href={mailtoLink}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 hover:border-white/20 hover:bg-white/10 transition"
                >
                  E-posta ile Satın Al
                </a>
              </div>
            </div>

            <div className="mt-6 text-xs text-zinc-500">
              İpucu: ESC ile kapatabilirsin. (Scroll kilitli, kapanınca geri açılır.)
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ProductClient({ slug, preselectPlan }: { slug: ThemeSlug; preselectPlan: string }) {
  const cfg = THEMES[slug];
  const themeName = cfg.category;
  const heroImg = cfg.image;

  const plans: Plan[] = useMemo(
    () => [
      {
        key: "basic",
        title: "Başlangıç",
        desc: "Hızlı, tek sayfa, satışa yönelik giriş.",
        oldPrice: 7500,
        price: 3750,
        bullets: ["Tek sayfa landing", "Temel SEO", "1 revizyon", "WhatsApp CTA"],
        delivery: "7–10 gün",
        support: "7 gün destek",
      },
      {
        key: "pro",
        title: "Profesyonel",
        desc: "En çok tercih edilen — dönüşüm odaklı paket.",
        oldPrice: 15000,
        price: 7500,
        bullets: ["5 sayfa", "İleri SEO", "3 revizyon", "Hız optimizasyonu", "Lead odaklı CTA’lar"],
        delivery: "7–14 gün",
        support: "14 gün destek",
        highlight: true,
      },
      {
        key: "corp",
        title: "Kurumsal",
        desc: "Büyük içerik + blog + güçlü kurumsal yapı.",
        oldPrice: 25000,
        price: 12500,
        bullets: ["10+ sayfa", "Blog altyapısı", "Form/lead akışı", "Gelişmiş yapılandırma"],
        delivery: "10–18 gün",
        support: "21 gün destek",
      },
    ],
    []
  );

  const addons: Addon[] = useMemo(
    () => [
      { key: "seoPro", title: "SEO Pro", desc: "Detaylı teknik SEO + yapılandırılmış veri.", price: 1900, badge: "Önerilen" },
      { key: "copy", title: "Metin Yazımı", desc: "Satış odaklı içerik: başlıklar + bölümler.", price: 1500 },
      { key: "brand", title: "Logo & Mini Brand", desc: "Logo + renk/typography seti.", price: 2200 },
      { key: "speed", title: "Ultra Hız", desc: "Performans tuning + görsel optimizasyon.", price: 1200 },
      { key: "analytics", title: "Analytics Kurulum", desc: "GA4 + dönüşüm event’leri.", price: 900 },
      { key: "maintenance", title: "Bakım (1 Ay)", desc: "Güncelleme + yedek + öncelikli destek.", price: 3500, badge: "%50 İndirim" },
    ],
    []
  );

  const [planKey, setPlanKey] = useState<PlanKey>("pro");

  // ✅ URL'den plan preselect
  useEffect(() => {
    const p = (preselectPlan || "").toLowerCase();
    if (p === "basic" || p === "pro" || p === "corp") setPlanKey(p);
  }, [preselectPlan]);

  const [selectedAddons, setSelectedAddons] = useState<Record<AddonKey, boolean>>({
    seoPro: true,
    copy: false,
    brand: false,
    speed: true,
    analytics: false,
    maintenance: false,
  });

  const plan = plans.find((p) => p.key === planKey)!;

  const addonsTotal = useMemo(() => addons.reduce((sum, a) => sum + (selectedAddons[a.key] ? a.price : 0), 0), [addons, selectedAddons]);
  const oldTotal = plan.oldPrice + addonsTotal;
  const total = plan.price + addonsTotal;

  const animatedTotal = useCountUp(total, 700);

  const toggleAddon = (k: AddonKey) => setSelectedAddons((prev) => ({ ...prev, [k]: !prev[k] }));

  const selectedAddonTitles = useMemo(() => addons.filter((a) => selectedAddons[a.key]).map((a) => a.title), [addons, selectedAddons]);

  const whatsappText = useMemo(() => {
    const msg = [
      "Merhaba WebMarket Pro,",
      "",
      `Tema: ${themeName} (${slug})`,
      `Plan: ${plan.title}`,
      selectedAddonTitles.length ? `Eklentiler: ${selectedAddonTitles.join(", ")}` : "Eklentiler: Yok",
      `Toplam: ${formatTRY(total)}`,
      "",
      "Satın alma sürecini başlatmak istiyorum.",
      "İsim:",
      "Telefon:",
      "Not:",
    ].join("\n");
    return encodeURIComponent(msg);
  }, [themeName, slug, plan.title, selectedAddonTitles, total]);

  const whatsappBuyLink = `${WHATSAPP_LINK}?text=${whatsappText}`;
  const mailSubject = encodeURIComponent(`WebMarket Pro - ${themeName} Satın Alma`);
  const mailBody = encodeURIComponent(
    [
      "Merhaba,",
      "",
      `Tema: ${themeName} (${slug})`,
      `Plan: ${plan.title}`,
      selectedAddonTitles.length ? `Eklentiler: ${selectedAddonTitles.join(", ")}` : "Eklentiler: Yok",
      `Toplam: ${formatTRY(total)}`,
      "",
      "Satın alma sürecini başlatmak istiyorum.",
      "",
      "İsim:",
      "Telefon:",
      "Not:",
    ].join("\n")
  );
  const mailtoLink = `mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <main className="min-h-screen neon-bg neon-noise neon-vignette text-zinc-100">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <AnimatedLogo />

          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-300">
            <Chip>{themeName}</Chip>
            <Chip>Mobil Uyum</Chip>
            <Chip>Canlı Fiyat</Chip>
          </div>

          <button
            onClick={openDrawer}
            className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:opacity-95 transition"
          >
            Satın Al
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* Left: Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="card rounded-3xl p-4 sm:p-6 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-zinc-400">Tema</div>
                <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
                  {themeName} <span className="text-zinc-400">• {slug}</span>
                </h1>
                <p className="mt-2 text-sm text-zinc-300">
                  Premium neon tasarım • dönüşüm odaklı bileşenler • hızlı teslim.
                </p>
              </div>

              <Link
                href={`/demo/${slug}`}
                className="hidden sm:inline-flex rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
              >
                Canlı Demo →
              </Link>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/35 ring-1 ring-white/5">
              <div className="relative aspect-[16/10]">
                <Image src={heroImg} alt={themeName} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                  <div className="text-xs text-zinc-200">
                    <div className="font-semibold">{themeName}</div>
                    <div className="text-zinc-300">Satış hissi veren UI + güçlü CTA</div>
                  </div>
                  <Link
                    href={`/demo/${slug}`}
                    className="inline-flex sm:hidden rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 hover:opacity-95 transition"
                  >
                    Demo
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-300">
              {["SEO altyapısı", "Mobil uyum", "Hız optimizasyonu", "WhatsApp CTA"].map((x) => (
                <Chip key={x}>{x}</Chip>
              ))}
            </div>
          </motion.div>

          {/* Right: Pricing / Builder */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="card rounded-3xl p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-400">Canlı Hesaplama</div>
                <div className="mt-1 text-lg font-semibold">Plan + Eklentiler</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-400 line-through">{formatTRY(oldTotal)}</div>
                <div className="text-2xl font-semibold">{formatTRY(animatedTotal)}</div>
                <div className="mt-1 text-xs text-green-400">%50 İndirim • Sınırlı Süre</div>
              </div>
            </div>

            {/* Plans */}
            <div className="mt-4 grid gap-3">
              {plans.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPlanKey(p.key)}
                  className={[
                    "text-left rounded-2xl border p-4 transition",
                    p.key === planKey
                      ? "border-blue-500/45 bg-gradient-to-r from-blue-600/15 to-violet-600/10 ring-1 ring-white/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/7",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold">{p.title}</div>
                        {p.highlight && (
                          <span className="rounded-full bg-red-600/15 px-2 py-0.5 text-[11px] text-red-300">
                            En Çok Tercih
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-zinc-300">{p.desc}</div>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-zinc-300">
                        <Chip>Teslim: {p.delivery}</Chip>
                        <Chip>{p.support}</Chip>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-400 line-through">{formatTRY(p.oldPrice)}</div>
                      <div className="text-lg font-semibold">{formatTRY(p.price)}</div>
                    </div>
                  </div>

                  <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-xs text-zinc-300">
                    {p.bullets.map((b) => (
                      <li key={b} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2">
                        • {b}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {/* Addons */}
            <div className="mt-5">
              <div className="text-sm font-semibold">Eklentiler</div>
              <div className="mt-3 grid gap-2">
                {addons.map((a) => {
                  const active = !!selectedAddons[a.key];
                  return (
                    <button
                      key={a.key}
                      onClick={() => toggleAddon(a.key)}
                      className={[
                        "text-left rounded-2xl border p-4 transition flex items-start justify-between gap-3",
                        active
                          ? "border-green-500/40 bg-green-500/10 ring-1 ring-white/10"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/7",
                      ].join(" ")}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-semibold">{a.title}</div>
                          {a.badge && (
                            <span className="rounded-full bg-blue-600/15 px-2 py-0.5 text-[11px] text-blue-200">
                              {a.badge}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-xs text-zinc-300">{a.desc}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-semibold">{formatTRY(a.price)}</div>
                        <div className="mt-1 text-[11px] text-zinc-400">{active ? "Eklendi" : "Ekle"}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="text-sm font-semibold">Hızlı Satın Alma</div>
              <p className="mt-1 text-sm text-zinc-300">Seçimlerin otomatik olarak WhatsApp/E-posta mesajına eklenir.</p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <a
                  href={whatsappBuyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 hover:bg-green-400 transition"
                >
                  <WhatsAppIcon /> WhatsApp ile Satın Al
                </a>
                <a
                  href={mailtoLink}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
                >
                  E-posta ile Satın Al
                </a>
              </div>

              <button
                onClick={openDrawer}
                className="mt-3 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
              >
                Drawer ile Satın Alma (ESC/Focus/Scroll ✅)
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Drawer */}
      <PurchaseDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        whatsappLink={whatsappBuyLink}
        mailtoLink={mailtoLink}
        title={`${themeName} • ${plan.title}`}
        priceText={formatTRY(total)}
      />
    </main>
  );
}