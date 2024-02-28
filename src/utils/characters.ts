import axios from 'axios'
import NodeCache from 'node-cache'
import { APIResponse, QueryProps } from '../types'

export const cache = new NodeCache({ stdTTL: Number(process.env.CACHE_TIME_EXPIRATION) })

export const getCurrentPage = (nextPage: string | null): string => {
  if (!nextPage) return '0'
  const match = nextPage.match(/page=(\d+)/)
  return match?.[1] ?? '0'
}

export const getDataFromAPI = async ({
  name,
  page
}: QueryProps): Promise<APIResponse | undefined> => {
  let query
  if (page) query = `?page=${page}`
  if (name) query = query + `&name=${name}`
  try {
    const res = await axios.get(
      `https://rickandmortyapi.com/api/character${query}`,
      { timeout: Number(process.env.API_REQUEST_TIMEOUT) }
    )
    return res.data
  } catch (e) {
    return
  }
}
