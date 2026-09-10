type Props = {
  kicker: string;
  title: string;
  copy?: string;
};

export default function SectionHeader({ kicker, title, copy }: Props) {
  return (
    <header className="section-head">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {copy ? <p className="lede">{copy}</p> : null}
    </header>
  );
}
