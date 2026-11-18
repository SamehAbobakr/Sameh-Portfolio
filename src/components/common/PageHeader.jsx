import GradientWords from './GradientWords';

export default function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="page-head">
      <div className="page-head__inner mx-auto max-w-7xl px-5">
        <div aria-hidden="true" className="page-head__mark" />
        {eyebrow && <p className="t-eyebrow">{eyebrow}</p>}
        <h1 className="t-display"><GradientWords text={title} /></h1>
        {intro && <p className="t-lead">{intro}</p>}
      </div>
    </header>
  );
}
export const Page = ({ children }) => <div className="mx-auto max-w-7xl px-5 py-8 sm:py-10">{children}</div>;
