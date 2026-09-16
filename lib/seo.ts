import type { Metadata } from "next";

export const siteUrl = "https://www.epitomecreatives.com";
export const siteName = "Epitome Creatives";
export const siteDescription =
  "UK product photography, short-form video and stop-motion for beauty, skincare, wellness and lifestyle brands. Explore the work and enquire about a shoot.";
export const socialImage = {
  url: "/social-preview.jpg",
  width: 1200,
  height: 630,
  alt: "Cupio beauty product photography by Epitome Creatives",
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      locale: "en_GB",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}

export const organization = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/Logo.png`,
  image: `${siteUrl}${socialImage.url}`,
  description: siteDescription,
  email: "hello@epitomecreatives.com",
  sameAs: ["https://www.instagram.com/epitome.creatives/"],
};

export function pageSchema(path: string, name: string, type = "WebPage") {
  const url = `${siteUrl}${path}`;
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": organization["@id"] },
    ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

export function breadcrumbs(path: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
    ],
  };
}
