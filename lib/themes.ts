export type ThemeSlug =
  | "eticaret"
  | "klinik"
  | "gayrimenkul"
  | "restoran"
  | "hukuk"
  | "danismanlik";

export type ThemeConfig = {
  slug: ThemeSlug;
  title: string;
  tagline: string;
  category: string;
  image: string;       // /public altındaki görsel yolu
  primaryCta: string;  // demo içindeki ana CTA metni
  sections: { title: string; desc: string }[];
  features: string[];
  stats: { label: string; value: string }[];
};

export const THEMES: Record<ThemeSlug, ThemeConfig> = {
  eticaret: {
    slug: "eticaret",
    title: "NovaShop",
    tagline: "Satış odaklı modern e-ticaret deneyimi.",
    category: "E-Ticaret",
    image: "/portfolio/eticaret.png",
    primaryCta: "Sepete Ekle",
    stats: [
      { label: "Dönüşüm", value: "+%18" },
      { label: "Hız Skoru", value: "95" },
      { label: "SEO", value: "A+" },
    ],
    sections: [
      { title: "Öne Çıkan Ürünler", desc: "Kampanya ve hızlı satın alma akışı." },
      { title: "Güven Blokları", desc: "İade, kargo, güvenli ödeme rozetleri." },
      { title: "Hızlı Checkout", desc: "Minimum adım, maksimum dönüşüm." },
    ],
    features: ["Ürün Grid + Filtre", "Sepet / Checkout", "Kampanya Banner’ları", "Ödeme/İletişim CTA"],
  },

  klinik: {
    slug: "klinik",
    title: "Aurum Clinic",
    tagline: "Güven veren tasarım + randevu dönüşümü.",
    category: "Klinik / Estetik",
    image: "/portfolio/klinik.png",
    primaryCta: "Randevu Al",
    stats: [
      { label: "Lead", value: "+%24" },
      { label: "Güven", value: "5★" },
      { label: "Mobil", value: "Süper" },
    ],
    sections: [
      { title: "Hizmetler", desc: "Net başlıklar, hızlı karar alanları." },
      { title: "Uzman Kadro", desc: "Doktor/ekip tanıtımı güveni artırır." },
      { title: "Öncesi / Sonrası", desc: "Vitrin alanı ile ikna hızlanır." },
    ],
    features: ["Randevu CTA", "Hizmet Sayfaları", "Yorum/Referans", "Harita + İletişim"],
  },

  gayrimenkul: {
    slug: "gayrimenkul",
    title: "Atlas Estate",
    tagline: "İlan vitrinleri + teklif toplayan landing.",
    category: "Gayrimenkul",
    image: "/portfolio/gayrimenkul.png",
    primaryCta: "Teklif Al",
    stats: [
      { label: "Talep", value: "+%31" },
      { label: "İlan", value: "120+" },
      { label: "Hız", value: "93" },
    ],
    sections: [
      { title: "Popüler İlanlar", desc: "Kart yapısı ile hızlı göz taraması." },
      { title: "Filtre Alanı", desc: "Fiyat / oda / konum gibi filtreler." },
      { title: "Teklif Formu", desc: "WhatsApp + form ile lead topla." },
    ],
    features: ["İlan Kartları", "Filtre UI", "WhatsApp Lead", "Bölge Vitrini"],
  },

  restoran: {
    slug: "restoran",
    title: "Noir Bistro",
    tagline: "Menü + rezervasyon + premium vitrin.",
    category: "Restoran / Kafe",
    image: "/portfolio/restoran.png",
    primaryCta: "Rezervasyon",
    stats: [
      { label: "Rezervasyon", value: "+%22" },
      { label: "Harita", value: "1 tık" },
      { label: "Menu", value: "Hızlı" },
    ],
    sections: [
      { title: "İmza Lezzetler", desc: "Öne çıkan menü alanları." },
      { title: "Atmosfer", desc: "Fotoğraf vitrinleri ile premium his." },
      { title: "Rezervasyon CTA", desc: "Tek ekranda karar + aksiyon." },
    ],
    features: ["Menü Bölümü", "Rezervasyon CTA", "Konum/Harita", "Instagram Vitrini"],
  },

  hukuk: {
    slug: "hukuk",
    title: "Lex & Co",
    tagline: "Kurumsal, güven veren, net iletişim.",
    category: "Hukuk Bürosu",
    image: "/portfolio/hukuk.png",
    primaryCta: "Danışma Talebi",
    stats: [
      { label: "Güven", value: "A+" },
      { label: "Kurumsal", value: "Pro" },
      { label: "İletişim", value: "Hızlı" },
    ],
    sections: [
      { title: "Uzmanlık Alanları", desc: "Hizmet listesi net ve düzenli." },
      { title: "Ekip", desc: "Profesyonel tanıtım güveni artırır." },
      { title: "İletişim", desc: "WhatsApp + form dönüşümü yükseltir." },
    ],
    features: ["Hizmet Alanları", "Ekip Tanıtımı", "Referans Alanı", "Hızlı İletişim CTA"],
  },

  danismanlik: {
    slug: "danismanlik",
    title: "Pulse Consulting",
    tagline: "Teklif toplayan landing + güçlü süreç.",
    category: "Danışmanlık",
    image: "/portfolio/danismanlik.png",
    primaryCta: "Teklif İste",
    stats: [
      { label: "Dönüşüm", value: "+%19" },
      { label: "İkna", value: "Yüksek" },
      { label: "Mobil", value: "Akıcı" },
    ],
    sections: [
      { title: "Çözüm Paketleri", desc: "Hedefe göre seçenekler." },
      { title: "Süreç", desc: "Adım adım güven veren akış." },
      { title: "Başarı Hikayeleri", desc: "Referans ile ikna artar." },
    ],
    features: ["Teklif CTA", "Süreç Bölümü", "Referans/Yorum", "Sık Sorulanlar"],
  },
};

export const THEME_LIST = Object.values(THEMES);

export function isThemeSlug(x: string): x is ThemeSlug {
  return x in THEMES;
}