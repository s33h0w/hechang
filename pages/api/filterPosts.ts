import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

// GET /api/filterPosts?searchString=:searchString
export async function filterPosts(searchString: string) {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {contains: searchString},
        },
        {
          content: {contains: searchString},
        },
      ],
    },
  })
  return posts.map((item) => JSON.parse(JSON.stringify(item)))
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {searchString} = req.query
  const resultPosts = await filterPosts(searchString as string)
  res.json(resultPosts)
}
