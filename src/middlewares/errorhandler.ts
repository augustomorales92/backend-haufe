import { HttpStatusCode } from 'axios'
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { errors } from '../constants'

export const addErrorToRequestLog: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  res.locals.err = err
  next(err)
}

export const defaultErrorRequestHandler: ErrorRequestHandler = (
  err,
  _req,
  res
) => {
  res.status(HttpStatusCode.BadRequest).send(err)
}

export const unmatchedRoute: ErrorRequestHandler = (_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(HttpStatusCode.NotFound).send(errors['NO_ROUTED_MATCHED'])
}
