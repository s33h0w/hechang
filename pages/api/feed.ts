import {Post, PrismaClient, User} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

export async function getFeeds() {
  const feeds = await prisma.post.findMany({
    where: {published: true},
    include: {author: true},
  })

  return feeds
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<(Post & {author: User})[]>
) {
  const posts = await getFeeds()
  res.status(200).json(posts)
}
