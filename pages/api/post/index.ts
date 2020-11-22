import {Post, PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export async function createPost(body: {
  title: string
  authorEmail: string
  content?: string
}) {
  const {title, content, authorEmail} = body
  return await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {connect: {email: authorEmail}},
    },
  })
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Post>
) {
  const result = await createPost(req.body)
  res.json(result)
}
