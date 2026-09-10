import { profile } from '../data/profile';

export default function PortraitCard() {
  return (
    <aside className="id-card" aria-label="Engineer identity card">
      <div className="id-card__meta">
        <span className="id-card__chip">ENG-ID</span>
        <span className="id-card__chip id-card__chip--live">ACTIVE</span>
      </div>
      <div className="id-card__photo">
        <img src={profile.photo.src} alt={profile.photo.alt} width={280} height={360} />
      </div>
      <div className="id-card__body">
        <p className="id-card__name">{profile.name}</p>
        <p className="id-card__role">{profile.organization.role}</p>
        <p className="id-card__org">{profile.organization.name}</p>
        <p className="id-card__focus">
          {profile.titlePrimary}
          <br />
          {profile.titleSecondary}
        </p>
      </div>
    </aside>
  );
}
