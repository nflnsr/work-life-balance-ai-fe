const BASE_URL = "https://worklifebalance-ai.tech";

const SEO_CONFIG = {
  siteName: "Work-life Balance AI",
  siteUrl: "https://worklifebalance-ai.tech",
  defaultTitle: "Work-life Balance AI | Platform AI Keseimbangan Kerja-Hidup",
  defaultDescription:
    "Platform AI untuk keseimbangan kerja-hidup yang membantu Anda melacak, menganalisis, dan meningkatkan work-life balance dengan layanan personalisasi berbasis kecerdasan buatan.",
  defaultImage: "/assets/og-wlb.png",
  twitterHandle: "@worklifebalanceai",
  locale: "id_ID",
  themeColor: "#14b8a6",
  author: {
    name: "Naufal Nasrullah",
    url: "https://linkedin.com/in/naufalnn/",
  },
} as const;

const PAGE_KEYWORDS = {
  home: [
    "work-life balance ai",
    "keseimbangan kerja hidup",
    "ai productivity platform",
    "work life balance indonesia",
    "aplikasi keseimbangan kerja",
    "ai wellness",
    "burnout prevention",
    "stress management",
  ],
  login: [
    "login work-life balance",
    "masuk akun wlb",
    "sign in keseimbangan kerja",
  ],
  signup: [
    "daftar work-life balance ai",
    "registrasi gratis",
    "buat akun wlb",
    "sign up free",
  ],
  dashboard: [
    "dashboard work-life balance",
    "tracking aktivitas",
    "work life score",
    "ai recommendations",
  ],
} as const;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Work-life Balance AI",
  alternateName: ["WLB AI", "Work Life Balance AI", "WorkLife Balance AI"],
  url: BASE_URL,
  logo: `${BASE_URL}/icon.png`,
  description:
    "Platform AI untuk membantu pengguna mencapai keseimbangan kerja-hidup yang optimal melalui layanan personalisasi berbasis kecerdasan buatan.",
  foundingDate: "2024",
  sameAs: [
    "https://linkedin.com/in/naufalnn/",
    "https://instagram.com/naufalnasrullahh",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["Indonesian", "English"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Work-life Balance AI",
  alternateName: "WLB AI",
  url: BASE_URL,
  description:
    "AI-powered platform that helps you track, analyze, and improve your work-life balance for a more fulfilling life.",
  inLanguage: ["en", "id"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Work-life Balance AI",
  operatingSystem: "Web Browser",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Work-Life Balance Tool",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
  description:
    "AI-powered work-life balance platform that helps users track, analyze, and improve their daily routines for optimal productivity and well-being.",
  featureList: [
    "AI-powered schedule analysis",
    "Work-life balance score tracking",
    "Personalized recommendations",
    "Daily activity logging",
    "Progress visualization",
    "Smart notifications",
  ],
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Work-life Balance AI",
  url: BASE_URL,
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  applicationCategory: "HealthApplication",
  operatingSystem: "All",
  permissions: "No special permissions required",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa itu Work-life Balance AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Work-life Balance AI adalah platform berbasis kecerdasan buatan yang membantu Anda melacak, menganalisis, dan meningkatkan keseimbangan kerja-hidup Anda untuk kehidupan yang lebih baik.",
      },
    },
    {
      "@type": "Question",
      name: "What is Work-life Balance AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Work-life Balance AI is an AI-powered platform that helps you track, analyze, and improve your work-life balance for a more fulfilling life.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara menggunakan Work-life Balance AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Daftar akun gratis, isi kuesioner awal, lalu mulai mencatat aktivitas harian Anda. AI kami akan menganalisis pola Anda dan memberikan rekomendasi personal untuk meningkatkan keseimbangan kerja-hidup.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Work-life Balance AI gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Work-life Balance AI dapat digunakan secara gratis dengan fitur dasar yang lengkap untuk membantu Anda mencapai keseimbangan kerja-hidup yang optimal.",
      },
    },
  ],
};

export {
  BASE_URL,
  SEO_CONFIG,
  PAGE_KEYWORDS,
  organizationSchema,
  webApplicationSchema,
  websiteSchema,
  softwareApplicationSchema,
  faqSchema,
};
