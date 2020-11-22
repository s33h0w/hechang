import {Post as PostType, User} from '@prisma/client'
import React from 'react'
import useSWR from 'swr'
import Layout from 'components/Layout'
import Post from 'components/Post'

const Blog: React.FC = () => {
  const {data} = useSWR<(PostType & {author: User})[]>('/api/feed')
  return (
    <Layout>
      <div className="page">
        <h1>My Blog</h1>
        <main>
          {data?.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
