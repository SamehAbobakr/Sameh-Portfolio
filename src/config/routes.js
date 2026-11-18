// Single source of truth for pages. To launch a page: build it, add its route in
// app/router, then flip `enabled` to true. Navigation and Hero buttons follow.
export const ROUTES = [
  { key: 'home', path: '/', enabled: true },
  { key: 'about', path: '/about', enabled: true },
  { key: 'skills', path: '/skills', enabled: true },
  { key: 'projects', path: '/projects', enabled: true },
  { key: 'learning', path: '/learning', enabled: true },
  { key: 'certificates', path: '/certificates', enabled: true },
  { key: 'contact', path: '/contact', enabled: true },
];
export const getRoute = (key) => ROUTES.find((r) => r.key === key);
