import { loginUser } from '../../model/model'

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
}

export default new User()