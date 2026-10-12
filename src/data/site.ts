// Single source of truth for personal details, links and the Info page content.

export const site = {
  name: 'Ayush Singh',
  role: 'Web Developer',
  jobTitle: 'Full-Stack Engineer',
  email: 'ayushsinghcodes@gmail.com',
  description:
    'Ayush Singh is a full-stack engineer, SDE Intern at INDmoney and final-year CSE student at IIIT Bhagalpur. He built jeearchive.in, used by 1.2M+ students.',
  location: 'Varanasi, India',
  college: 'IIIT Bhagalpur',
};

export const links = {
  resume: 'https://drive.google.com/file/d/1fYkYijEm2qXsT_3ir8qKhePIn74dR4L-/view?usp=sharing',
  github: 'https://github.com/ayushcodes0',
  linkedin: 'https://www.linkedin.com/in/ayushsinghiiit/',
  twitter: 'https://twitter.com/ayushcodes_',
  instagram: 'https://www.instagram.com/ayushcodes_/',
  discord: 'https://discord.gg/8Q9Nb2fATj',
  email: `mailto:${site.email}`,
};

export const stats = [
  { value: '1.2M+', label: 'Users reached' },
  { value: '8K+', label: 'Daily active users' },
  { value: '10+', label: 'Projects shipped' },
  { value: '51K+', label: 'Discord community members' },
];

export type Experience = {
  company: string;
  url?: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  stack: string[];
  caseStudy?: string;
};

export const experience: Experience[] = [
  {
    company: 'INDmoney',
    url: 'https://www.indmoney.com',
    role: 'SDE Intern',
    period: 'July 2026 – Present',
    location: 'Onsite · Gurugram, Haryana',
    description: [
      'Working on the creator (affiliate) program, where creators publish their own chart indicators for their audience: built the flow for saving indicators and integrated indicators into the charts.',
      'Built and shipped complete pages on indmoney.com end to end, from layout and components to performance, contributing to growth in the site\'s overall web traffic.',
      'Optimized existing production components to reduce Interaction to Next Paint (INP), making interactions noticeably more responsive for users on the live site.',
      'Revamped existing pages and built performance-first, reusable UI components designed to be shared across the product, improving UX and maintainability.',
    ],
    stack: ['Chart indicators', 'Production pages', 'INP optimization', 'Web performance', 'Reusable components'],
    caseStudy: '/work/indmoney',
  },
  {
    company: 'Lawyal Tech',
    url: 'https://lawyaltech.org/',
    role: 'Software Developer Intern (Frontend)',
    period: 'February 2025 – May 2025',
    location: 'Remote',
    description: [
      'Delivered an interactive onboarding walkthrough in React.js for the Contract Coder platform, boosting the new-user completion rate by 45% and reducing first-session drop-off.',
      'Assembled 15+ reusable Redux-connected components, cutting design-to-implementation time by 15% across multiple feature modules.',
    ],
    stack: ['React.js', 'Redux', 'JavaScript', 'Tailwind CSS'],
    caseStudy: '/work/lawyal-tech',
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  grade: { label: string; value: string };
  location?: string;
  description?: string;
};

export const education: Education[] = [
  {
    school: 'IIIT Bhagalpur',
    degree: 'B.Tech, Computer Science and Engineering',
    period: '2023 – 2027',
    grade: { label: 'CGPA', value: '8.2 / 10' },
    location: 'Bhagalpur, India',
    description:
      'Started with C and C++, which shaped how I approach problem-solving and system-level thinking, before moving into full-stack product development.',
  },
  {
    school: 'RS Convent Sainik School',
    degree: 'Class XII (CBSE)',
    period: '2021 – 2022',
    grade: { label: 'Percentage', value: '89%' },
  },
  {
    school: 'RS Convent Sainik School',
    degree: 'Class X (CBSE)',
    period: '2019 – 2020',
    grade: { label: 'Percentage', value: '94%' },
  },
];

export const skills = [
  { name: 'HTML', note: 'Semantic, accessible markup' },
  { name: 'CSS', note: 'Responsive layout & motion' },
  { name: 'JavaScript', note: 'Makes the web interactive' },
  { name: 'TypeScript', note: 'JavaScript with types' },
  { name: 'React.js', note: 'Component-driven UIs' },
  { name: 'Next.js', note: 'Full-stack React framework' },
  { name: 'Redux', note: 'Predictable app state' },
  { name: 'Tailwind CSS', note: 'Utility-first styling' },
  { name: 'Node.js', note: 'JavaScript server runtime' },
  { name: 'Express.js', note: 'Lightweight backend framework' },
  { name: 'MongoDB', note: 'NoSQL document database' },
  { name: 'C / C++', note: 'Problem-solving foundations' },
  { name: 'Git', note: 'Version control' },
  { name: 'Figma', note: 'Interface design' },
  { name: 'Flutter', note: 'Cross-platform apps' },
  { name: 'Dart', note: 'Language behind Flutter' },
];
