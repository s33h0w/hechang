import {User} from '@prisma/client'
import fetchApi from 'utils/fetch'

export async function createUser(body: {name: string; email: string}) {
  return await fetchApi<User>('user', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  })
}
