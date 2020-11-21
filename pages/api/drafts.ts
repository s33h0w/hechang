import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

export async function getDrafts() {
  const drafts = await prisma.post.findMany({
    where: {published: false},
    include: {author: true},
  })

  return JSON.parse(JSON.stringify(drafts))
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await getDrafts()
  res.json(posts)
}
