import {PrismaClient, User} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

// POST /api/user
// Required fields in body: name, email
export async function createUser(body) {
  return await prisma.user.create({
    data: {
      ...body,
    },
  })
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const result = await createUser(req.body)
  res.json(result)
}
