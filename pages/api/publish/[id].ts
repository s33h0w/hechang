import {Post, PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

// PUT /api/publish/:id
export async function publishPost(postId: string) {
  return await prisma.post.update({
    where: {id: Number(postId)},
    data: {published: true},
  })
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Post>
) {
  const postId = req.query.id as string
  const post = await publishPost(postId)
  res.json(post)
}
