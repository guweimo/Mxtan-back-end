
import express from 'express'
import Crawl from '../controller/crawl'

const router = express.Router()

router.get('/fetch', Crawl.fetchZhihu)
router.post('/list', Crawl.getList)
router.post('/detail', Crawl.getDetail)


export default router
