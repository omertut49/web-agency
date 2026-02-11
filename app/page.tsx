"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="font-semibold tracking-tight">NovaWeb</div>
        <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
          <a className="hover:text-white" href="#paketler">Paketler</a>
          <a className="hover:text-white" href="#portfoy">Portföy</a>
          <a className="hover:text-white" href="#surec">Süreç</a>
          <a className="hover:text-white" href="#sss">SSS</a>
        </nav>
        <a
          href="#teklif"
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
        >
          Teklif Al
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-semibold leading-tight md:text-6xl"
            >
              Tasarla. Sat. Yayınla.
              <span className="block text-zinc-300">
                Premium web siteleri 7–14 günde.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-xl text-zinc-300"
            >
              Hazır paketler + hızlı brief + modern animasyonlar.
              İşinizi büyüten, güven veren bir siteyi kurup canlıya alıyoruz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#paketler"
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
              >
                Paketleri Gör
              </a>
              <a
                href="#portfoy"
                className="rounded-full border border-zinc-700 px-5 py-3 text-sm font-medium text-white hover:border-zinc-500"
              >
                İşleri İncele
              </a>
            </motion.div>

            <div className="mt-8 flex gap-6 text-xs text-zinc-400">
              <span>⚡ Hızlı teslim</span>
              <span>🧠 SEO altyapısı</span>
              <span>🛠️ Destek</span>
            </div>
          </div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6"
          >
            <div className="rounded-2xl bg-gradient-to-br from-zinc-800/60 to-zinc-900 p-6">
              <div className="text-sm text-zinc-300">Örnek Dashboard</div>
              <div className="mt-4 grid gap-3">
                <div className="h-10 rounded-xl bg-zinc-800/60" />
                <div className="h-10 rounded-xl bg-zinc-800/60" />
                <div className="h-24 rounded-xl bg-zinc-800/60" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="paketler" className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-semibold">Paketler</h2>
        <p className="mt-2 text-zinc-300">En çok satılan 3 paket.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { name: "Başlangıç", price: "₺7.500", items: ["Tek sayfa", "Temel SEO", "1 revizyon"] },
            { name: "Profesyonel", price: "₺15.000", items: ["5 sayfa", "İleri SEO", "3 revizyon"] },
            { name: "Kurumsal", price: "₺25.000", items: ["10+ sayfa", "Blog", "Sınırsız revizyon (2 hafta)"] },
          ].map((p) => (
            <div key={p.name} className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="mt-2 text-3xl font-semibold">{p.price}</div>
              <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                {p.items.map((x) => <li key={x}>• {x}</li>)}
              </ul>
              <a
                href="#teklif"
                className="mt-6 inline-flex w-full justify-center rounded-2xl bg-white px-4 py-3 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
              >
                Satın Al / Teklif Al
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="teklif" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-10">
          <h2 className="text-2xl font-semibold">Kısa Brief</h2>
          <p className="mt-2 text-zinc-300">İş türü + hedef + bütçe. 1 dakikada.</p>

          <form className="mt-6 grid gap-3 md:grid-cols-2">
            <input className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" placeholder="İsim" />
            <input className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" placeholder="E-posta" />
            <input className="md:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" placeholder="Ne tür site? (ajans, e-ticaret, portföy...)" />
            <textarea className="md:col-span-2 min-h-[120px] rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" placeholder="Kısaca hedefin ve istediğin sayfalar" />
            <button className="md:col-span-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-zinc-950 hover:bg-zinc-200">
              Gönder
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-zinc-900 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} NovaWeb — Web Tasarım & Geliştirme
      </footer>
    </main>
  );
}
