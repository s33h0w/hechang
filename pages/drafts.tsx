import React from 'react'
import useSWR from 'swr'
import Layout from '../components/Layout'
import Post, {PostProps} from '../components/Post'

type Props = {
  drafts: PostProps[]
}

const Drafts: React.FC<Props> = () => {
  const {data} = useSWR<PostProps[]>('/api/drafts')

  return (
    <Layout>
      <div className="page">
        <h1>Drafts</h1>
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

export default Drafts
