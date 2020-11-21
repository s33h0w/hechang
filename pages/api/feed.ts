import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

export async function getFeeds() {
  const feeds = await prisma.post.findMany({
    where: {published: true},
    include: {author: true},
  })

  return JSON.parse(JSON.stringify(feeds))
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = getFeeds()
  res.status(200).json(posts)
}
