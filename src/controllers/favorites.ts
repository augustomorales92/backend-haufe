import { CustomRequest } from '../types'
import * as favoritesServices from '../services/favorites'
import { HttpStatusCode } from 'axios'
import { addErrorToRequestLog } from '../middlewares/errorhandler'
import { errors } from '../constants'

export const addFavorite = async (req: CustomRequest, res, next) => {
  try {
    const { favoriteId } = req.body
    const { id } = req.decoded
    const fav = await favoritesServices.addFavorite({ favoriteId, id })
    res.status(HttpStatusCode.Ok).send(fav)
  } catch (e) {
    addErrorToRequestLog(errors['AUTHORIZATION_ERROR'], req, res, next)
  }
}

export const removeFavorite = async (req: CustomRequest, res, next) => {
  try {
    const { favoriteId } = req.params
    const { id } = req.decoded
    const fav = await favoritesServices.deleteFavorite({
      favoriteId,
      id
    })
    res.status(HttpStatusCode.Ok).send(fav)
  } catch (e) {
    addErrorToRequestLog(errors['AUTHORIZATION_ERROR'], req, res, next)
  }
}
