import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes so later ones override conflicting earlier ones (runs at build time). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
