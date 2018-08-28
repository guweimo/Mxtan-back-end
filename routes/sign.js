import express from 'express'
import User from '../controller/main/user'

const router = express.Router()

router.post('/loginUser', User.login)
router.post('/registerUser', User.register)

export default router
