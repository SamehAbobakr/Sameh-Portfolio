// Gives the last word of a multi-word heading the brand gradient. The text itself is untouched:
// it is only split on spaces, so Arabic letter joins stay intact. One-word titles are left plain.
export default function GradientWords({ text }) {
  if (typeof text !== 'string') return text;
  const trimmed = text.trim();
  const i = trimmed.lastIndexOf(' ');
  if (i < 0) return text;
  return <>{trimmed.slice(0, i + 1)}<span className="text-grad">{trimmed.slice(i + 1)}</span></>;
}
