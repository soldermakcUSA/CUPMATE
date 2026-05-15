export const defaultSeoUpdatedAt = "2026-05-15";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function formatSeoUpdatedDate(date: string) {
  const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

  if (isoDate) {
    const [, year, month, day] = isoDate;
    return `${monthNames[Number(month) - 1]} ${Number(day)}, ${year}`;
  }

  return date;
}
