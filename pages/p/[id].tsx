import React from 'react'
import ReactMarkdown from 'react-markdown'
import Router, {useRouter} from 'next/router'
import useSWR from 'swr'
import {Post as PostType, User} from '@prisma/client'
import Layout from '../../components/Layout'
import {PostProps} from '../../components/Post'
import fetchApi from '../../utils/fetch'

async function publish(id: number): Promise<void> {
  await fetchApi(`publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function destroy(id: number): Promise<void> {
  await fetchApi(`post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

const Post: React.FC<PostProps> = () => {
  const router = useRouter()
  const {id} = router.query
  const {data: post} = useSWR<PostType & {author: User}>(
    id ? `/api/post/${id}` : null
  )

  return (
    <Layout>
      <div>
        <h2>{post?.title + (post?.published ? '' : '(Draft)')}</h2>
        <p>By {post?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown source={post?.content} />
        {!post?.published && (
          <button onClick={() => publish(post?.id)}>Publish</button>
        )}
        <button onClick={() => destroy(post?.id)}>Delete</button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
