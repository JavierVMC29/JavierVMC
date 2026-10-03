// Month-precision date helpers shared by the build and client scripts.
// Kept free of other imports so client bundles stay tiny.

/** "YYYY-MM" */
export type YearMonth = string;
type DateLocale = "en" | "es";

const toIndex = (value: YearMonth) => {
  const [year, month] = value.split("-").map(Number);
  return year * 12 + (month - 1);
};

export function currentYearMonth(date = new Date()): YearMonth {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/** Inclusive month count, like LinkedIn (Feb–Oct = 9 months). A missing end means "until now". */
export function monthsBetween(start: YearMonth, end?: YearMonth | null) {
  return toIndex(end ?? currentYearMonth()) - toIndex(start) + 1;
}

const DURATION_UNITS: Record<DateLocale, { year: [string, string]; month: [string, string] }> = {
  en: { year: ["yr", "yrs"], month: ["mo", "mos"] },
  es: { year: ["año", "años"], month: ["mes", "meses"] },
};

/** e.g. "1 yr 3 mos" / "1 año 3 meses". */
export function formatDuration(months: number, locale: DateLocale) {
  const units = DURATION_UNITS[locale];
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const part = (n: number, [one, many]: [string, string]) => `${n} ${n === 1 ? one : many}`;
  return [years && part(years, units.year), rest && part(rest, units.month)].filter(Boolean).join(" ");
}

/** e.g. "Feb 2026" / "Feb 2026". */
export function formatYearMonth(value: YearMonth, locale: DateLocale) {
  const [year, month] = value.split("-").map(Number);
  const label = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, 1)))
    .replace(".", "");
  return label.charAt(0).toUpperCase() + label.slice(1);
}
