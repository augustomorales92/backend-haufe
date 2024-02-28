
import { APIResponse, Error } from '../types'
import { cache, getCurrentPage, getDataFromAPI } from '../utils/characters'
import { getFavoritesByUser } from './favorites'



export const getCharacters = async ({
  id,
  name,
  page
}): Promise<APIResponse | Error> => {
  try {
    let characters: APIResponse | undefined = cache.get('characters')
    let currentPage: string | undefined = cache.get('currentPage')

    if (!characters || !currentPage || (page && page !== currentPage)) {
      const res = await getDataFromAPI({name, page})
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
