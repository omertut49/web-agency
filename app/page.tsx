"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedLogo from "./components/AnimatedLogo";
import Reveal from "./components/Reveal";
import PremiumCard from "./components/PremiumCard";
import MagneticButton from "./components/MagneticButton";
import { THEMES, ThemeSlug } from "@/lib/themes";

const WHATSAPP_NUMBER = "905456952696";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/5">
      {children}
    </span>
  );
}

export default function HomePage() {
  const msg = encodeURIComponent(
    `Merhaba WebMarket Pro,\n\nSatış odaklı bir web sitesi için teklif almak istiyorum.`
  );

  const themes = Object.values(THEMES);

  return (
    <main className="min-h-screen neon-bg neon-noise neon-vignette relative text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <AnimatedLogo />
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Chip>Funnel</Chip>
            <Chip>Premium</Chip>
            <Chip>Hızlı Teslim</Chip>
          </div>

          <MagneticButton
            href={`${WHATSAPP_LINK}?text=${msg}`}
            className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-white/10 hover:opacity-95"
          >
            WhatsApp Teklif
          </MagneticButton>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-10">
        <Reveal>
          <div className="card soft-ring rounded-3xl p-7 sm:p-10">
            <div className="glow-line" />
            <h1 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight">
              Web siteni sadece güzel değil, <span className="text-zinc-300">satış getiren</span> funnel’a çeviriyoruz.
            </h1>
            <p className="mt-4 text-zinc-300 max-w-2xl">
              Demo → Paket → WhatsApp/Ödeme → Follow-up. Hedef: dönüşüm.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <MagneticButton
                href="#demos"
                className="px-5 py-2.5 text-sm font-semibold border border-white/12 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
              >
                Demolara Bak
              </MagneticButton>

              <MagneticButton
                href={`${WHATSAPP_LINK}?text=${msg}`}
                className="px-5 py-2.5 text-sm font-semibold bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-400"
              >
                10dk Ücretsiz Analiz
              </MagneticButton>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <PremiumCard title="Hız" desc="PageSpeed + SEO odaklı yapı." />
              <PremiumCard title="Güven" desc="Referans + rozet + süreç anlatımı." />
              <PremiumCard title="Dönüşüm" desc="Net CTA + plan seçimi + WhatsApp." />
            </div>
          </div>
        </Reveal>

        <div id="demos" className="mt-10">
          <Reveal delay={0.05}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-sm text-zinc-400">Canlı mini site demoları</div>
                <h2 className="text-2xl sm:text-3xl font-semibold mt-1">Sektör seç, demo incele</h2>
              </div>
              <Link
                className="text-sm text-zinc-300 hover:text-white"
                href={`${WHATSAPP_LINK}?text=${msg}`}
                target="_blank"
              >
                Hemen teklif →
              </Link>
            </div>
          </Reveal>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((t, i) => (
              <Reveal key={t.slug} delay={0.06 + i * 0.03}>
                <Link href={`/demo/${t.slug}`} className="block card soft-ring rounded-3xl overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <Image src={t.image} alt={t.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-sm font-semibold">{t.title}</div>
                      <div className="text-xs text-zinc-300">{t.category}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-zinc-300">{t.tagline}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 card soft-ring rounded-3xl p-6 sm:p-8">
            <div className="text-sm font-semibold">Satış Funnel Akışı</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-4 text-sm text-zinc-300">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">1) Landing</div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">2) Demo</div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">3) Paket/Ürün</div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">4) WhatsApp/Ödeme</div>
            </div>

            <div className="mt-5 flex gap-2 flex-col sm:flex-row">
              <MagneticButton
                href={`${WHATSAPP_LINK}?text=${msg}`}
                className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-white/10 hover:opacity-95"
              >
                Teklif Al
              </MagneticButton>
              <MagneticButton
                href="#demos"
                className="px-5 py-2.5 text-sm font-semibold border border-white/12 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
              >
                Demo seç
              </MagneticButton>
            </div>
          </div>
        </Reveal>

        <footer className="mt-12 pb-10 text-xs text-zinc-500">
          © {new Date().getFullYear()} WebMarket Pro — Satış odaklı premium web tasarım.
        </footer>
      </section>
    </main>
  );
}