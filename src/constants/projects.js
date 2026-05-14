import image from "../assets/image.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import practiceImg from "../assets/Screenshot_2026-04-28_19-07-45.png";

import { myGithub } from "./site.js";

export const projects = [
  {
    name: "PowerMap",
    description:
      "A nationwide monitoring platform designed for the oversight of electrical infrastructure across Uzbekistan, including substations, power lines, and distribution units. The system provides real-time visibility into equipment locations, operational status, and technical metrics. Authorized personnel can track performance indicators, review maintenance histories, and detect critical issues through an interactive digital map. The platform strengthens coordination between regional energy services, improves response times, and supports data-driven decision-making for stable and efficient power distribution.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
      { name: "javaScript", color: "orange-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Vite", color: "blue-text-gradient" },
    ],
    image,
    source_code_link: myGithub,
    app_link: "https://powermap.uz/map",
  },
  {
    name: "WaterMap",
    description:
      "A nationwide monitoring platform designed for the oversight of water infrastructure across Uzbekistan, including water stations, water lines, and distribution units. The system provides real-time visibility into equipment locations, operational status, and technical metrics. Authorized personnel can track performance indicators, review maintenance histories, and detect critical issues through an interactive digital map. The platform strengthens coordination between regional water services, improves response times, and supports data-driven decision-making for stable and efficient water distribution.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
      { name: "javaScript", color: "orange-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Vite", color: "blue-text-gradient" },
    ],
    image: image2,
    source_code_link: myGithub,
    app_link: "https://watermap.uz/map",
  },
  {
    name: "Beaty Point",
    description:
      "Beauty Pint is a modern web platform for showcasing beauty products, including skincare, makeup, and personal care items. It features a clean UI, responsive design, and smooth navigation, allowing users to explore products easily and efficiently.The project highlights strong frontend development skills, with a focus on performance, usability, and scalable interface design.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
      { name: "typescript", color: "orange-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Vite", color: "blue-text-gradient" },
    ],
    image: image3,
    source_code_link: myGithub,
    app_link: "https://cosmetic-nine-wine.vercel.app/",
  },
  {
    name: "Speaking Excellence",
    description:
      "Speaking Excellence is an innovative web platform designed to help users improve their English speaking skills. The platform features interactive exercises, AI-powered feedback, and real-time progress tracking, providing a comprehensive environment for language learning and practice. The project demonstrates strong full-stack development capabilities, with a focus on user engagement, performance, and a seamless learning experience.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
      { name: "javascript", color: "orange-text-gradient" },
      { name: "supabase", color: "green-text-gradient" },
      { name: "Vite", color: "blue-text-gradient" },
    ],
    image: practiceImg,
    source_code_link: myGithub,
    app_link: "https://speaking-for-english.vercel.app/",
  },
];
