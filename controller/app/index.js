import { getListPage, fetchDetail, saveData } from '../../model/appModel'
import request from '../../utils/request'
import moment from 'moment'

class App {
    constructor() {
        
    }

    async getQueryList(req, res) {
        
    }

    async getArticleById(req, res) {
        var id = req.body.id
        var result = await fetchDetail(id)
        // 判断是否存在，如果不存在就返回错误信息
        if (result === null) {
            res.send({
                status: 2001,
                message: '不存在该博文！'
            })
        }
        res.send({
            status: 2000,
            data: result
        })
    }

    async saveArticle(req, res) {
        try {
            let param = [req.body.title, req.body.description, req.body.marktext, req.body.type]
            const result = await insertArticle(...param)
            
            if (result.affectedRows > 0) {
                res.send({
                    status: 2000,
                    data: result.insertId
                })
            }
            res.send({
                status: 2001,
                message: '添加失败！'
            })
        } catch(err) {
            res.send({
                status: 2001,
                message: '添加失败！'
            })
        }
    }

    // 操作
    async operateType (req, res) {
        
    }
}

export default new App()
