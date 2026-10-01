export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'articles', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
] as const;

export const SECTION_IDS = SECTIONS.map((s) => s.id);
