import {Post, PrismaClient} from '@prisma/client'
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
  return posts
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  const {searchString} = req.query
  const resultPosts = await filterPosts(searchString as string)
  res.json(resultPosts)
}
