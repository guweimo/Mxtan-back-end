import express from 'express'
import Article from '../controller/article/article'

const router = express.Router()

router.get('/detail', Article.getDetail)

export default router
