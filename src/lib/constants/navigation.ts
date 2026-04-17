export interface NavLink {
  name: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Awards', href: '/competitions' },
  { name: 'Activities', href: '/activities' },
  { name: 'Certs', href: '/certifications' },
  { name: 'About', href: '/about' },
];
