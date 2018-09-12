import { loginUser, searchUser, registerUser, firstTypeUser } from '../../model/model'
import crypto from 'crypto'
import moment from 'moment'

class User {
    constructor() {
        this.encryption = this.encryption.bind(this)
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }

    // 登录
    async login(req, res, next) {
        try {
            const pass = this.encryption(req.body.pass)
            const user = await loginUser(req.body.name, pass)
            if (user !== null) {
                req.session.userid = user.id
                const { id, username, email, avatar, name } = user
                const data = {
                    id,
                    username,
                    email,
                    avatar,
                    name
                }
                res.send({
                    status: 2000,
                    data
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

    // 注册
    async register(req, res, next) {
        let result = { message: '' }    // 返回信息
        let formData = req.body
        const nameUser = await firstTypeUser('username', formData.name)
        const emailUser = await firstTypeUser('email', formData.email)
        if (nameUser || emailUser) {
            result = {
                status: 2001,
                type: nameUser ? 'name' : 'email',
                message: nameUser ? '该用户名已存在！' : '该邮箱已存在！'
            }
        } else {
            formData.pass = this.encryption(formData.pass)
            const user = await registerUser(formData.name, formData.pass, formData.email)
            if (user && user.insertId) {
                result = {
                    status: 2000,
                    message: '注册成功！'
                }
            } else {
                result = {
                    status: 2001,
                    message: '注册失败'
                }
            }
        }
        res.send(result)
    }

    // 获取单个用户信息
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
            res.send({
                status: 2001,
                message: '查询失败！'
            })
        }
    }

    // 加密密码，并截取2-6的字符串合并一起加密
    encryption(pass) {
        const newpass = this.MD5(this.MD5(pass).substr(2, 6) + this.MD5(pass))
        return newpass
    }

    // md5加密
    MD5(pass) {
        const md5 = crypto.createHash('md5')
        return md5.update(pass).digest('base64')
    }
}

export default new User()
