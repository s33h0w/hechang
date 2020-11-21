import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id as string

  if (req.method === 'GET') {
    const post = getPost(postId)
    res.json(post)
  } else if (req.method === 'DELETE') {
    const post = deletePost(postId)
    res.json(post)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/post/:id
export async function getPost(postId: string) {
  const post = await prisma.post.findOne({
    where: {id: Number(postId)},
    include: {author: true},
  })
  return JSON.parse(JSON.stringify(post))
}

// DELETE /api/post/:id
export async function deletePost(postId: string) {
  const post = await prisma.post.delete({
    where: {id: Number(postId)},
  })
  return post
}
