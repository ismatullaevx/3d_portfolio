/* eslint-disable react-refresh/only-export-components -- SEO uses local head-management helpers */
import { useEffect, useMemo, useState } from "react";
import { authorName, siteMetadata } from "../constants/site.js";
import { portfolioStructuredData, seoSections } from "../constants/seo.js";

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const setStructuredData = (data) => {
  let element = document.getElementById("portfolio-structured-data");

  if (!element) {
    element = document.createElement("script");
    element.id = "portfolio-structured-data";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const getHashSection = () => {
  if (typeof window === "undefined") return "home";

  const hash = window.location.hash.replace("#", "");
  return seoSections[hash] ? hash : "home";
};

const SEO = () => {
  const [activeSection, setActiveSection] = useState(getHashSection);

  const seo = useMemo(
    () => seoSections[activeSection] || seoSections.home,
    [activeSection],
  );

  useEffect(() => {
    const sectionIds = Object.keys(seoSections).filter((id) => id !== "home");
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const handleHashChange = () => setActiveSection(getHashSection());

    window.addEventListener("hashchange", handleHashChange);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection?.target?.id) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.title = seo.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: seo.description,
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: siteMetadata.keywords.join(", "),
    });
    upsertMeta('meta[name="author"]', {
      name: "author",
      content: authorName,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index, follow, max-image-preview:large",
    });

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: seo.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: seo.url,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: siteMetadata.type,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: siteMetadata.image,
    });
    upsertMeta('meta[property="og:image:width"]', {
      property: "og:image:width",
      content: "1200",
    });
    upsertMeta('meta[property="og:image:height"]', {
      property: "og:image:height",
      content: "630",
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: `${authorName} Portfolio`,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: siteMetadata.locale,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: siteMetadata.twitterCard,
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: seo.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: siteMetadata.image,
    });

    upsertLink("canonical", siteMetadata.url);
    setStructuredData(portfolioStructuredData);
  }, [seo]);

  return null;
};

export default SEO;
