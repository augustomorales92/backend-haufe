import { NextFunction, Response } from 'express'
import * as characterServices from '../services/characters'
import { CustomRequest } from '../types'
import { addErrorToRequestLog } from '../middlewares/errorhandler'
import { HttpStatusCode } from 'axios'
import { errors } from '../constants'

export const getCharacters = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.decoded
      const page = String(req.query.page)
      const name = String(req.query.name)
      const allCharacters = await characterServices.getCharacters({ id, name, page })
      res.status(HttpStatusCode.Ok).send(allCharacters)
    } catch (e) {
        addErrorToRequestLog(errors['AUTHORIZATION_ERROR'], req, res, next)
    }
  }
  
