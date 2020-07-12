import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

async function getAllUsers() {
    const allUsers = await prisma.user.findMany()
    return allUsers
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const users = await getAllUsers()
    res.status(200).json(users)
}
