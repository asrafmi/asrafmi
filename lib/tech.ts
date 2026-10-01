// Logos live in /public/assets/tech (Simple Icons, CC0). `hex` is the official
// brand colour, shown on hover; near-black brands fall back to the text colour.
type Tech = { icon: string; hex?: string };

export const TECH: Record<string, Tech> = {
  JavaScript: { icon: 'javascript', hex: 'F7DF1E' },
  TypeScript: { icon: 'typescript', hex: '3178C6' },
  Python: { icon: 'python', hex: '3776AB' },
  PHP: { icon: 'php', hex: '777BB4' },
  React: { icon: 'react', hex: '61DAFB' },
  'React.js': { icon: 'react', hex: '61DAFB' },
  'React Native': { icon: 'react', hex: '61DAFB' },
  'Next.js': { icon: 'nextdotjs' },
  Redux: { icon: 'redux', hex: '764ABC' },
  'Vue.js': { icon: 'vuedotjs', hex: '4FC08D' },
  Vuex: { icon: 'vuedotjs', hex: '4FC08D' },
  Angular: { icon: 'angular' },
  'Node.js': { icon: 'nodedotjs', hex: '5FA04E' },
  Express: { icon: 'express' },
  NestJS: { icon: 'nestjs', hex: 'E0234E' },
  Laravel: { icon: 'laravel', hex: 'FF2D20' },
  MySQL: { icon: 'mysql', hex: '4479A1' },
  PostgreSQL: { icon: 'postgresql', hex: '4169E1' },
  MongoDB: { icon: 'mongodb', hex: '47A248' },
  Elasticsearch: { icon: 'elasticsearch', hex: '00BFB3' },
  'Machine Learning': { icon: 'scikitlearn', hex: 'F7931E' },
  NLP: { icon: 'huggingface', hex: 'FFD21E' },
  'Web Scraping': { icon: 'webscraping' },
  Docker: { icon: 'docker', hex: '2496ED' },
  Kubernetes: { icon: 'kubernetes', hex: '326CE5' },
  'CI/CD': { icon: 'githubactions', hex: '2088FF' },
  Git: { icon: 'git', hex: 'F03C2E' },
};

export const techBrand = (name: string) => {
  const hex = TECH[name]?.hex;
  return hex ? `#${hex}` : 'var(--text)';
};
