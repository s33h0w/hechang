import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function getAllUsers() {
    const allUsers = await prisma.user.findMany()
    return allUsers
}

export default async (req, res) => {
    const users = await getAllUsers()
    res.status(200).json(users)
}
