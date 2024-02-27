import { Error } from '../types'
import Favorite from '../models/Favorites'

export const getFavoritesByUser = async ({ id }): Promise<number[]> => {
  try {
    const favorites = await Favorite.findAll({ where: { user_id: id } })
    return favorites.map(fav => fav.favorite_id)
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

export const getFavorite = async ({ id, favoriteId }): Promise<Favorite> => {
    try {
      const favorite= await Favorite.findOne({ where: { user_id: id, favorite_id: favoriteId } })
      return favorite
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }

export const addFavorite = async ({ favoriteId, id }): Promise<Error | void> => {
  try {
    const foundedFavorite = await getFavorite({id, favoriteId})
    if(!foundedFavorite) await Favorite.create({ user_id: id, favorite_id: favoriteId })
  } catch (e) {
    console.error(e)
    throw Error(e)
  }
}

export const deleteFavorite = async ({ favoriteId, id }): Promise<Error | void> => {
  try {
    const foundedFavorite = await getFavorite({id, favoriteId})
    if(foundedFavorite) await Favorite.destroy({ where: { user_id: id, favorite_id: favoriteId } })
  } catch (e) {
    console.error(e)
    throw Error(e)
  }
}
