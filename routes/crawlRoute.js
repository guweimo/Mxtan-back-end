
import express from 'express'
import Crawl from '../controller/crawl'

const router = express.Router()

router.get('/fetch', Crawl.fetchZhihu)
router.get('/list', Crawl.getList)

export default router
