// Figures such as "50%", "500+" or "2M+" inside a sentence.
const METRIC = /(\d[\d.,]*\s?%|\d[\d.,]*M?\+)/;

/** Splits text into plain and metric segments so metrics can be emphasized when rendering. */
export function splitMetrics(text: string) {
  return text.split(METRIC).map((part, index) => ({ text: part, metric: index % 2 === 1 }));
}
