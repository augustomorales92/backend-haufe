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

export const addFavorite = async ({ favoriteId, id }): Promise<Error | void> => {
  try {
    await Favorite.create({ user_id: id, favorite_id: favoriteId })
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

export const deleteFavorite = async ({ favoriteId, id }): Promise<Error | void> => {
  try {
    await Favorite.destroy({ where: { user_id: id, favorite_id: favoriteId } })
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}
