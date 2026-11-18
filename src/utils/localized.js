// Returns the field in the current language, falling back to the other one.
export const pick = (row, field, lang) => row?.[`${field}_${lang}`] || row?.[`${field}_${lang === 'ar' ? 'en' : 'ar'}`] || '';
export const fmtDate = (d, lang) => (d ? new Date(d).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', { year: 'numeric', month: 'short' }) : '');

// Strict version of `pick`: only the current language, so callers can fall back to
// their own translated defaults instead of showing the other language's text.
export const own = (row, field, lang) => row?.[`${field}_${lang}`] || '';
