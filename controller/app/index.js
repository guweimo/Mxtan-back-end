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
        let typeList = await getBlogAllType()
        var result = await fetchDetail(id)
        // 判断是否存在，如果不存在就返回错误信息
        if (result === null) {
            res.send({
                status: 2001,
                message: '不存在该博文！'
            })
        }
        let typeObj = {}
        for (let item of typeList) {
            typeObj[item.id] = item
        }
        const obj = {
            id: result.id,
            type: typeObj[result.type_id].title,
            title: result.title,
            content: result.content,
            description: result.description,
            createTime: moment(result.create_time).format('YYYY-MM-DD'),
            updateTime: moment(result.update_time).format('YYYY-MM-DD')
        }
        result = obj
        res.send({
            status: 2000,
            data: result
        })
    }

    async saveArticle(req, res) {
        try {
            let data = req.body
            let content = data.content
            let description = content.replace(/<[^>]+>/g, "")
            if (description.length > 100) {
                console.log(1)
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
