import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Demo = {
  title: string;
  category: string;
  description: string;
  image: string; // preview image
  bullets: string[];
  stack: string[];
  delivery: string;
  priceHint: string;
};

const DEMOS: Record<string, Demo> = {
  eticaret: {
    title: "E-Ticaret",
    category: "Mağaza / Ürün / Sepet",
    description:
      "Modern ürün vitrinleri, hızlı checkout ve SEO temeliyle satış odaklı e-ticaret arayüzü.",
    image: "/portfolio/eticaret.png",
    bullets: ["Kategori & ürün listeleme", "Sepet / checkout akışı", "Kampanya banner alanları", "SEO altyapısı"],
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    delivery: "7–14 gün",
    priceHint: "₺7.500+",
  },
  klinik: {
    title: "Klinik / Estetik",
    category: "Randevu / Hizmet / Yorum",
    description:
      "Randevu odaklı kurumsal görünüm. Hizmet sayfaları, doktor tanıtımı ve güven veren tasarım.",
    image: "/portfolio/klinik.png",
    bullets: ["Randevu CTA alanları", "Hizmet/uzmanlık sayfaları", "Öncesi-sonrası vitrin", "Güven blokları"],
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    delivery: "7–14 gün",
    priceHint: "₺7.500+",
  },
  gayrimenkul: {
    title: "Gayrimenkul",
    category: "İlan / Filtre / Form",
    description:
      "İlan vitrinleri, filtre alanları ve güçlü bir “teklif al” akışı ile dönüşüm odaklı tasarım.",
    image: "/portfolio/gayrimenkul.png",
    bullets: ["İlan kartları & galeri", "Filtre alanı (tasarımsal)", "Form/WhatsApp lead", "Hızlı yayın yapısı"],
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    delivery: "7–14 gün",
    priceHint: "₺7.500+",
  },
  restoran: {
    title: "Restoran / Kafe",
    category: "Menü / Rezervasyon / Harita",
    description:
      "Menü vurgulu premium görünüm. Rezervasyon CTA ve Instagram-style vitrin alanları.",
    image: "/portfolio/restoran.png",
    bullets: ["Menü vitrin alanı", "Rezervasyon CTA", "Konum & harita", "Etkinlik/duyuru blokları"],
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    delivery: "7–14 gün",
    priceHint: "₺7.500+",
  },
  hukuk: {
    title: "Hukuk Bürosu",
    category: "Kurumsal / Güven / Hizmet",
    description:
      "Güven odaklı, sade ve güçlü kurumsal tasarım. Hizmetler, ekip ve iletişim akışı net.",
    image: "/portfolio/hukuk.png",
    bullets: ["Hizmet sayfaları", "Uzmanlık alanları", "Güven blokları", "Hızlı iletişim"],
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    delivery: "7–14 gün",
    priceHint: "₺7.500+",
  },
  danismanlik: {
    title: "Danışmanlık",
    category: "Kurumsal / Teklif / İçerik",
    description:
      "Teklif toplamaya odaklı landing yapısı. Başarı hikayeleri ve süreç anlatımı güçlü.",
    image: "/portfolio/danismanlik.png",
    bullets: ["Teklif toplayan hero", "Süreç/çözüm blokları", "Referans alanları", "Form/WhatsApp CTA"],
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    delivery: "7–14 gün",
    priceHint: "₺7.500+",
  },
};

function chipClass() {
  return "rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/5";
}

export default function DemoPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { plan?: string };
}) {
  const demo = DEMOS[params.slug];
  if (!demo) return notFound();

  const plan = searchParams?.plan ?? "pro";

  const WHATSAPP_NUMBER = "905456952696";
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
  const message = encodeURIComponent(
    `Merhaba WebMarket Pro,

"${demo.title}" canlı demosunu inceledim.
Plan: ${plan.toUpperCase()}

Teklif almak istiyorum.`
  );

  return (
    <main className="min-h-screen neon-bg neon-noise neon-vignette text-zinc-100">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-white/90 hover:text-white">
            ← Ana Sayfa
          </Link>

          <a
            href={`${WHATSAPP_LINK}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white
                       shadow-lg shadow-blue-600/25 ring-1 ring-white/10 hover:opacity-95 transition"
          >
            WhatsApp’tan Teklif Al
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left info */}
          <div className="card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="glow-line absolute inset-x-0 top-0" />
            <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-blue-600/12 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400 badge-dot" />
              <span className="text-xs text-zinc-300">Canlı Demo • {demo.category}</span>
            </div>

            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              {demo.title} <span className="text-zinc-400">Demo</span>
            </h1>

            <p className="mt-3 text-zinc-300">{demo.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className={chipClass()}>Teslim: {demo.delivery}</span>
              <span className={chipClass()}>Başlangıç: {demo.priceHint}</span>
              <span className={chipClass()}>Plan: {plan.toUpperCase()}</span>
            </div>

            <div className="mt-7 grid gap-3">
              {demo.bullets.map((b) => (
                <div
                  key={b}
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-zinc-200 ring-1 ring-white/5"
                >
                  • {b}
                </div>
              ))}
            </div>

            <div className="mt-7">
              <div className="text-xs text-zinc-400">Teknoloji</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {demo.stack.map((s) => (
                  <span key={s} className={chipClass()}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/urun/${params.slug}?plan=${plan}`}
                className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white
                           shadow-lg shadow-blue-600/25 ring-1 ring-white/10 hover:opacity-95 transition"
              >
                Bu Temayı Satın Al
              </Link>

              <a
                href={`${WHATSAPP_LINK}?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white
                           hover:border-white/20 hover:bg-white/10 transition"
              >
                WhatsApp’tan Yaz
              </a>
            </div>
          </div>

          {/* Right preview */}
          <div className="card rounded-3xl p-4 sm:p-6 relative overflow-hidden">
            <div className="glow-line absolute inset-x-0 top-0" />

            {/* Browser top */}
            <div className="flex items-center justify-between px-2 sm:px-3 py-2">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              </div>

              <div className="text-xs text-zinc-300 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Preview
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/35 ring-1 ring-white/5">
              <div className="relative aspect-[16/10]">
                <Image
                  src={demo.image}
                  alt={demo.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                  <div className="text-sm font-semibold text-white">{demo.title} — Live Preview</div>
                  <div className="text-xs text-zinc-300">
                    Gerçek demoları istersen bunu ayrı Vercel linkleriyle de yayınlayabiliriz.
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
                <div className="text-xs text-zinc-300">
                  <span className="text-zinc-400">Slug:</span> {params.slug}
                </div>
                <Link
                  href={`/urun/${params.slug}?plan=${plan}`}
                  className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white
                             hover:border-white/20 hover:bg-white/10 transition"
                >
                  Detay → Satın Al
                </Link>
              </div>
            </div>

            <div className="mt-4 text-xs text-zinc-400">
              Not: Bu sayfa “canlı demo sunumu”dur. İstersen her demoyu ayrı proje olarak Vercel’e deploy edip
              gerçek interaktif demo da yaparız.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}