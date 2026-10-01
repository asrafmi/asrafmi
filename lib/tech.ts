// Logos live in /public/assets/tech (Simple Icons, CC0, plus a few generic
// glyphs for things without a brand mark). `hex` is the official brand colour.
type Tech = { icon: string; hex?: string };

export const TECH: Record<string, Tech> = {
  // Frontend
  HTML: { icon: 'html5', hex: 'E34F26' },
  CSS: { icon: 'css', hex: '663399' },
  'Tailwind CSS': { icon: 'tailwindcss', hex: '06B6D4' },
  Tailwind: { icon: 'tailwindcss', hex: '06B6D4' },
  JavaScript: { icon: 'javascript', hex: 'F7DF1E' },
  TypeScript: { icon: 'typescript', hex: '3178C6' },
  React: { icon: 'react', hex: '61DAFB' },
  'React.js': { icon: 'react', hex: '61DAFB' },
  'React Native': { icon: 'react', hex: '61DAFB' },
  'Next.js': { icon: 'nextdotjs', hex: '000000' },
  'Vue.js': { icon: 'vuedotjs', hex: '4FC08D' },
  Vuex: { icon: 'vuedotjs', hex: '4FC08D' },
  Angular: { icon: 'angular', hex: '0F0F11' },
  Redux: { icon: 'redux', hex: '764ABC' },
  Zustand: { icon: 'state', hex: '443E38' },
  'TanStack Query': { icon: 'reactquery', hex: 'FF4154' },
  'Chakra UI': { icon: 'chakraui', hex: '1BB2A9' },
  'shadcn/ui': { icon: 'shadcnui', hex: '000000' },
  'Material UI': { icon: 'mui', hex: '007FFF' },
  Webpack: { icon: 'webpack', hex: '8DD6F9' },
  // Backend
  'Node.js': { icon: 'nodedotjs', hex: '5FA04E' },
  Express: { icon: 'express', hex: '000000' },
  NestJS: { icon: 'nestjs', hex: 'E0234E' },
  Laravel: { icon: 'laravel', hex: 'FF2D20' },
  Python: { icon: 'python', hex: '3776AB' },
  FastAPI: { icon: 'fastapi', hex: '009688' },
  Go: { icon: 'go', hex: '00ADD8' },
  'Go Fiber': { icon: 'go', hex: '00ADD8' },
  PHP: { icon: 'php', hex: '777BB4' },
  WebSocket: { icon: 'socketdotio', hex: '010101' },
  TypeORM: { icon: 'typeorm', hex: 'FE0803' },
  Prisma: { icon: 'prisma', hex: '2D3748' },
  GraphQL: { icon: 'graphql', hex: 'E10098' },
  'REST API': { icon: 'openapiinitiative', hex: '6BA539' },
  // Database
  PostgreSQL: { icon: 'postgresql', hex: '4169E1' },
  MySQL: { icon: 'mysql', hex: '4479A1' },
  Supabase: { icon: 'supabase', hex: '3FCF8E' },
  MongoDB: { icon: 'mongodb', hex: '47A248' },
  Elasticsearch: { icon: 'elasticsearch', hex: '00BFB3' },
  Redis: { icon: 'redis', hex: 'FF4438' },
  // AI & data
  'Machine Learning': { icon: 'scikitlearn', hex: 'F7931E' },
  NLP: { icon: 'huggingface', hex: 'FFD21E' },
  'Web Scraping': { icon: 'webscraping' },
  // DevOps
  Docker: { icon: 'docker', hex: '2496ED' },
  'Docker Compose': { icon: 'docker', hex: '2496ED' },
  Kubernetes: { icon: 'kubernetes', hex: '326CE5' },
  'GitHub Actions': { icon: 'githubactions', hex: '2088FF' },
  'Gitea Actions': { icon: 'gitea', hex: '609926' },
  Jenkins: { icon: 'jenkins', hex: 'D24939' },
  'Drone.io': { icon: 'drone', hex: '212121' },
  'CI/CD': { icon: 'githubactions', hex: '2088FF' },
  Ubuntu: { icon: 'ubuntu', hex: 'E95420' },
  'AWS S3': { icon: 'cloud', hex: 'FF9900' },
  'AWS EC2': { icon: 'cloud', hex: 'FF9900' },
  // Tools
  Git: { icon: 'git', hex: 'F03C2E' },
  Postman: { icon: 'postman', hex: 'FF6C37' },
  Figma: { icon: 'figma', hex: 'F24E1E' },
  Jest: { icon: 'jest', hex: 'C21325' },
  Cypress: { icon: 'cypress', hex: '69D3A7' },
  'Claude Code': { icon: 'claude', hex: 'D97757' },
  'GitHub Copilot': { icon: 'githubcopilot', hex: '000000' },
};

// Brands that are near black would vanish on the dark theme, so they
// follow the text colour instead.
export const techBrand = (name: string) => {
  const hex = TECH[name]?.hex;
  if (!hex) return 'var(--text)';
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.16 ? 'var(--text)' : `#${hex}`;
};
