import { GetStaticProps } from 'next'

function Users({ users }: { users: any }) {
  return (
    <>
      <h2>USERS</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <span>{user.email}</span>
        </div>
      ))}
    </>
  )
}

function getBaseURL(): string {
  if (process.env.ENV === 'production') {
    return `https://${process.env.VERCEL_URL}`
  }
  return `http://localhost:3000`;
}

export const getStaticProps: GetStaticProps = async () => {
  const url = new URL('/api/user', getBaseURL())
  const res = await fetch(url.href)
  const users = await res.json()
  return {
    props: {
      users,
    },
  }
}

export default Users
