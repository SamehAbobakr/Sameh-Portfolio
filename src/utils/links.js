// URLs come from the database, so only plain web and mail links are ever rendered as hrefs.
// This blocks javascript:, data: and similar schemes, and returns '' for anything not usable.
// Paths on this same site (e.g. /images/cert.png) are allowed as they are.
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
export function safeUrl(value) {
  if (typeof value !== 'string') return '';
  const raw = value.trim();
  if (!raw) return '';
  if (!HAS_SCHEME.test(raw)) return raw.startsWith('//') ? '' : raw;
  try {
    const u = new URL(raw);
    return ['http:', 'https:', 'mailto:'].includes(u.protocol) ? u.href : '';
  } catch {
    return '';
  }
}

// Platform name (or the link itself) -> icon name. Matches loosely so "Try Hack Me" and "tryhackme" both work.
const PLATFORM_ICONS = [
  ['github', 'github'], ['linkedin', 'linkedin'], ['tryhackme', 'terminal'], ['hackthebox', 'terminal'],
  ['youtube', 'youtube'], ['facebook', 'facebook'], ['instagram', 'instagram'],
  ['telegram', 'send'], ['whatsapp', 'phone'], ['twitter', 'twitter'],
  ['medium', 'book'], ['leetcode', 'code'], ['kaggle', 'code'], ['codepen', 'code'],
  ['mail', 'mail'], ['email', 'mail'],
];

export function platformKey(platform = '', url = '') {
  if (platform.trim().toLowerCase() === 'x') return 'twitter';
  const text = `${platform} ${url}`.toLowerCase().replace(/[\s_-]+/g, '');
  const hit = PLATFORM_ICONS.find(([needle]) => text.includes(needle));
  return hit ? hit[0] : '';
}

export function platformIcon(platform, url) {
  if (/^mailto:/i.test(url || '')) return 'mail';
  const key = platformKey(platform, url);
  const hit = PLATFORM_ICONS.find(([needle]) => needle === key);
  return hit ? hit[1] : 'globe';
}
