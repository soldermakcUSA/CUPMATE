type TeamFlagAsset = {
  src: string;
  alt: string;
};

const teamFlagAssets: Array<{ pattern: RegExp; asset: TeamFlagAsset }> = [
  { pattern: /(^|\s)(scotland|sco|шотландия)($|\s)/i, asset: { src: "/assets/flags/scotland.svg", alt: "Scotland flag" } },
  { pattern: /(^|\s)(england|eng|англия)($|\s)/i, asset: { src: "/assets/flags/england.svg", alt: "England flag" } }
];

export function getTeamFlagAsset(team: string): TeamFlagAsset | null {
  const normalized = team.replace(/^🏴\s*/, "").trim();
  return teamFlagAssets.find(({ pattern }) => pattern.test(normalized))?.asset ?? null;
}

export function stripUnsupportedFlagEmoji(value: string) {
  return value.replace(/^🏴\s*/, "").trim();
}

export function TeamFlag({ team, fallback, className = "team-flag" }: { team: string; fallback?: string; className?: string }) {
  const asset = getTeamFlagAsset(team);

  if (asset) {
    return <img className={className} src={asset.src} alt={asset.alt} decoding="async" loading="lazy" />;
  }

  return <span className={className} aria-hidden="true">{fallback ?? team}</span>;
}

export function TeamLabel({ value }: { value: string }) {
  const asset = getTeamFlagAsset(value);

  if (!asset) {
    return <>{value}</>;
  }

  return (
    <span className="team-label">
      <TeamFlag team={value} className="team-label-flag" />
      <span>{stripUnsupportedFlagEmoji(value)}</span>
    </span>
  );
}
