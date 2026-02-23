import Link from "next/link";

export default function ProductPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { plan?: string };
}) {
  const plan = searchParams?.plan ?? "pro";
  const WHATSAPP_NUMBER = "905456952696";
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

  const message = encodeURIComponent(
    `Merhaba WebMarket Pro,

"${params.slug}" teması için satın alma sürecini başlatmak istiyorum.
Plan: ${plan.toUpperCase()}`
  );

  return (
    <main className="min-h-screen neon-bg neon-noise neon-vignette text-zinc-100">
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
            WhatsApp ile Satın Al
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="card soft-ring rounded-3xl p-6 sm:p-8">
          <div className="glow-line" />
          <h1 className="mt-4 text-3xl font-semibold">
            Tema: <span className="text-zinc-300">{params.slug}</span>
          </h1>
          <p className="mt-2 text-zinc-300">Plan: {plan.toUpperCase()}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={`${WHATSAPP_LINK}?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white
                         shadow-[0_0_30px_rgba(34,197,94,.35)] ring-1 ring-white/10 hover:bg-green-400 transition text-center"
            >
              WhatsApp’tan Yaz
            </a>

            <Link
              href={`/demo/${params.slug}`}
              className="rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white
                         hover:border-white/20 hover:bg-white/10 transition text-center"
            >
              Demo’ya Dön
            </Link>
          </div>

          <div className="mt-6 text-sm text-zinc-300">
            Satın alma akışı: Brief → ödeme → teslim.
          </div>
        </div>
      </section>
    </main>
  );
}