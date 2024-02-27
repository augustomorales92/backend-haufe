import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/Users'
import { Users, Error, userToken, TokenResponse } from '../types'
import { errors } from '../constants'

export const registerUser = async ({
  username,
  password,
  email
}: Users): Promise<void | Error> => {
  try {
    const hash = await bcrypt.hash(password, 13)
    await User.create({ username, email, password: hash })
  } catch (error) {
    console.error('Error trying to create new user:', error)
    return { id: 2, message: 'Error trying to create new user' }
  }
}

export const getUserById = async ({ id }): Promise<userToken> => {
  try {
    const res = await User.findByPk(id)
    const user = res.toJSON()
    if (!user) throw new Error('wrong data')
    return user
  } catch (e) {
    console.log(e)
  }
}

export const loginUser = async ({
  username,
  password
}): Promise<TokenResponse> => {
  try {
    const res = await User.findOne({ where: { username: username } })
    const user = res.toJSON()
    if (!user) throw errors['WRONG_DATA']
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw errors['WRONG_DATA']
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    )
    return { id: user.id, username: username, token }
  } catch (e) {
    console.error(e)
    throw e
  }
}
