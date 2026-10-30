import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Homepage sections are hash links. On other pages, prefix them with the home path. */
export function sectionHref(href: string, linkPrefix = "", onPageContact = false) {
  if (onPageContact && href === "#hablemos") return href
  if (href.startsWith("#")) return `${linkPrefix}${href}`
  return href
}
