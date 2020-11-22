import {Post, User} from '@prisma/client'
import useSWR from 'swr'

export type Feed = (Post & {author: User})[]

export function useFeed() {
  const {data, error} = useSWR<Feed>('/api/feed')
  return {
    feed: data,
    error: error,
    isLoading: !data && !error,
  }
}
