import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Brain,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 86 },
      { name: "C++", level: 88 },
      { name: "Java", level: 80 },
      { name: "SQL", level: 84 },
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 92 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 86 },
      { name: "FastAPI", level: 82 },
      { name: "Flask", level: 84 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 82 },
      { name: "PostgreSQL", level: 83},
    ],
  },
  {
    title: "Cloud & Tools",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 78 },
      { name: "Git", level: 92 },
      { name: "GitHub", level: 92 },
      { name: "Linux", level: 84 },
      { name: "Docker", level: 80 },
    ],
  },
  {
    title: "Machine Learning",
    icon: Brain,
    skills: [
      { name: "Scikit-Learn", level: 85 },
      { name: "Pandas", level: 88 },
      { name: "NumPy", level: 88 },
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Skill Bee",
    period: "May-2025 — July 2025",
    location: "New Delhi",
    description:
      "Built and shipped production features across the stack, focusing on performance, reliability, and developer velocity.",
    achievements: [
      "Engineered REST APIs and reusable React components that cut feature delivery time by ~30%.",
      "Optimized data-fetching and caching layers, reducing average page load time by ~40%.",
      "Collaborated in an agile team, owning end-to-end features from design to deployment.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "TypeScript"],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  category: "AI/ML" | "Full Stack" | "Web";
  stack: string[];
  highlights: string[];
  challenges: string;
  metrics: { label: string; value: string }[];
  github: string;
  demo: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "gitproof-ai",
    title: "GitProof AI",
    tagline: "AI-powered developer credibility analyzer",
    description:
      "An AI platform that analyzes a developer's real GitHub footprint and resume to generate recruiter-grade credibility analytics — separating genuine contributions from noise.",
    image: "/projects/gitproof-ai.png",
    category: "AI/ML",
    stack: ["Next.js", "TypeScript", "GitHub API", "OpenAI", "FastAPI", "PostgreSQL"],
    highlights: [
      "Deep GitHub API integration to score real contribution quality and consistency.",
      "Resume parsing pipeline that maps claimed skills to verifiable code evidence.",
      "Recruiter analytics dashboard with credibility scoring and red-flag detection.",
    ],
    challenges:
      "Designing a scoring model resilient to gamed metrics (fork spam, trivial commits) while handling GitHub API rate limits at scale through caching and batched requests.",
    metrics: [
      { label: "Analysis time", value: "< 8s" },
      { label: "Signals scored", value: "20+" },
      { label: "API caching", value: "Edge" },
    ],
    github: "https://github.com/AhamadAlii/gitproof-ai",
    demo: "https://ethara-ai-pi.vercel.app/",
    featured: true,
  },
  {
    slug: "healthhub",
    title: "HealthHub",
    tagline: "MERN healthcare access platform",
    description:
      "A full-stack MERN application that helps users instantly find nearby hospitals and blood banks, with secure JWT-based authentication and a clean, accessible UI.",
    image: "/projects/healthhub.png",
    category: "Full Stack",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT", "REST API"],
    highlights: [
      "Secure JWT authentication with protected routes and role-based access.",
      "RESTful API powering hospital and blood bank search with geo-filtering.",
      "Responsive, mobile-first interface optimized for emergency use cases.",
    ],
    challenges:
      "Building a reliable search experience over inconsistent public health datasets and securing user sessions while keeping the API stateless and horizontally scalable.",
    metrics: [
      { label: "Auth", value: "JWT" },
      { label: "API design", value: "REST" },
      { label: "Stack", value: "MERN" },
    ],
    github: "https://github.com/AhamadAlii/healthhub",
    demo: "https://code-for-change-nine.vercel.app/",
    featured: true,
  },
  {
    slug: "stress-detection",
    title: "Stress Detection System",
    tagline: "ML-driven mental wellness classifier",
    description:
      "A machine learning application that predicts stress levels from physiological and behavioral inputs using a Random Forest model, served via a Flask API to a React frontend.",
    image: "/projects/stress-detection.png",
    category: "AI/ML",
    stack: ["Python", "Scikit-Learn", "Random Forest", "Flask", "React", "Pandas"],
    highlights: [
      "Random Forest classifier with feature engineering on physiological signals.",
      "Flask backend exposing a clean inference API consumed by a React frontend.",
      "Interactive UI presenting predictions with confidence and key indicators.",
    ],
    challenges:
      "Preventing overfitting on a limited dataset through cross-validation and feature selection, then exposing low-latency predictions across the Flask–React boundary.",
    metrics: [
      { label: "Accuracy", value: "94%" },
      { label: "Model", value: "Random Forest" },
      { label: "Latency", value: "< 200ms" },
    ],
    github: "https://github.com/AhamadAlii/Stress_Detection-final",
    demo: "https://www.youtube.com/watch?v=a24W35nSLaE",
    featured: true,
  },
  {
    slug: "simon-says-game",
    title: "Simon Says Game",
    tagline: "Classic memory game built with vanilla JS",
    description:
      "A browser-based recreation of the classic Simon Says memory game where players repeat an ever-growing sequence of colors and sounds, built with pure HTML, CSS, and JavaScript.",
    image: "/projects/simon-says-game.png",
    category: "Web",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Dynamic sequence generation that grows with each successful level.",
      "Interactive color and sound feedback for an engaging arcade feel.",
      "Score tracking with game-over detection and instant restart.",
    ],
    challenges:
      "Managing asynchronous sequence playback and user-input timing without race conditions, while keeping the game state predictable across rapid rounds.",
    metrics: [
      { label: "Stack", value: "Vanilla JS" },
      { label: "Type", value: "Game" },
      { label: "Deps", value: "Zero" },
    ],
    github: "https://github.com/AhamadAlii/Simon_Says_Game",
    demo: "https://simon-says-game-nu-amber.vercel.app/",
    featured: false,
  },
];

export const projectCategories = ["All", "AI/ML", "Full Stack", "Web"] as const;

export type Achievement = {
  title: string;
  detail: string;
  badge: string;
  highlight?: boolean;
};

export const achievements: Achievement[] = [
  {
    title: "LeetCode Knight",
    detail: "Rating 1979 — Top 2.84% globally on LeetCode.",
    badge: "Knight",
    highlight: true,
  },
  {
    title: "515+ Problems Solved",
    detail: "Including 105 Hard problems across DSA topics.",
    badge: "DSA",
  },
  {
    title: "Pentathon Top 50",
    detail: "Finished in the top 50 of the Pentathon competitive event.",
    badge: "Top 50",
  },
  {
    title: "HackerRank 5 Star",
    detail: "5-star problem solving rating on HackerRank.",
    badge: "5★",
  },
  {
    title: "AWS Certified",
    detail: "AWS cloud certification demonstrating cloud fundamentals.",
    badge: "AWS",
    highlight: true,
  },
  {
    title: "IBM Python Certification",
    detail: "Certified in Python development by IBM.",
    badge: "IBM",
  },
];

export type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  detail: string;
};

export const education: EducationItem[] = [
  {
    institution: "PSIT Kanpur",
    degree: "B.Tech, Computer Science & Engineering",
    period: "2022 — 2026",
    detail:
      "Pursuing a Bachelor of Technology in Computer Science with a focus on full-stack development, data structures & algorithms, and applied machine learning.",
  },
  {
    institution: "Little Flower House",
    degree: "Class XII (Senior Secondary), Mathematics",
    period: "2020 — 2022",
    detail:
      "Completed senior secondary education with a focus on Mathematics in Varanasi, India, building a strong analytical and problem-solving foundation.",
  },
];

export const preferredRoles = [
  "Software Engineer",
  "Full Stack Developer",
  "Backend Developer",
  "AI/ML Engineer",
];

// Fallback stats used only when live APIs are unavailable.
export const fallbackLeetCode = {
  username: "ahamadalii",
  ranking: 0,
  rating: 1979,
  contestRating: 1979,
  topPercent: 2.84,
  totalSolved: 515,
  easySolved: 280,
  mediumSolved: 130,
  hardSolved: 105,
  badge: "Knight",
  fromFallback: true,
};

export const fallbackGitHub = {
  username: "AhamadAlii",
  name: "Ahamad Ali",
  publicRepos: 30,
  followers: 40,
  following: 30,
  totalStars: 50,
  contributionsLastYear: 900,
  contributions: [] as { date: string; count: number }[],
  fromFallback: true,
};
