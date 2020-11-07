export default function getURL(api: string): string {
  if (process.env.ENV === 'production') {
    return `https://${process.env.VERCEL_URL}/api/` + api
  }
  return 'http://localhost:3000/api/' + api
}
