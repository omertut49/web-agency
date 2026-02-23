import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "905456952696";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

type Product = {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  demoUrl?: string;
  tags: string[];
  features: string[];
  delivery: string;
  includes: string[];
  notIncludes: string[];
  faqs: { q: string; a: string }[];
};

type PlanKey = "basic" | "pro" | "corp";

const PLANS: Record<
  PlanKey,
  { title: string; price: string; desc: string; bullets: string[]; badge?: string }
> = {
  basic: {
    title: "Başlangıç",
    price: "₺3.750",
    desc: "Tek sayfa, hızlı çıkış",
    bullets: ["Tek sayfa", "Temel SEO", "1 revizyon"],
  },
  pro: {
    title: "Profesyonel",
    price: "₺7.500",
    desc: "En çok tercih edilen",
    bullets: ["5 sayfa", "İleri SEO", "3 revizyon"],
    badge: "En Çok Tercih Edilen",
  },
  corp: {
    title: "Kurumsal",
    price: "₺12.500",
    desc: "Büyük ölçek / blog",
    bullets: ["10+ sayfa", "Blog", "2 hafta destek"],
  },
};

const PRODUCTS: Product[] = [
  {
    slug: "file",
    title: "Dosya / Kurumsal Şablon",
    subtitle: "Kurumsal / Landing / hızlı teslim",
    cover: "/file.svg",
    demoUrl: "https://example-demo.vercel.app",
    tags: ["Kurumsal", "Hızlı", "SEO-ready"],
    features: ["Mobil uyum", "Hız optimizasyonu", "Temel SEO", "WhatsApp CTA + iletişim"],
    delivery: "7–14 gün",
    includes: ["Tasarım + geliştirme", "Responsive", "Temel SEO", "Yayın desteği"],
    notIncludes: ["Logo tasarımı", "Profesyonel metin yazımı", "Reklam yönetimi"],
    faqs: [
      { q: "Satın aldıktan sonra süreç nasıl?", a: "Brief → taslak → revizyon → yayın şeklinde ilerler." },
      { q: "Revizyon var mı?", a: "Pakete göre değişir. Profesyonel pakette 3 revizyon var." },
    ],
  },
  {
    slug: "globe",
    title: "Global / Premium Landing",
    subtitle: "Neon premium landing + dönüşüm odaklı",
    cover: "/globe.svg",
    demoUrl: "https://example-demo2.vercel.app",
    tags: ["Landing", "Premium", "Conversion"],
    features: ["Neon premium UI", "Dönüşüm odaklı CTA", "SEO altyapı", "Hızlı satın alma akışı"],
    delivery: "7–14 gün",
    includes: ["Tasarım + geliştirme", "Responsive", "Temel SEO", "Yayın desteği"],
    notIncludes: ["Ödeme sistemi", "Blog (ek paket)"],
    faqs: [
      { q: "Demo linki var mı?", a: "Evet, üstte Canlı Demo butonundan açabilirsin." },
      { q: "Fiyat neye göre değişiyor?", a: "Sayfa sayısı ve ek paketlere göre değişir." },
    ],
  },
  {
    slug: "next",
    title: "Next.js Ajans Şablonu",
    subtitle: "Performans + SEO + modern yapı",
    cover: "/next.svg",
    demoUrl: "https://example-demo3.vercel.app",
    tags: ["Next.js", "Performans", "SEO"],
    features: ["App Router", "Hızlı yükleme", "SEO altyapısı", "Ölçeklenebilir yapı"],
    delivery: "7–14 gün",
    includes: ["Tasarım + geliştirme", "Responsive", "Temel SEO"],
    notIncludes: ["İçerik üretimi", "Çok dil (ek paket)"],
    faqs: [{ q: "Hosting/domain yardımcı oluyor musun?", a: "Evet, kurulum ve yönlendirmede yardımcı olurum." }],
  },
  {
    slug: "vercel",
    title: "Vercel Yayınlı Demo",
    subtitle: "Hızlı yayın + güçlü performans",
    cover: "/vercel.svg",
    demoUrl: "https://example-demo4.vercel.app",
    tags: ["Deploy", "Speed", "Vercel"],
    features: ["Vercel deploy", "Performans optimizasyonu", "SEO altyapısı"],
    delivery: "5–10 gün",
    includes: ["Deploy + config", "Responsive", "Temel SEO"],
    notIncludes: ["Ödeme sistemi"],
    faqs: [{ q: "Teslim sonrası destek var mı?", a: "Evet, teslim sonrası 14 gün hızlı destek." }],
  },
  {
    slug: "window",
    title: "Ürün Tanıtım Landing",
    subtitle: "Ürününü anlatan premium sayfa",
    cover: "/window.svg",
    demoUrl: "https://example-demo5.vercel.app",
    tags: ["SaaS", "Ürün", "Landing"],
    features: ["Feature blokları", "SSS + CTA", "Premium vitrin"],
    delivery: "7–14 gün",
    includes: ["Tasarım + geliştirme", "Responsive", "Temel SEO"],
    notIncludes: ["Blog", "Ödeme sistemi"],
    faqs: [{ q: "Hangi sektörlere uygun?", a: "SaaS, danışmanlık, ürün tanıtımı ve hizmet siteleri." }],
  },
];

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

function isPlanKey(x: unknown): x is PlanKey {
  return x === "basic" || x === "pro" || x === "corp";
}

function planHref(slug: string, plan: PlanKey) {
  return `/urun/${slug}?plan=${plan}`;
}

export default function ProductPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const product = getProduct(params.slug);

  if (!product) {
    return (
      <main className="min-h-screen text-zinc-100 neon-bg neon-noise neon-vignette">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 ring-1 ring-white/5">
            <h1 className="text-2xl font-semibold">Ürün bulunamadı</h1>
            <p className="mt-2 text-zinc-300">Portföye dönüp başka bir şablon seçebilirsin.</p>
            <Link
              href="/#portfoy"
              className="mt-6 inline-flex rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
            >
              Portföye Dön
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const rawPlan = searchParams?.plan;
  const planParam = Array.isArray(rawPlan) ? rawPlan[0] : rawPlan;
  const selectedPlan: PlanKey = isPlanKey(planParam) ? planParam : "pro";
  const plan = PLANS[selectedPlan];

  const whatsappText = encodeURIComponent(
    `Merhaba WebMarket Pro,

Ürün: ${product.title}
Paket: ${plan.title}
Fiyat: ${plan.price}
Teslim: ${product.delivery}

Not: (İsteklerimi buraya ekliyorum)`
  );
  const whatsappHref = `${WHATSAPP_LINK}?text=${whatsappText}`;

  return (
    <main className="min-h-screen text-zinc-100 neon-bg neon-noise neon-vignette">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold text-white hover:text-zinc-200">
            ← Ana Sayfa
          </Link>

          <div className="flex items-center gap-3">
            {product.demoUrl && (
              <a
                href={product.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
              >
                Canlı Demo
              </a>
            )}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="relative rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white
                         shadow-lg shadow-blue-600/25 ring-1 ring-white/10 hover:opacity-95 transition overflow-hidden"
            >
              <span className="absolute -left-16 top-0 h-full w-24 rotate-12 bg-white/20 blur-md opacity-0 hover:opacity-100 transition" />
              Teklif Al
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          {/* Cover */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 ring-1 ring-white/5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <Image src={product.cover} alt={product.title} fill className="object-contain p-10" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 ring-1 ring-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 ring-1 ring-white/5">
            <div className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-blue-600/12 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

            <h1 className="text-3xl font-semibold tracking-tight">{product.title}</h1>
            <p className="mt-2 text-zinc-300">{product.subtitle}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 ring-1 ring-white/5">
                <div className="text-xs text-zinc-400">Teslim</div>
                <div className="mt-1 text-lg font-semibold text-white">{product.delivery}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 ring-1 ring-white/5">
                <div className="text-xs text-zinc-400">Seçili Paket</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {plan.title} <span className="text-zinc-400 text-sm">({plan.price})</span>
                </div>
              </div>
            </div>

            {/* ✅ Paket Seçimi */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Paket Seç</h2>
                {plan.badge && (
                  <span className="rounded-full bg-red-600/15 px-3 py-1 text-xs text-red-200 ring-1 ring-white/10">
                    {plan.badge}
                  </span>
                )}
              </div>

              <div className="mt-3 grid gap-3">
                {(["basic", "pro", "corp"] as PlanKey[]).map((k) => {
                  const p = PLANS[k];
                  const active = k === selectedPlan;
                  return (
                    <Link
                      key={k}
                      href={planHref(product.slug, k)}
                      className={[
                        "rounded-2xl border p-4 transition ring-1 ring-white/5",
                        active
                          ? "border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-600/10"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {p.title}{" "}
                            <span className="text-zinc-400 font-medium">— {p.desc}</span>
                          </div>
                          <div className="mt-1 text-xs text-zinc-300">{p.bullets.join(" • ")}</div>
                        </div>
                        <div className="text-sm font-semibold text-white">{p.price}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <h2 className="mt-6 text-lg font-semibold">Öne çıkanlar</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {product.features.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 ring-1 ring-white/5">
                <div className="text-sm font-semibold text-white">Dahil</div>
                <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                  {product.includes.map((x) => (
                    <li key={x}>• {x}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 ring-1 ring-white/5">
                <div className="text-sm font-semibold text-white">Dahil değil</div>
                <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                  {product.notIncludes.map((x) => (
                    <li key={x}>• {x}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
                >
                  Canlı Demo
                </a>
              )}

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="relative rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white
                           shadow-lg shadow-blue-600/25 ring-1 ring-white/10 hover:opacity-95 transition overflow-hidden"
              >
                <span className="absolute -left-16 top-0 h-full w-24 rotate-12 bg-white/20 blur-md opacity-0 hover:opacity-100 transition" />
                Teklif Al
              </a>

              <Link
                href="/#portfoy"
                className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/10 transition"
              >
                Portföye Dön
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 ring-1 ring-white/5">
          <h2 className="text-xl font-semibold">Sık Sorulanlar</h2>
          <div className="mt-4 grid gap-3">
            {product.faqs.map((f) => (
              <details key={f.q} className="rounded-2xl border border-white/10 bg-black/25 p-5 ring-1 ring-white/5">
                <summary className="cursor-pointer text-sm font-semibold text-zinc-100">{f.q}</summary>
                <p className="mt-3 text-sm text-zinc-300">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}