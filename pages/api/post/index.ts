import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export async function createPost(body) {
  const {title, content, authorEmail} = body
  const posts = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {connect: {email: authorEmail}},
    },
  })

  return posts
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await createPost(req.body)
  res.json(result)
}
