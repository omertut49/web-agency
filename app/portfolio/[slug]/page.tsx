import { notFound } from "next/navigation";
import Image from "next/image";

const portfolioData: Record<string, { title: string; image: string; desc: string }> = {
  eticaret: {
    title: "E-Ticaret Sitesi",
    image: "/portfolio/eticaret.png",
    desc: "Modern ürün vitrinleri ve yüksek dönüşüm odaklı tasarım.",
  },
  klinik: {
    title: "Klinik Web Sitesi",
    image: "/portfolio/klinik.png",
    desc: "Hasta güveni odaklı, sade ve profesyonel arayüz.",
  },
  gayrimenkul: {
    title: "Gayrimenkul Sitesi",
    image: "/portfolio/gayrimenkul.png",
    desc: "İlan filtreleme ve güçlü görsel sunum altyapısı.",
  },
  restoran: {
    title: "Restoran Sitesi",
    image: "/portfolio/restoran.png",
    desc: "Menü, rezervasyon ve premium sunum deneyimi.",
  },
  hukuk: {
    title: "Hukuk Bürosu",
    image: "/portfolio/hukuk.png",
    desc: "Güven veren kurumsal yapı ve referans alanları.",
  },
  danismanlik: {
    title: "Danışmanlık / Ajans",
    image: "/portfolio/danismanlik.png",
    desc: "Ajans kimliği ve stratejik konumlandırma tasarımı.",
  },
};

export default function PortfolioDetail({
  params,
}: {
  params: { slug: string };
}) {
  const data = portfolioData[params.slug];

  if (!data) return notFound();

  return (
    <main className="min-h-screen bg-[#0F1115] text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold">{data.title}</h1>
        <p className="mt-4 text-zinc-400">{data.desc}</p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#161A22] p-6">
          <Image
            src={data.image}
            alt={data.title}
            width={1200}
            height={800}
            className="w-full rounded-2xl object-cover"
          />
        </div>

        <div className="mt-10">
          <a
            href="https://wa.me/905456952696"
            target="_blank"
            className="rounded-full bg-green-500 px-6 py-3 font-semibold hover:bg-green-400"
          >
            Bu Tasarıma Benzer Site İstiyorum
          </a>
        </div>
      </div>
    </main>
  );
}
