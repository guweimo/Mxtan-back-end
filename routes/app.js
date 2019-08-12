
import express from 'express'
import App from '../controller/app'

const router = express.Router()

router.get('/fetch', App.fetchZhihu)
router.post('/list', App.getList)
router.post('/detail', App.getDetail)

export default router
