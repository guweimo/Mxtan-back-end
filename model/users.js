const Model = require('./model')
const crypto = require('crypto')

class Users extends Model{
    /*
    User 是一个保存用户数据的 model
    现在只有两个属性 username 和 password
    */
    constructor() {
        let name = 'users'
        super(name)
        this.username = ''
        this.password = ''
    }

    saltedPassword(password, salt='$!@><?>HUI&DWQa`') {
        let md5 = function(password) {
            crypto.createHash('md5').update(password)
        }
        let hash1 = md5(password)
        let hash2 = md5(hash1 + salt)
        return hash2
    }

    register(params) {
        let name = params.username || ''
        let pwd = params.password || ''
        if (name === '') {
            return {
                error: '',
            }
        }
    }

    validateLogin(params) {
        let username = params.username || ''
        let pwd = params.password || ''
        let reqParams = {
            username
        }
        let user = Users.findBy(reqParams)
        return user
    }

    loginUser(params) {
        let username = params.username
        let passsword = params.password
        let user = this.findBy(params)
        return user
    }
}

module.exports = Users