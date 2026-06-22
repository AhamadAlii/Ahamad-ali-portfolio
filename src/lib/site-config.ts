export const siteConfig = {
  name: "Ahamad Ali",
  title: "Software Engineer | Full Stack Developer | AI Developer",
  shortBio:
    "B.Tech Computer Science student crafting performant full-stack products and applied AI/ML systems. I turn complex problems into elegant, shippable software.",
  email: "ahamadwork2426@gmail.com",
  location: "Bengluru, India",
  url: "https://ahamadali.dev",
  ogImage: "/og.png",
  resume: "/Resume_Ahamad_Ali.pdf",
  availability: "Open to Software Engineering opportunities — 2026 graduate",
  usernames: {
    leetcode: "ahamadalii",
    github: "AhamadAlii",
    hackerrank: "CS_2201640100034",
  },
  socials: {
    github: "https://github.com/AhamadAlii",
    linkedin: "https://www.linkedin.com/in/ahamad-ali/",
    leetcode: "https://leetcode.com/u/ahamadalii/",
    hackerrank: "https://www.hackerrank.com/profile/CS_2201640100034",
  },
} as const;

export type SiteConfig = typeof siteConfig;
