import express from 'express'
import { addFavorite, removeFavorite } from '../controllers/favorites'

const router = express.Router()

router.post('/add', addFavorite)

router.delete('/remove/:favoriteId',removeFavorite)

export default router
