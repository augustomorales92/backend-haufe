import { ErrorHandler } from "../types"

export const errors: ErrorHandler = {
  EXPIRED_TOKEN: {
    success: false,
    message: 'Token expired',
    code: 'EXPIRED_TOKEN'
  },
  AUTHENTICATION_ERROR: {
    success: false,
    message: 'Authentication error',
    code: 'AUTHENTICATION_ERROR'
  },
  INVALID_TOKEN: {
    success: false,
    message: 'Invalid token',
    code: 'INVALID_TOKEN'
  },
  AUTHORIZATION_ERROR: {
    success: false,
    message: 'Authorization error',
    code: 'AUTHORIZATION_ERROR'
  },
  SOMETHING_WRONG: {
    success: false,
    message: 'Authorization error',
    code: 'SOMETHING_WRONG'
  },
  WRONG_DATA: {
    success: false,
    message: 'wrong data',
    code: 'WRONG_DATA'
  },
  NO_ROUTED_MATCHED: {
    success: false,
    message: 'No routes matched',
    code: 'NO_ROUTED_MATCHED'
  },
  NO_CREATED: {
    success: false,
    message: 'Error trying to create new user',
    code: 'NO_CREATED'
  },
  ALREADY_EXIST: {
    success: false,
    message: 'Some data already exist in our data base',
    code: 'ALREADY_EXIST'
  }
}

export const success = {
  SUCCESS: {
    success: true,
    message: 'everything is ok',
    code: 'SUCCESS'
  }
}
