import { GetServerSideProps } from 'next'

function HelloWorld({ name }: { name: any }) {
  return <div>Hello, {name}</div>
}

function getBaseURL(): string {
  if (process.env.ENV === 'production') {
    return `https://${process.env.VERCEL_URL}`
  }
  return process.env.HOST
}
export const getServerSideProps: GetServerSideProps<{
  name: string
}> = async () => {
  const url = new URL('/api/hello', getBaseURL())
  const res = await fetch(url.href)
  const hello = await res.json()
  return {
    props: {
      name: hello.name,
    },
  }
}

export default HelloWorld
