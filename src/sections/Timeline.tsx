import SectionHeader from '../components/SectionHeader';
import { journey } from '../data/timeline';

export default function Timeline() {
  return (
    <section id="journey" className="section">
      <div className="container">
        <SectionHeader
          kicker="06 — Path"
          title="Engineering journey"
          copy="A progression toward combining fields, not treating them as isolated skills. Edit entries in src/data/timeline.ts — no invented dates."
        />
        <ol className="timeline">
          {journey.map((entry, index) => (
            <li key={entry.id}>
              <span className="timeline__index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
