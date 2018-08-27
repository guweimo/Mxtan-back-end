import { loginUser, searchUser } from '../../model/model'

class User {
    constructor() {

    }
    async login(req, res, next) {
        try {
            const user = await loginUser(req.body.name, req.body.pass)
            if (user !== null) {
                req.session.userid = user.id
                res.send({
                    status: 2000,
                    data: user
                })
            } else {
                res.send({
                    status: 2001,
                    message: '用户名或密码错误！'
                })
            }
        } catch(err) {
            res.send({
                status: 2001,
                message: '登录失败'
            })
        }
    }
    async getUser(req, res, next) {
        try {
            const user = await searchUser(req.query.id)
            if (user !== null) {
                res.send({
                    status: 2000,
                    data: user
                })
            } else {
                res.send({
                    status: 2001,
                    message: '不存在该用户！'
                })
            }
        } catch (err) {
            
        }
    }
}

export default new User()