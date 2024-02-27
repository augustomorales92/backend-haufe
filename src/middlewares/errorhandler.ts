import { HttpStatusCode } from 'axios'
import { ErrorRequestHandler, RequestHandler, NextFunction, Request, Response } from 'express'
import { errors } from '../constants'

export const unexpectedRequest: RequestHandler = (_req, res) => {
  res.status(HttpStatusCode.NotFound)
}

export const addErrorToRequestLog: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  res.locals.err = err
  console.log('aaaa', err)
  next(err)
}

export const defaultErrorRequestHandler: ErrorRequestHandler = (
  err,
  _req,
  res
) => {
  res.status(HttpStatusCode.BadRequest).send(err)
}

export const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  if (typeof err === 'string') {
    return res.status(400).json({ message: err })
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid Token' })
  }
  return res.status(500).json({ message: err.message })
}

export const unmatchedRoute: ErrorRequestHandler = (_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(HttpStatusCode.NotFound).send(errors['NO_ROUTED_MATCHED'])
}
