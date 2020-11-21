import React from 'react'
import {GetServerSideProps} from 'next'
import ReactMarkdown from 'react-markdown'
import Router from 'next/router'
import Layout from '../../components/Layout'
import {PostProps} from '../../components/Post'
import {getPost} from '../api/post/[id]'
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

const Post: React.FC<PostProps> = (props) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown source={props.content} />
        {!props.published && (
          <button onClick={() => publish(props.id)}>Publish</button>
        )}
        <button onClick={() => destroy(props.id)}>Delete</button>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const post = await getPost(context.params.id as string)
  return {props: {...post}}
}

export default Post
