import { GetStaticProps } from 'next'

function HelloWorld({ name }: { name: any }) {
  return <div>Hello, {name}</div>
}

function getBaseURL(): string {
  if (process.env.ENV === 'production') {
    return `https://${process.env.VERCEL_URL}`
  }
  return `http://localhost:3000`;
}

export const getStaticProps: GetStaticProps<{ name: any }> = async () => {
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
