import { loginUser } from '../../model/model'

class User {
    constructor() {

    }
    async login(req, res, next) {
        try {
            const user = loginUser([req.body.name, req.body.pass])
            console.log(user)
        } catch(err) {
            res.send({
                status: 2001,
                message: '登录失败'
            })
        }
    }
}

export default new User()