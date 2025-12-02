import type { Experience, Project, SkillCategory } from "./types";

export const RESUME_SUMMARY = `
Nguyen Kim Dat is a passionate Full-Stack Developer with 3+ years of experience specializing in JavaScript and TypeScript.
He is skilled in building scalable web applications using React.js and Node.js. He has experience designing APIs, optimizing server performance, and delivering smooth frontend experiences.
Contact: +84 396 61 61 64 | kimdat546@gmail.com | linkedin.com/in/kimdat546

Skills:
- Languages: English (Conversational)
- Programming: JavaScript, TypeScript
- Frontend: React.js, Next.js, Redux Toolkit, React Query, Styled-Components, Material-UI, Ant Design, Chakra-UI, TailwindCSS, Shadcn UI
- Backend: Node.js, Express.js, NestJS, Sequelize, Knex.js, Serverless
- Databases: PostgreSQL, MySQL, MongoDB
- Cloud/DevOps: AWS (Lambda, S3, CloudFormation), Docker, CI/CD
- Tools: Git, Jira, Figma, SonarQube

Education:
- Bachelor's in Software Engineering, Duy Tan University (CMU program), GPA 3.4/4.0, Graduated 06/2022.
`;

export const EXPERIENCES: Experience[] = [
  {
    title: "Fullstack Developer",
    company: "SaigonTech",
    location: "Australia (Remote/Outsource)",
    period: "9/2024 – Present",
    description: "Immigration case management software. A web-based internal tool designed to streamline immigration case management.",
    type: "Internal tool",
    technologies: ["ReactJS", "TypeScript", "Shadcn UI", "Tailwind CSS", "NestJS", "Sequelize", "AWS S3", "PDF-lib"],
    responsibilities: [
      "Developed and implemented key application features for backend and frontend.",
      "Configured and optimized AWS S3 for file storage.",
      "Set up CI/CD pipelines using GitHub Actions and AWS CloudFormation.",
      "Processed government-issued PDF forms with editable fields.",
      "Configured SonarQube for code quality."
    ]
  },
  {
    title: "NodeJS Developer",
    company: "SaigonTech",
    location: "Australia/New Zealand Project",
    period: "10/2023 – 07/2024",
    description: "Emergency Assistance App. A public safety app designed to assist users in emergency situations with real-time alerts and geolocation tracking.",
    type: "Public app",
    technologies: ["Node.js", "Serverless", "AWS Lambda", "WebSocket"],
    responsibilities: [
      "Developed backend logic for real-time emergency alerts.",
      "Optimized AWS Lambda for serverless execution.",
      "Built a WebSocket system supporting over 1,000 concurrent users.",
      "Implemented precise geolocation tracking."
    ]
  },
  {
    title: "Fullstack Developer",
    company: "SaigonTech",
    location: "Singapore Project",
    period: "07/2023 – 11/2023",
    description: "Bank Asset Management Tool. Helps employees track and manage assets across multiple companies using map visualizations.",
    type: "Internal tool",
    technologies: ["ReactJS", "Google Maps API", "Leaflet", "Node.js", "AWS Lambda", "PostgreSQL"],
    responsibilities: [
      "Implemented user-friendly UI based on Figma.",
      "Set up Google Maps and OpenStreetMap for asset visualization.",
      "Designed RBAC authentication and data security measures."
    ]
  },
  {
    title: "NodeJS Developer",
    company: "SaigonTech",
    location: "Singapore Project",
    period: "05/2023 – 07/2023",
    description: "SDK For System Integration. Developed a TypeScript SDK for the Kinde library.",
    type: "Public website",
    technologies: ["NodeJS", "TypeScript", "Express"],
    responsibilities: [
      "Developed and tested TypeScript SDK for authentication.",
      "Built a generator tool and starter kit.",
      "Wrote comprehensive documentation."
    ]
  },
  {
    title: "Full-stack Developer",
    company: "SaigonTech",
    location: "Vietnam",
    period: "01/2023 – Present",
    description: "Test Case Management System. Web app for tracking bugs and managing test cases.",
    type: "Public website",
    technologies: ["NodeJS", "MySQL", "Sequelize"],
    responsibilities: [
      "Designed source code structure for scalability.",
      "Implemented deployment pipelines using S3.",
      "Handled bug fixes and maintenance."
    ]
  },
  {
    title: "Frontend Developer",
    company: "RikkeiSoft",
    location: "Malaysia Project",
    period: "02/2022 – 10/2022",
    description: "Stock Photos Online Marketplace (OSDC). Marketplace for digital products with an advanced image editing tool.",
    type: "Public website",
    technologies: ["ReactJS", "NodeJS", "NextJS", "Storybook", "SASS/SCSS"],
    responsibilities: [
      "Developed a UI library.",
      "Supported building an advanced image editing tool (filters, background removal).",
      "Built landing pages and event showcases."
    ]
  }
];

export const FREELANCE_PROJECTS: Project[] = [
  {
    name: "Wedding Gift Registry Platform",
    role: "ReactJs Developer",
    period: "05/2024 – Present",
    description: "Korean wedding platform for gifts and digital invitations.",
    technologies: ["React.js", "Next.js", "Zustand", "Toss Payment"],
    type: "Public website"
  },
  {
    name: "E-commerce Marketplace Platform",
    role: "ReactJs Developer",
    period: "01/2024 – Present",
    description: "Korean marketplace with location visualization and sales support.",
    technologies: ["React.js", "NaverMap", "Google Maps", "Chart.js"],
    type: "Public website"
  },
  {
    name: "Education Course Management",
    role: "ReactJs Developer",
    period: "08/2023 – 09/2024",
    description: "HRD-Net data management for educational courses.",
    technologies: ["ReactJS", "Material-UI", "Redux toolkit"],
    type: "Public website"
  },
  {
    name: "Custom Neon Sign E-Commerce",
    role: "Fullstack Developer",
    period: "06/2021",
    description: "Neon sign sales with custom design generator.",
    technologies: ["Wordpress", "PHP", "WooCommerce", "Elementor"],
    type: "Public website"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "monitor",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "React Query", "Material-UI", "Shadcn UI"]
  },
  {
    name: "Backend",
    icon: "server",
    skills: ["Node.js", "NestJS", "Express.js", "Serverless", "Knex.js", "Sequelize"]
  },
  {
    name: "Cloud & DevOps",
    icon: "cloud",
    skills: ["AWS Lambda", "AWS S3", "CloudFormation", "Docker", "CI/CD", "GitHub Actions"]
  },
  {
    name: "Databases",
    icon: "database",
    skills: ["PostgreSQL", "MySQL", "MongoDB"]
  }
];

export const SYSTEM_INSTRUCTION = `
You are an AI portfolio assistant for Nguyen Kim Dat, a Fullstack Engineer.
Your goal is to impress potential employers by answering questions about Dat's experience, skills, and projects.
Use the following context to answer questions accurately.
If you are asked about complex engineering topics (e.g., "How did you handle 1000 concurrent users via WebSocket?"), use your general software engineering knowledge to extrapolate a plausible, high-quality answer based on the technologies listed in his resume (Node.js, AWS Lambda, WebSocket).
Always be professional, confident, and slightly enthusiastic.
Context:
${RESUME_SUMMARY}
Detailed Experience:
${JSON.stringify(EXPERIENCES)}
Freelance Projects:
${JSON.stringify(FREELANCE_PROJECTS)}
`;

export const GeminiModel = {
  FLASH: "gemini-2.5-flash",
  PRO_THINKING: "gemini-2.5-pro",
} as const;
