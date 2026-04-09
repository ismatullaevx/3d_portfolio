import {
    backend,
    creator,
    css,
    cvDuncan,
    docker,
    figma,
    fitnessAdmin,

    git,
    gym,
    html,
    javascript,
    linux,
    mrKhojiakbar,


    meta,
    mobile,
    mongodb,
    myCV,
    personalWebsite,
    php,
    publishArticle,
    reactjs,
    readBook,
    shopify,
    starbucks,
    symfony,
    tailwind,
    tesla,
    tinDog,
    vue,
    web
} from "../assets";
import image from "../assets/image.png";
import image2 from "../assets/image2.png";

export const myGithub = "https://github.com/ismatullaevx";
export const CVDuncan = cvDuncan;
export const MyCV = myCV;

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "projects",
        title: "Projects",
    },
    {
        id: "cv",
        title: "Download CV",
    },
];

const services = [
    {
        title: "Web Developer",
        icon: web,
    },
    {
        title: "Frontend Developer",
        icon: backend,
    },

    {
        title: "React.js Developer",
        icon: creator,
    },
    {
        title: "Next.js Developer",
        icon: mobile,
    },
];

const technologies = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "Vue JS",
        icon: vue,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "PHP",
        icon: php,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Linux",
        icon: linux,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "Symfony",
        icon: symfony,
    },
    {
        name: "git",
        icon: git,
    },
    {
        name: "figma",
        icon: figma,
    },
    {
        name: "docker",
        icon: docker,
    },
];

const experiences = [
    {
        title: "React.js Developer",
        company_name: "Starbucks",
        icon: starbucks,
        iconBg: "#383E56",
        date: "March 2020 - April 2021",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        title: "React Native Developer",
        company_name: "Tesla",
        icon: tesla,
        iconBg: "#E6DEDD",
        date: "Jan 2021 - Feb 2022",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        title: "Web Developer",
        company_name: "Shopify",
        icon: shopify,
        iconBg: "#383E56",
        date: "Jan 2022 - Jan 2023",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        title: "Full stack Developer",
        company_name: "Meta",
        icon: meta,
        iconBg: "#E6DEDD",
        date: "Jan 2023 - Present",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
];

const testimonials = [
    {
        testimonial:
            "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        testimonial:
            "I've never met a web developer who truly cares about their clients' success like Rick does.",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        testimonial:
            "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
        name: "Lisa Wang",
        designation: "CTO",
        company: "456 Enterprises",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
];

const projects = [
    {
        name: "PowerMap",
        description:
            "A nationwide monitoring platform designed for the oversight of electrical infrastructure across Uzbekistan, including substations, power lines, and distribution units. The system provides real-time visibility into equipment locations, operational status, and technical metrics. Authorized personnel can track performance indicators, review maintenance histories, and detect critical issues through an interactive digital map. The platform strengthens coordination between regional energy services, improves response times, and supports data-driven decision-making for stable and efficient power distribution.",
        tags: [
            {
                name: "React",
                color: "blue-text-gradient",
            },
            {
                name: "Tailwind CSS",
                color: "pink-text-gradient",
            },
            {
                name: "javaScript",
                color: "orange-text-gradient",
            },
            {
                name: "Node.js",
                color: "green-text-gradient",
            },
            {
                name: "Vite",
                color: "blue-text-gradient",
            },
        ],
        image: image,
        source_code_link: "https://github.com/ismatullaevx",
        app_link: "https://powermap.uz/map",
    },
    {
        name: "WaterMap",
        description:
            "A nationwide monitoring platform designed for the oversight of water infrastructure across Uzbekistan, including water stations, water lines, and distribution units. The system provides real-time visibility into equipment locations, operational status, and technical metrics. Authorized personnel can track performance indicators, review maintenance histories, and detect critical issues through an interactive digital map. The platform strengthens coordination between regional water services, improves response times, and supports data-driven decision-making for stable and efficient water distribution.",
        tags: [
            {
                name: "React",
                color: "blue-text-gradient",
            },
            {
                name: "Tailwind CSS",
                color: "pink-text-gradient",
            },
            {
                name: "javaScript",
                color: "orange-text-gradient",
            },
            {
                name: "Node.js",
                color: "green-text-gradient",
            },
            {
                name: "Vite",
                color: "blue-text-gradient",
            },
        ],
        image: image2,
        source_code_link: "https://github.com/ismatullaevx",
        app_link: "https://watermap.uz/map",
    }


];

const myWords = [
    {
        text: "Here you can download my СV by clicking on Download button. I will be glad to our cooperation.",
        name: "Khojiakbar Ismatullaev",
        designation: "The owner",
        company: "ILALEX",
        image: mrKhojiakbar,
    },
];

export { services, technologies, experiences, testimonials, projects, myWords };
