import { SEO_CONFIG } from "./constants";

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}) {
  const url = `${SEO_CONFIG.siteUrl}${path}`;
  const ogImage = image || SEO_CONFIG.defaultImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SEO_CONFIG.siteName}`,
      description,
      url,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: ogImage.startsWith("http")
            ? ogImage
            : `${SEO_CONFIG.siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: SEO_CONFIG.locale,
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | ${SEO_CONFIG.siteName}`,
      description,
      images: [
        ogImage.startsWith("http")
          ? ogImage
          : `${SEO_CONFIG.siteUrl}${ogImage}`,
      ],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
