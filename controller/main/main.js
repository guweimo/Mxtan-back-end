import moment from 'moment'
import { findNavData, findPageList } from '../../model/model'

class Main {
    constructor() {

    }
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
                message: '获取导航失败'
            })
        }
    }
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

            res.send({
                status: 2000,
                data: list
            })
        } catch(err) {
            res.send({
                status: 2001,
                message: '获取内容失败'
            })
        }
    }
}

export default new Main()
