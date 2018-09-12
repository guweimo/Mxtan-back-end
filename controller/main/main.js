import moment from 'moment'
import { findNavData, findPageList, insertArticle, searchArticle } from '../../model/model'

class Main {
    constructor() {

    }

    // 获取导航列表数据
    async getNavList(req, res, next) {
        try {
            const navlist = await findNavData()
            res.send({
                status: 2000,
                data: navlist
            })
        } catch(err) {
            res.send({
                status: 2001,
                message: '获取导航失败！'
            })
        }
    }

    // 获取列表数据
    async getPageList(req, res, next) {
        try {
            let type = req.body.type || ''
            const list = await findPageList(type)

            // 处理日期时间
            for (let item of list) {
                item.date = moment(item.current_time).format('YYYY-MM-DD')
                item.current_time = moment(item.current_time).format('YYYY-MM-DD HH:mm:ss')
                item.update_time = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss')
            }
            
            let data = {
                result: list,
                total: 0
            }

            res.send({
                status: 2000,
                data: data
            })
        } catch(err) {
            res.send({
                status: 2001,
                message: '获取内容失败！'
            })
        }
    }

    // 发布博文
    async addArticle(req, res, next) {
        try {
            let param = [req.body.title, req.body.description, req.body.marktext, req.body.type]
            const result = await insertArticle(...param)
            
            if (result.affectedRows > 0) {
                res.send({
                    status: 2000,
                    data: result.insertId
                })
            }
        } catch(err) {
            res.send({
                status: 2001,
                message: '添加失败！'
            })
        }
    }
    
    // 搜索
    async searchTitle(req, res, next) {
        try {
            const result = await searchArticle(req.body.title)
            let data = {
                result,
                total: 0
            }
            res.send({
                status: 2000,
                data
            })
        } catch(err) {
            res.send({
                status: 2001,
                message: '搜索失败！'
            })
        }
    }
}

export default new Main()
