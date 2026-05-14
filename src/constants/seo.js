import { authorName, authorRole, myGithub, siteMetadata, siteUrl } from "./site.js";
import { projects } from "./projects.js";

export const seoSections = {
  home: {
    id: "home",
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteUrl,
  },
  about: {
    id: "about",
    title: `About ${authorName} | ${authorRole}`,
    description:
      "Learn about Khojiakbar Ismatullaev, a full stack web developer from Uzbekistan focused on React, Vue, Symfony, PHP and production-ready web experiences.",
    url: `${siteUrl}/#about`,
  },
  projects: {
    id: "projects",
    title: `Projects | ${authorName}`,
    description:
      "Explore full stack portfolio projects by Khojiakbar Ismatullaev, including PowerMap, WaterMap, Beauty Point and Speaking Excellence.",
    url: `${siteUrl}/#projects`,
  },
  contact: {
    id: "contact",
    title: `Contact ${authorName} | Full Stack Developer`,
    description:
      "Contact Khojiakbar Ismatullaev for React, Vue, Symfony, PHP, Node.js and modern web application development work.",
    url: `${siteUrl}/#contact`,
  },
};

export const portfolioStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: authorName,
      jobTitle: authorRole,
      url: siteUrl,
      image: siteMetadata.image,
      sameAs: [myGithub],
      knowsAbout: siteMetadata.keywords,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: `${authorName} Portfolio`,
      url: siteUrl,
      description: siteMetadata.description,
      author: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: "Portfolio projects",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.description,
          url: project.app_link,
          creator: { "@id": `${siteUrl}/#person` },
          keywords: project.tags.map((tag) => tag.name).join(", "),
        },
      })),
    },
  ],
};
