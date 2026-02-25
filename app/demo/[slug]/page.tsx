"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { THEMES, ThemeSlug } from "@/lib/themes";

type DemoConfig = {
  title: string;
  tagline: string;
  category: string;
  image: string;
  primaryCta: string;
  sections: { title: string; desc: string }[];
  features: string[];
  stats: { label: string; value: string }[];
};

const DEMOS: Record<ThemeSlug, DemoConfig> = {
  eticaret: {
    ...THEMES.eticaret,
    primaryCta: "Sepete Ekle",
    stats: [
      { label: "Dönüşüm", value: "+%18" },
      { label: "Hız Skoru", value: "95" },
      { label: "SEO", value: "A+" }
    ],
    sections: [
      { title: "Öne Çıkan Ürünler", desc: "Kampanya ve hızlı satın alma akışı." },
      { title: "Güven Blokları", desc: "İade, kargo, güvenli ödeme rozetleri." },
      { title: "Hızlı Checkout", desc: "Minimum adım, maksimum dönüşüm." }
    ],
    features: ["Ürün Grid + Filtre", "Sepet / Checkout", "Kampanya Banner’ları", "Ödeme/İletişim CTA"]
  },
  klinik: {
    ...THEMES.klinik,
    primaryCta: "Randevu Al",
    stats: [
      { label: "Lead", value: "+%24" },
      { label: "Güven", value: "5★" },
      { label: "Mobil", value: "Süper" }
    ],
    sections: [
      { title: "Hizmetler", desc: "Net başlıklar, hızlı karar alanları." },
      { title: "Uzman Kadro", desc: "Doktor/ekip tanıtımı güveni artırır." },
      { title: "Öncesi / Sonrası", desc: "Vitrin alanı ile ikna hızlanır." }
    ],
    features: ["Randevu CTA", "Hizmet Sayfaları", "Yorum/Referans", "Harita + İletişim"]
  },
  gayrimenkul: {
    ...THEMES.gayrimenkul,
    primaryCta: "Teklif Al",
    stats: [
      { label: "Talep", value: "+%31" },
      { label: "İlan", value: "120+" },
      { label: "Hız", value: "93" }
    ],
    sections: [
      { title: "Popüler İlanlar", desc: "Kart yapısı ile hızlı göz taraması." },
      { title: "Filtre Alanı", desc: "Fiyat / oda / konum gibi filtreler." },
      { title: "Teklif Formu", desc: "WhatsApp + form ile lead topla." }
    ],
    features: ["İlan Kartları", "Filtre UI", "WhatsApp Lead", "Bölge Vitrini"]
  },
  restoran: {
    ...THEMES.restoran,
    primaryCta: "Rezervasyon",
    stats: [
      { label: "Rezervasyon", value: "+%22" },
      { label: "Harita", value: "1 tık" },
      { label: "Menü", value: "Hızlı" }
    ],
    sections: [
      { title: "İmza Lezzetler", desc: "Öne çıkan menü alanları." },
      { title: "Atmosfer", desc: "Fotoğraf vitrinleri ile premium his." },
      { title: "Rezervasyon CTA", desc: "Tek ekranda karar + aksiyon." }
    ],
    features: ["Menü Bölümü", "Rezervasyon CTA", "Konum/Harita", "Instagram Vitrini"]
  },
  hukuk: {
    ...THEMES.hukuk,
    primaryCta: "Danışma Talebi",
    stats: [
      { label: "Güven", value: "A+" },
      { label: "Kurumsal", value: "Pro" },
      { label: "İletişim", value: "Hızlı" }
    ],
    sections: [
      { title: "Uzmanlık Alanları", desc: "Hizmet listesi net ve düzenli." },
      { title: "Ekip", desc: "Profesyonel tanıtım güveni artırır." },
      { title: "İletişim", desc: "WhatsApp + form dönüşümü yükseltir." }
    ],
    features: ["Hizmet Alanları", "Ekip Tanıtımı", "Referans Alanı", "Hızlı İletişim CTA"]
  },
  danismanlik: {
    ...THEMES.danismanlik,
    primaryCta: "Teklif İste",
    stats: [
      { label: "Dönüşüm", value: "+%19" },
      { label: "İkna", value: "Yüksek" },
      { label: "Mobil", value: "Akıcı" }
    ],
    sections: [
      { title: "Çözüm Paketleri", desc: "Hedefe göre seçenekler." },
      { title: "Süreç", desc: "Adım adım güven veren akış." },
      { title: "Başarı Hikayeleri", desc: "Referans ile ikna artar." }
    ],
    features: ["Teklif CTA", "Süreç Bölümü", "Referans/Yorum", "Sık Sorulanlar"]
  }
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/5">
      {children}
    </span>
  );
}

function NeonButton({
  children,
  href,
  variant = "primary"
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition";
  const cls =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-white/10 hover:opacity-95"
      : "border border-white/12 bg-white/5 text-white hover:border-white/20 hover:bg-white/10";

  if (href) return <Link href={href} className={`${base} ${cls}`}>{children}</Link>;
  return <button className={`${base} ${cls}`}>{children}</button>;
}

function FakePhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="card soft-ring rounded-[28px] p-3 sm:p-4">
      <div className="rounded-[22px] border border-white/10 bg-black/35 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function DemoHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/35 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="text-sm font-semibold text-white/90 hover:text-white">
          ← WebMarket Pro
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
          <Chip>{title}</Chip>
          <Chip>Mobil Uyumlu</Chip>
          <Chip>Neon Premium</Chip>
        </div>

        <NeonButton href="#cta" variant="primary">
          Teklif Al
        </NeonButton>
      </div>
    </header>
  );
}

function StatsRow({ stats }: { stats: DemoConfig["stats"] }) {
  return (
    <div className="mt-5 grid grid-cols-3 gap-2">
      {stats.map((s) => (
        <div key={s.label} className="card soft-ring rounded-2xl p-3 text-center">
          <div className="text-lg font-semibold">{s.value}</div>
          <div className="mt-1 text-[11px] text-zinc-400">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function SectionGrid({ sections }: { sections: DemoConfig["sections"] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {sections.map((s) => (
        <div key={s.title} className="card soft-ring rounded-2xl p-4">
          <div className="text-sm font-semibold">{s.title}</div>
          <div className="mt-1 text-sm text-zinc-300">{s.desc}</div>
        </div>
      ))}
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <div className="mt-6 card soft-ring rounded-2xl p-4">
      <div className="text-sm font-semibold">Özellikler</div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm text-zinc-300">
        {items.map((x) => (
          <li key={x} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2">
            • {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ECommerceInner({ cfg }: { cfg: DemoConfig }) {
  const products = useMemo(
    () => [
      { name: "Neon Hoodie", price: "₺1.490", tag: "Yeni" },
      { name: "Street Sneaker", price: "₺2.950", tag: "Popüler" },
      { name: "Minimal Watch", price: "₺3.250", tag: "%20" },
      { name: "Tech Backpack", price: "₺1.980", tag: "Trend" }
    ],
    []
  );

  const [cart, setCart] = useState(0);

  return (
    <div className="p-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-violet-600/12" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">{cfg.title}</div>
            <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-zinc-200">
              Sepet: <span className="font-semibold">{cart}</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-zinc-300">{cfg.tagline}</div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {products.map((p) => (
              <button
                key={p.name}
                onClick={() => setCart((c) => c + 1)}
                className="text-left rounded-2xl border border-white/10 bg-black/25 p-3 hover:bg-white/5 transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold">{p.name}</div>
                  <span className="text-[11px] rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-zinc-200">
                    {p.tag}
                  </span>
                </div>
                <div className="mt-1 text-xs text-zinc-400">{p.price}</div>
                <div className="mt-3 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1 text-[11px] font-semibold text-white">
                  {cfg.primaryCta}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <FeatureList items={cfg.features} />
    </div>
  );
}

function GenericInner({ cfg }: { cfg: DemoConfig }) {
  return (
    <div className="p-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="relative aspect-[16/9]">
          <Image src={cfg.image} alt={cfg.title} fill className="object-cover" sizes="100vw" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-lg font-semibold">{cfg.title}</div>
            <div className="text-xs text-zinc-300">{cfg.tagline}</div>
          </div>
        </div>
        <div className="p-4">
          <FeatureList items={cfg.features} />
        </div>
      </div>
    </div>
  );
}

export default function DemoPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as ThemeSlug;
  const cfg = DEMOS[slug];
  if (!cfg) return notFound();

  const WHATSAPP_NUMBER = "905456952696";
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
  const message = encodeURIComponent(
    `Merhaba WebMarket Pro,\n\n"${cfg.category}" canlı demoyu inceledim (${slug}).\nTeklif almak istiyorum.`
  );

  const inner = slug === "eticaret" ? <ECommerceInner cfg={cfg} /> : <GenericInner cfg={cfg} />;

  return (
    <main className="min-h-screen neon-bg neon-noise neon-vignette relative text-zinc-100">
      <DemoHeader title={cfg.category} />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-10">
        <div className="grid gap-7 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="card soft-ring rounded-3xl p-6 sm:p-8"
          >
            <div className="glow-line" />

            <div className="mt-4 flex flex-wrap gap-2">
              <Chip>Canlı Mini Site</Chip>
              <Chip>Responsive</Chip>
              <Chip>Neon Premium</Chip>
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              {cfg.title} <span className="text-zinc-300">• {cfg.category}</span>
            </h1>
            <p className="mt-3 text-zinc-300">{cfg.tagline}</p>

            <StatsRow stats={cfg.stats} />
            <SectionGrid sections={cfg.sections} />

            <div id="cta" className="mt-7 card soft-ring rounded-2xl p-4">
              <div className="text-sm font-semibold">Teklif & İletişim</div>
              <p className="mt-1 text-sm text-zinc-300">
                Bu demo gerçek bir mini-site örneği. İstersen aynısını markana göre düzenleyip teslim edelim.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <a
                  href={`${WHATSAPP_LINK}?text=${message}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-500/30 hover:bg-green-400 transition"
                >
                  WhatsApp’tan Teklif Al
                </a>

                <Link
                  href={`/urun/${slug}?plan=pro`}
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
                >
                  Paketleri Gör
                </Link>
              </div>
            </div>

            <div className="mt-5 text-xs text-zinc-500">
              İpucu: Her demo içeriğini çoğaltıp “tema mağazası”na çevirebiliriz.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <FakePhoneFrame>{inner}</FakePhoneFrame>
          </motion.div>
        </div>
      </section>
    </main>
  );
}