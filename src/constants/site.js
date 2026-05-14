export const siteUrl =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ||
  "https://ismatullaev.uz";

export const authorName = "Khojiakbar Ismatullaev";
export const authorFirstName = "Khojiakbar";
export const authorLocation = "Namangan, Uzbekistan";
export const authorRole = "Full Stack Web Developer";
export const authorEmail = "contact@ismatullaevx.dev";

export const myGithub = "https://github.com/ismatullaevx";

export const siteMetadata = {
  title: `${authorName} | Full Stack Web Developer Portfolio`,
  titleTemplate: `%s | ${authorName}`,
  description:
    "Portfolio of Khojiakbar Ismatullaev, a full stack web developer from Uzbekistan building performant React, Vue, Symfony, PHP, Node.js and Tailwind CSS applications.",
  keywords: [
    "Khojiakbar Ismatullaev",
    "Full Stack Developer",
    "React Developer",
    "Vue Developer",
    "Symfony Developer",
    "PHP Developer",
    "Node.js Developer",
    "Tailwind CSS",
    "Web Developer Uzbekistan",
    "Portfolio",
    "PowerMap",
    "WaterMap",
  ],
  image: `${siteUrl}/social/og-image.png`,
  url: siteUrl,
  locale: "en_US",
  type: "website",
  twitterCard: "summary_large_image",
};
