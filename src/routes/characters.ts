import express from 'express'
import { getCharacters } from '../controllers/characters'

const router = express.Router()

router.get('/all', getCharacters)

export default router
