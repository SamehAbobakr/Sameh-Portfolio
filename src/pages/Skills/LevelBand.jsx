import { useLanguage } from '../../app/providers/LanguageProvider';
import { pick } from '../../utils/localized';

// The four levels the data already uses, strongest first. Position only orders them; no numbers are shown.
export const LEVELS = ['practiced', 'intermediate', 'learning', 'beginner'];
const RANK = { beginner: 1, learning: 2, intermediate: 3, practiced: 4 };

function Pips({ rank }) {
  return (
    <span aria-hidden="true" className="flex gap-0.5">
      {[1, 2, 3, 4].map((i) => <span key={i} className={`h-1.5 w-4 rounded-full ${i <= rank ? 'bg-grad shadow-[0_0_8px_rgb(var(--primary)/.6)]' : 'bg-line'}`} />)}
    </span>
  );
}

// One level inside a field: a labelled panel listing every skill at that level with its description.
// `level` is a key from LEVELS, or '' for skills that have no level set.
export default function LevelBand({ level, label, skills }) {
  const { lang } = useLanguage();
  return (
    <div className="card p-4 sm:p-5">
      <h3 className="mb-4 flex items-center gap-3 border-b border-line pb-3 text-sm font-semibold">
        {level && <Pips rank={RANK[level]} />}
        {label}
        <span className="ms-auto rounded-full bg-line/60 px-2 py-0.5 text-xs font-medium text-muted">{skills.length}</span>
      </h3>
      <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
        {skills.map((s) => {
          const description = pick(s, 'description', lang);
          return (
            <li key={s.id} className="min-w-0">
              <p className="t-subheading">{pick(s, 'name', lang)}</p>
              {description && <p className="t-card-text mt-0.5">{description}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
