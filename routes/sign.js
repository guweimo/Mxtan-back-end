import express from 'express'
import db from '../config/db'
import User from '../controller/main/user'

const router = express.Router()

router.post('/loginUser', User.login)

export default router
