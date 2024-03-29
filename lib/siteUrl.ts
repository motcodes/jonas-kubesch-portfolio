export const siteUrl = (slug: string): string => {
  const url =
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000'
  return `${url}${slug || ''}`
}
