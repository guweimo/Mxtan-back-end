import express from 'express'
import Main from '../controller/main/main'
import User from '../controller/main/user'

const router = express.Router()

router.get('/navList', Main.getNavList)

router.post('/list', Main.getPageList)

router.post('/addArticle', Main.addArticle)

router.post('/searchArticle', Main.searchTitle)

router.get('/getUserInfo', User.getUser)

export default router
