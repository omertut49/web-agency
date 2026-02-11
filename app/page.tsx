"use client";

import { motion } from "framer-motion";

const nav = [
  { label: "Paketler", href: "#paketler" },
  { label: "Portföy", href: "#portfoy" },
  { label: "Süreç", href: "#surec" },
  { label: "SSS", href: "#sss" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0F1115]/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            {/* minimal icon */}
            <span className="inline-block h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500/80 to-violet-500/60" />
            <span className="text-sm font-semibold tracking-tight">Web Pazarı</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            {nav.map((x) => (
              <a key={x.href} href={x.href} className="hover:text-white">
                {x.label}
              </a>
            ))}
          </nav>

          <a
            href="#iletisim"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Teklif Al
          </a>
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
              Stratejik tasarım, hızlı teslim ve güven veren dijital deneyim.
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

          {/* right premium mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#161A22] p-6"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm text-zinc-300">Örnek Önizleme</div>
              <div className="mt-4 grid gap-3">
                <div className="h-10 rounded-xl bg-white/5" />
                <div className="h-10 rounded-xl bg-white/5" />
                <div className="h-24 rounded-xl bg-white/5" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="paketler" className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Paketler</h2>
            <p className="mt-2 text-zinc-300">Net fiyat, net teslim, net süreç.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="Başlangıç" price="₺7.500" items={["Tek sayfa", "Temel SEO", "1 revizyon"]} />
          <Card
            title="Profesyonel"
            price="₺15.000"
            badge="En Çok Tercih Edilen"
            items={["5 sayfa", "İleri SEO", "3 revizyon"]}
            highlight
          />
          <Card title="Kurumsal" price="₺25.000" items={["10+ sayfa", "Blog", "2 hafta destek"]} />
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfoy" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold">Portföy</h2>
        <p className="mt-2 text-zinc-300">Birkaç örnek çalışma.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-[#161A22] p-4">
              <div className="aspect-[16/10] rounded-2xl bg-white/5" />
              <div className="mt-3 text-sm text-zinc-200">Proje #{i + 1}</div>
              <div className="mt-1 text-xs text-zinc-400">Kurumsal / Landing / Portföy</div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="surec" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold">Süreç</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {["Keşif", "Tasarım", "Yayın", "Büyüme"].map((x, idx) => (
            <div key={x} className="rounded-3xl border border-white/10 bg-[#161A22] p-5">
              <div className="text-xs text-zinc-400">Adım {idx + 1}</div>
              <div className="mt-2 text-lg font-semibold">{x}</div>
              <div className="mt-2 text-sm text-zinc-300">
                Kısa, net, takip edilebilir ilerleyiş.
              </div>
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
            ["Domain/hosting alıyor musunuz?", "İstersen yönlendiriyoruz, istersen biz yönetiyoruz."],
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
              <h2 className="text-2xl font-semibold">Teklif Al</h2>
              <p className="mt-2 text-zinc-300">
                Kısa bir brief bırak, aynı gün dönüş yapalım. (WhatsApp da olur)
              </p>
            </div>

            <a
              href="https://wa.me/905456952696"
              className="mt-4 inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:border-white/25 md:mt-0"
            >
              WhatsApp’tan Yaz
            </a>
          </div>

          <form className="mt-6 grid gap-3 md:grid-cols-2">
            <input className="rounded-2xl border border-white/10 bg-[#0F1115] px-4 py-3" placeholder="İsim" />
            <input className="rounded-2xl border border-white/10 bg-[#0F1115] px-4 py-3" placeholder="E-posta" />
            <input className="md:col-span-2 rounded-2xl border border-white/10 bg-[#0F1115] px-4 py-3" placeholder="Ne tür site istiyorsun?" />
            <textarea className="md:col-span-2 min-h-[120px] rounded-2xl border border-white/10 bg-[#0F1115] px-4 py-3" placeholder="Kısaca hedefin / örnek site linki (varsa)" />
            <button className="md:col-span-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-500">
              Gönder
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Web Pazarı
      </footer>
    </main>
  );
}

function Card({
  title,
  price,
  items,
  badge,
  highlight,
}: {
  title: string;
  price: string;
  items: string[];
  badge?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "relative rounded-3xl border bg-[#161A22] p-6",
        highlight ? "border-blue-500/40" : "border-white/10",
      ].join(" ")}
    >
      {badge && (
        <div className="absolute right-5 top-5 rounded-full bg-blue-600/15 px-3 py-1 text-xs text-blue-200">
          {badge}
        </div>
      )}
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-3xl font-semibold">{price}</div>
      <ul className="mt-5 space-y-2 text-sm text-zinc-300">
        {items.map((x) => (
          <li key={x}>• {x}</li>
        ))}
      </ul>
      <a
        href="#iletisim"
        className={[
          "mt-6 inline-flex w-full justify-center rounded-2xl px-4 py-3 text-sm font-medium",
          highlight ? "bg-white text-zinc-950 hover:bg-zinc-200" : "bg-white/5 text-white hover:bg-white/10",
        ].join(" ")}
      >
        Teklif Al
      </a>
    </div>
  );
}
