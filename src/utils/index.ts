export const parseBooleanParam = (value: string | null): boolean | undefined => {
  if (value === 'true') return true
  if (value === 'false') return false
  return undefined
}

export const parseNumberParam = (value: string | null, fallback?: number): number | undefined => {
  if (!value) return fallback
  const parsed = Number(value)
  return isNaN(parsed) ? fallback : parsed
} 