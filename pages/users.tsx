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

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/user')
  const users = await res.json()
  return {
    props: {
      users,
    },
  }
}

export default Users
