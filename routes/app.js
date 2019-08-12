
import express from 'express'
import App from '../controller/app'

const router = express.Router()

router.post('/list', App.getQueryList)
router.post('/detail', App.getArticleById)
router.post('/save', App.saveArticle)

export default router
