"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

import AnimatedLogo from "./components/AnimatedLogo"; // sende app/components altında ise böyle kalsın
// Eğer /components'a taşıdıysan: import AnimatedLogo from "@/components/AnimatedLogo";

import Reveal from "@/components/Reveal";
import PremiumCard from "@/components/PremiumCard";
import MagneticButton from "@/components/MagneticButton";
import { useDrawerA11y } from "@/lib/hooks";

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

const portfolio = [
  { title: "E-Ticaret", slug: "eticaret", file: "/portfolio/eticaret.png" },
  { title: "Klinik", slug: "klinik", file: "/portfolio/klinik.png" },
  { title: "Gayrimenkul", slug: "gayrimenkul", file: "/portfolio/gayrimenkul.png" },
  { title: "Restoran", slug: "restoran", file: "/portfolio/restoran.png" },
  { title: "Hukuk", slug: "hukuk", file: "/portfolio/hukuk.png" },
  { title: "Danışmanlık", slug: "danismanlik", file: "/portfolio/danismanlik.png" },
];

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

function PlanCard({ plan, onBuy }: { plan: Plan; onBuy: () => void }) {
  return (
    <PremiumCard className={plan.highlight ? "border-blue-500/35" : ""}>
      <div className="p-6">
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

        <MagneticButton
          onClick={onBuy}
          className={[
            "mt-6 inline-flex w-full justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition",
            plan.highlight
              ? "bg-white text-zinc-950 hover:bg-zinc-200"
              : "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/20 hover:opacity-95",
          ].join(" ")}
        >
          Satın Al
        </MagneticButton>

        <a
          href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Merhaba WebMarket Pro, "${plan.title}" paketiyle ilgileniyorum.`)}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
        >
          <span className="text-green-400">
            <WhatsAppIcon />
          </span>
          WhatsApp’tan Yaz
        </a>
      </div>
    </PremiumCard>
  );
}

function PurchaseDrawer({
  open,
  onClose,
  planTitle,
  price,
  whatsappLink,
  mailtoLink,
}: {
  open: boolean;
  onClose: () => void;
  planTitle?: string;
  price?: string;
  whatsappLink: string;
  mailtoLink: string;
}) {
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
                <div className="mt-1 text-xl font-semibold">{planTitle ? planTitle : "Paket Seçimi"}</div>
                {price && <div className="mt-1 text-sm text-zinc-300">Fiyat: {price}</div>}
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
              <div className="text-sm font-semibold text-zinc-200">Hızlı seçenekler</div>
              <p className="mt-2 text-sm text-zinc-300">En hızlı yol WhatsApp. İstersen e-posta ile de başlatabiliriz.</p>

              <div className="mt-4 grid gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 hover:bg-green-400 transition"
                >
                  <WhatsAppIcon />
                  WhatsApp ile Satın Al
                </a>

                <a
                  href={mailtoLink}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 hover:border-white/20 hover:bg-white/10 transition"
                >
                  E-posta ile Satın Al
                </a>
              </div>
            </div>

            <div className="mt-6 text-xs text-zinc-500">İpucu: ESC ile kapatabilirsin. Scroll kilitli, kapanınca geri açılır.</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const plans: Plan[] = useMemo(
    () => [
      { id: "basic", title: "Başlangıç", oldPrice: "₺7.500", price: "₺3.750", items: ["Tek sayfa", "Temel SEO", "1 revizyon"], kind: "website" },
      { id: "pro", title: "Profesyonel", oldPrice: "₺15.000", price: "₺7.500", items: ["5 sayfa", "İleri SEO", "3 revizyon"], badge: "En Çok Tercih", highlight: true, kind: "website" },
      { id: "corp", title: "Kurumsal", oldPrice: "₺25.000", price: "₺12.500", items: ["10+ sayfa", "Blog", "21 gün destek"], kind: "website" },
      { id: "maint", title: "Site Bakımı (Aylık)", oldPrice: "₺7.000", price: "₺3.500", items: ["Güncelleme & yedek", "Hız/SEO kontrol", "Öncelikli destek"], badge: "%50 İndirim", kind: "maintenance" },
    ],
    []
  );

  const [featuredIndex, setFeaturedIndex] = useState(0);
  const currentFeatured = portfolio[featuredIndex];

  useEffect(() => {
    const id = setInterval(() => setFeaturedIndex((i) => (i + 1) % portfolio.length), 2800);
    return () => clearInterval(id);
  }, []);

  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const openPurchase = (plan?: Plan) => {
    setSelectedPlan(plan ?? null);
    setPurchaseOpen(true);
  };
  const closePurchase = () => setPurchaseOpen(false);

  const whatsappMessage = useMemo(() => {
    const base = "Merhaba WebMarket Pro, ";
    if (!selectedPlan) return encodeURIComponent(base + "satın alma hakkında bilgi almak istiyorum.");
    return encodeURIComponent(`${base}"${selectedPlan.title}" paketi için satın alma sürecini başlatmak istiyorum. Fiyat: ${selectedPlan.price}`);
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
    <main className="min-h-screen neon-bg neon-noise neon-vignette neon-grid text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4">
          <a href="#" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white/90 hover:text-white">
            <AnimatedLogo />
            <span>
              WEBMARKET <span className="text-blue-400">PRO</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            {nav.map((x) => (
              <a key={x.href} href={x.href} className="hover:text-white">
                {x.label}
              </a>
            ))}
          </nav>

          <MagneticButton
            onClick={() => openPurchase()}
            className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:opacity-95 transition"
          >
            Satın Al
          </MagneticButton>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="card rounded-3xl p-6">
              <div className="text-sm text-zinc-300">Web siten satışa dönüşsün.</div>
              <div className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
                Neon, premium ve <span className="text-zinc-300">dönüşüm odaklı</span> tasarımlar.
              </div>

              <p className="mt-4 text-zinc-300">
                Stratejik tasarım, hızlı teslim ve güçlü dijital konumlandırma. <span className="text-zinc-400">7–14 gün</span> içinde yayında.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#paketler" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition">
                  Paketleri İncele
                </a>
                <a
                  href="#portfoy"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
                >
                  Canlı Demoları Gör
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-300">
                {["50+ Proje", "Mobil Uyum", "SEO Altyapısı", "Sürekli Destek"].map((x) => (
                  <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="card rounded-3xl p-5">
              <div className="glow-line" />
              <div className="mt-4 text-sm text-zinc-300">Öne çıkan demo</div>

              <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeatured.slug}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="relative aspect-[16/10]"
                  >
                    <Image
                      src={currentFeatured.file}
                      alt={`Öne çıkan demo: ${currentFeatured.title}`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">{currentFeatured.title}</div>
                        <div className="text-xs text-zinc-300">Otomatik dönen canlı demo</div>
                      </div>

                      <Link
                        href={`/demo/${currentFeatured.slug}`}
                        className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 hover:opacity-95 transition"
                      >
                        Canlı Aç
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social proof mini */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
        <Reveal>
          <div className="card rounded-3xl p-6 sm:p-8">
            <div className="text-sm text-zinc-300">Birçok sektörde premium vitrin</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["E-Ticaret", "Klinik", "Gayrimenkul", "Restoran", "Hukuk", "Danışmanlık"].map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">
                  {x}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ["Hızlı Teslim", "Brief → tasarım → yayın akışı net."],
                ["Dönüşüm Odaklı", "CTA’lar ve bloklar satış için."],
                ["Premium Görünüm", "Neon ama sofistike."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="mt-1 text-sm text-zinc-300">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Pricing */}
      <section id="paketler" className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <Reveal>
          <div>
            <h2 className="text-2xl font-semibold">Paketler</h2>
            <p className="mt-2 text-zinc-300">Özel indirim aktif. “Satın Al” ile WhatsApp/E-posta üzerinden hemen başla.</p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans
            .filter((p) => p.kind === "website")
            .map((p, i) => (
              <Reveal key={p.id} delay={0.04 * i}>
                <PlanCard plan={p} onBuy={() => openPurchase(p)} />
              </Reveal>
            ))}
        </div>

        <div className="mt-4">
          <Reveal delay={0.05}>
            <PlanCard plan={plans.find((p) => p.kind === "maintenance")!} onBuy={() => openPurchase(plans.find((p) => p.kind === "maintenance")!)} />
          </Reveal>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfoy" className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <Reveal>
          <h2 className="text-2xl font-semibold">Portföy</h2>
          <p className="mt-2 text-zinc-300">Kartlardan canlı demo aç. Mobilde de premium ve akıcı.</p>
        </Reveal>

        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {portfolio.map((it, i) => (
            <Reveal key={it.slug} delay={0.03 * i}>
              <PremiumCard>
                <div className="p-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/40 ring-1 ring-white/5">
                    <Image
                      src={it.file}
                      alt={it.title}
                      fill
                      className="object-cover transition duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  </div>

                  <div className="mt-3 text-sm font-semibold text-zinc-200">{it.title}</div>
                  <div className="mt-1 text-xs text-zinc-400">Kurumsal / Landing / Portföy</div>

                  <div className="mt-4">
                    <Link
                      href={`/demo/${it.slug}`}
                      className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 ring-1 ring-white/10 hover:opacity-95 transition"
                    >
                      Canlı Demo’yu Aç
                    </Link>
                  </div>
                </div>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="surec" className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <Reveal>
          <h2 className="text-2xl font-semibold">Süreç</h2>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {["Keşif", "Tasarım", "Yayın", "Büyüme"].map((x, idx) => (
            <Reveal key={x} delay={0.03 * idx}>
              <PremiumCard>
                <div className="p-5">
                  <div className="text-xs text-zinc-400">Adım {idx + 1}</div>
                  <div className="mt-2 text-lg font-semibold">{x}</div>
                  <div className="mt-2 text-sm text-zinc-300">Kısa, net, takip edilebilir ilerleyiş.</div>
                </div>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="sss" className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <Reveal>
          <h2 className="text-2xl font-semibold">SSS</h2>
        </Reveal>

        <div className="mt-6 grid gap-3">
          {[
            ["Teslim süresi ne kadar?", "Genelde 7–14 gün. İçerik ve sayfa sayısına göre netleştiriyoruz."],
            ["Revizyon var mı?", "Pakete göre değişir. Profesyonel pakette 3 revizyon var."],
            ["Bakım paketi neleri kapsar?", "Güncellemeler, yedek, hız/SEO kontrol ve öncelikli destek içerir."],
          ].map(([q, a], i) => (
            <Reveal key={q} delay={0.03 * i}>
              <details className="card rounded-2xl p-5 premium-hover">
                <summary className="cursor-pointer text-sm font-semibold text-zinc-200">{q}</summary>
                <p className="mt-3 text-sm text-zinc-300">{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="iletisim" className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <Reveal>
          <div className="card rounded-3xl p-6 sm:p-10">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
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
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Merhaba WebMarket Pro, teklif almak istiyorum.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-green-500/30 hover:bg-green-400 transition"
                >
                  <WhatsAppIcon />
                  WhatsApp’tan Yaz
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 hover:border-white/25 hover:bg-white/10 transition"
                >
                  E-posta Gönder
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} WebMarket Pro
      </footer>

      {/* Fixed WhatsApp */}
      <a
        href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Merhaba WebMarket Pro, bilgi almak istiyorum.")}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 hover:bg-green-400 transition"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>

      {/* Drawer */}
      <PurchaseDrawer
        open={purchaseOpen}
        onClose={closePurchase}
        planTitle={selectedPlan?.title}
        price={selectedPlan?.price}
        whatsappLink={whatsappBuyLink}
        mailtoLink={mailtoLink}
      />
    </main>
  );
}