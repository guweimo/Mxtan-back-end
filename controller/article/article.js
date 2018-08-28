import moment from 'moment'
import { searchDetail } from '../../model/model'

class Article {
    constructor() {

    }
    // 查询博文详情
    async getDetail(req, res, next) {
        let result = await searchDetail(req.query.id)
        // 判断是否存在，如果不存在就返回错误信息
        if (result === null) {
            res.send({
                status: 2001,
                message: '不存在该博文！'
            })
        }

        let {id, author, title, description: content, update_time: dateTime} = result
        const data = {
            id,
            author,
            title,
            content,
            dateTime: moment(dateTime).format('YYYY-MM-DD')
        }

        res.send({
            status: 2000,
            data
        })

    }
}

export default new Article()
