import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/Users'
import { Users, Error, TokenResponse, CompleteUser } from '../types'
import { errors } from '../constants'

export const getUserById = async ({ id }): Promise<CompleteUser> => {
  try {
    const res = await User.findByPk(id)
    const user = res.toJSON()
    if (!user) throw new Error('wrong data')
    return user
  } catch (e) {
    console.log(e)
  }
}

export const getUsername = async ({ username }): Promise<CompleteUser> => {
  try {
    const res = await User.findOne({ where: { username: username } })
    const user = res?.toJSON()
    if (!user) throw new Error('wrong data')
    return user
  } catch (e) {
    console.log(e)
  }
}

export const checkIfUserAlreadyExist = async ({
  username,
  email
}): Promise<CompleteUser | null> => {
  try {
    let user
    const checkByUsername = await User.findOne({
      where: { username: username }
    })
    user = checkByUsername?.toJSON()
    const checkByEmail = await User.findOne({ where: { email: email } })
    user = checkByEmail?.toJSON()
    if (!user) return null
    return user
  } catch (e) {
    console.log(e)
  }
}

export const registerUser = async ({
  username,
  password,
  email
}: Users): Promise<void | Error> => {
  const user = await checkIfUserAlreadyExist({ username, email })
  if (user) throw errors['ALREADY_EXIST']
  const hash = await bcrypt.hash(password, 13)
  await User.create({ username, email, password: hash })
}

export const loginUser = async ({
  username,
  password
}): Promise<TokenResponse> => {
  try {
    const user = await getUsername({ username })
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
