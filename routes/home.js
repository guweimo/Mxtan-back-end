import express from 'express'
import Main from '../controller/main/main'

const router = express.Router()

router.get('/navList', Main.getNavList)

router.post('/list', Main.getPageList)

export default router
