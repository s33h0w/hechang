import {Post, PrismaClient, User} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

export async function getDrafts() {
  const drafts = await prisma.post.findMany({
    where: {published: false},
    include: {author: true},
  })

  return drafts
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<(Post & {author: User})[]>
) {
  const posts = await getDrafts()
  res.json(posts)
}
