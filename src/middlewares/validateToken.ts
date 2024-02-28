import { HttpStatusCode } from 'axios'
import jwt from 'jsonwebtoken'
import { CustomRequest } from '../types'
import { errors } from '../constants'
import { getUserById } from '../services/users'

const validateToken = async (req: CustomRequest, res, next) => {
  const auhorizationHeader = req.headers.authorization
  let result

  if (!auhorizationHeader) {
    return res.status(HttpStatusCode.Unauthorized).send(errors['AUTHORIZATION_ERROR'])
  }

  const token = req.headers.authorization?.split(' ')[1]

  const options = {
    expiresIn: process.env.TOKEN_EXPIRATION
  }

  try {
    result = jwt.verify(token, process.env.SECRET, options)
    const user = await getUserById({ id: result.id })
    if (!user) {
      result = errors['AUTHORIZATION_ERROR']

      return res.status(HttpStatusCode.Forbidden).json(result)
    }

    if (user.username !== result.username) {
      result = errors['INVALID_TOKEN']

      return res.status(HttpStatusCode.Unauthorized).send(result)
    }

    (req as CustomRequest).decoded = result

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(HttpStatusCode.Forbidden).send(errors['EXPIRED_TOKEN'])
    }

    return res.status(HttpStatusCode.Forbidden).send(errors['AUTHENTICATION_ERROR'])
  }
}

export default validateToken
