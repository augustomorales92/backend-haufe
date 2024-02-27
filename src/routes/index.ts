import { Router } from 'express'
import characterRouter from './characters'
import usersRouter from './users'
import favoritesRouter from './favorites'
import validateToken from '../middlewares/validateToken'

const router = Router()

router.use('/users', usersRouter)
router.use('/characters', validateToken, characterRouter)
router.use('/favorites', validateToken, favoritesRouter)

export default router
