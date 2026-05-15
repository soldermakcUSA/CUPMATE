import type { ReactNode } from "react";
import { defaultSeoUpdatedAt, formatSeoUpdatedDate } from "@/lib/seo-dates";

type SeoUpdatedProps = {
  date?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export function SeoUpdated({ date = defaultSeoUpdatedAt, prefix, suffix }: SeoUpdatedProps) {
  const parts = [
    prefix,
    `Updated ${formatSeoUpdatedDate(date)}`,
    suffix
  ].filter(Boolean);

  return (
    <p className="seo-meta">
      {parts.map((part, index) => (
        <span key={index}>{index === 0 ? part : <> · {part}</>}</span>
      ))}
    </p>
  );
}
