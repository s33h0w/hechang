import {Post} from '@prisma/client'
import fetchApi from 'utils/fetch'

export async function createPost(body: {
  title: string
  content?: string
  authorEmail: string
}) {
  return fetchApi<Post>('post', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  })
}

export async function publishPost(id: Post['id']) {
  return await fetchApi<Post>(`publish/${id}`, {
    method: 'PUT',
  })
}

export async function deletePost(id: Post['id']) {
  return await fetchApi<Post>(`post/${id}`, {
    method: 'DELETE',
  })
}
