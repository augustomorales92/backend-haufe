import { HttpStatusCode } from 'axios'
import { success } from '../constants'
import { defaultErrorRequestHandler } from '../middlewares/errorhandler'
import * as userServices from '../services/users'

export const signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body
    await userServices.registerUser({ username, password, email })
    res.status(HttpStatusCode.Ok).send(success['SUCCESS'])
  } catch (e) {
    defaultErrorRequestHandler(e, req, res, next)
  }
}

export const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await userServices.loginUser({ username, password })
    res.status(HttpStatusCode.Ok).send(user)
  } catch (e) {
    console.log(e)
    defaultErrorRequestHandler(e, req, res, next)
  }
}
