import { getBlogAllType, fetchDetail, saveData, getBlogList } from '../../model/appModel'
import request from '../../utils/request'
import moment from 'moment'

class App {
    constructor() {
        this.getList = this.getList.bind(this)
    }

    convertTypeAndDate(data, typeList) {

        let typeObj = {}
        for (let item of typeList) {
            typeObj[item.id] = item
        }

        let result = []
        for (let item of data) {
            const obj = {
                id: item.id,
                type: typeObj[item.type_id].title,
                title: item.title,
                content: item.content,
                description: item.description,
                createTime: moment(item.create_time).format('YYYY-MM-DD'),
                updateTime: moment(item.update_time).format('YYYY-MM-DD')
            }
            result.push(obj)
        }

        return result
    }

    async getList(req, res) {
        let data = req.body
        let page = parseInt(data.page) - 1
        let limit = data.limit
        console.log(this)
        data.currentSize = limit * parseInt(page)
        let typeList = await getBlogAllType()
        let result = await getBlogList(data)
        result = this.convertTypeAndDate(result, typeList)
        if (result.length === 0) {
            res.send({
                status: 2001,
                message: '不存在数据！'
            })
        }
        res.send({
            status: 2000,
            data: result
        })
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
        console.log(req.body)
        try {
            let data = req.body
            let content = data.content
            let description = content.replace(/<[^>]+>/g, "")
            if (description.length > 100) {
                description = description.split(0, 100) + '...'
            }
            let param = [data.title, content, description, data.marktext, data.type]
            
            const result = await saveData(...param)
            
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

    async getType(req, res) {
        try {
            const navlist = await getBlogAllType()
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
}

export default new App()
