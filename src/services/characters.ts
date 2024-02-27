import axios from 'axios'
import NodeCache from 'node-cache'
import { APIResponse, Error } from '../types'
import { getFavoritesByUser } from './favorites'

const cache = new NodeCache({ stdTTL: 3600 })

const getCurrentPage = (nextPage: string | null): string => {
  if (!nextPage) return '0'
  const match = nextPage.match(/page=(\d+)/)
  return match ? match[1] : '0'
}

const getDataFromAPI = async (
  query: string
): Promise<APIResponse | undefined> => {
  try {
    const res = await axios.get(
      `https://rickandmortyapi.com/api/character?${query}`,
      { timeout: 10000 }
    )
    return res.data
  } catch (e) {
    return
  }
}

export const getCharacters = async ({
  id,
  name,
  page
}): Promise<APIResponse | Error> => {
  try {
    let characters: APIResponse | undefined = cache.get('characters')
    let currentPage: string | undefined = cache.get('currentPage')

    if (!characters || !currentPage || (page && page !== currentPage)) {
      let query = `page=${page}`
      if (name) query = query + `&name=${name}`
      const res = await getDataFromAPI(query)
      if (res) {
        const { info, results } = res
        if (characters && currentPage === getCurrentPage(info?.prev)) {
          characters.info = info
          characters.results = [...characters.results, ...results]
        } else {
          characters = { info, results }
        }
        currentPage = info?.next
        cache.set('characters', characters)
        cache.set('currentPage', currentPage)
      }
    }
    const favorites = await getFavoritesByUser({ id })
    characters.results.forEach((element) => {
      element.isFav = favorites.includes(element.id)
    })

    return characters
  } catch (error) {
    console.error('Error fetching API:', error)
  }
}
