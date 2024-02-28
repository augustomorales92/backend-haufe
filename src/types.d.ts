import { Request } from 'express'

export type Location = {
  name: string
  url: string
}
type apiInfo = {
  next?: string
  prev?: string
}

export type APIResponse = {
  info: apiInfo
  results: Characters[]
}

export interface Characters {
  created: string
  episode: string[]
  gender: string
  id: number
  image: string
  name: string
  species: string
  status: string
  type: string
  url: string
  origin: Location
  location: Location
  isFav: boolean
}

export interface Error {
  success: boolean
  message: string
  code: string
}

export type ErrorHandler = { [key: string]: Error }


export interface Users {
  username: string
  password: string
  email: string
}

export interface TokenFromUser extends Users {
  id: string
}

export interface TokenResponse extends Partial<Users> {
  id: string
  token: string
}

export interface CustomRequest extends Request {
  decoded: TokenFromUser
}

export interface QueryProps {
  name: string
  page: string
}
