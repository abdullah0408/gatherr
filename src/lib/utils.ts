import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDate, formatDistanceToNowStrict } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(from: Date) {
  const currentDate = new Date()
  if (currentDate.getTime() - from.getTime() < 1000 * 60 * 60 * 24) {
    return formatDistanceToNowStrict(from, { addSuffix: true })
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "MMM d")
    } else {
      return formatDate(from, "MMM d, yyyy")
    }
  }
}

export function formatNumber(number: number): string {
  return Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(number)
} 