export default function getURL(api: string): string {
  if ((process.env.NODE_ENV ?? process.env.NEXT_PUBLIC_ENV) === 'development') {
    return 'http://localhost:3000/api/' + api
  }
  return (
    `https://${
      process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL
    }/api/` + api
  )
}
