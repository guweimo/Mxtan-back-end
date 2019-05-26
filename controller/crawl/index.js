import { saveZhihuList } from '../../model/crawlModel'
import request from '../../utils/request'

class Crawl {
    constructor() {
        this.offset = 0
        
        // 地址
        this.url = ``

        this.fetchZhihu = this.fetchZhihu.bind(this)
        this.updateUrl = this.updateUrl.bind(this)

        this.updateUrl()
    }

    updateUrl() {
        this.url = `https://www.zhihu.com/api/v4/members/xiao-jing-mo/answers?include=data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Cmark_infos%2Ccreated_time%2Cupdated_time%2Creview_info%2Cquestion%2Cexcerpt%2Cis_labeled%2Clabel_info%2Crelationship.is_authorized%2Cvoting%2Cis_author%2Cis_thanked%2Cis_nothelp%2Cis_recognized%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=${this.offset}&limit=20&sort_by=created`
    }

    async saveZhihuData(body) {
        const data = body.data
        for (let item of data) {
            const a = {
                title: item.question.title,
                author: item.author.name,
                content: item.content,
                excerpt: item.excerpt,
                updated_time: item.updated_time,
                create_time: item.created_time
            }
            await saveZhihuList(a.author, a.title, a.content, a.excerpt, a.create_time, a.updated_time)
        }
    }

    // 获取某个用户的回答
    async fetchZhihu(req, res, next) {
        const cookie = 'd_c0="ADDC1taTKAuPTuwVC2I36T60yrmdbLVWB8A=|1484481670"; __DAYU_PP=vIBNU7zFefzaR22f7RYV65b228ffcb5d; tst=f; _xsrf=ewYv9r7UAgxYaOarlyHUWJoD6nRJFyZb; _zap=aa0bf954-b7b2-4e71-b5e2-0b6a9e042fa9; __utma=51854390.1912597863.1550582164.1550582164.1550582164.1; __utmz=51854390.1550582164.1.1.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/follow; __utmv=51854390.100-1|2=registration_date=20131031=1^3=entry_date=20131031=1; z_c0="2|1:0|10:1554466461|4:z_c0|92:Mi4xS3RFZUFBQUFBQUFBTU1MVzFwTW9DeVlBQUFCZ0FsVk5uSlNVWFFBaGNpLVJNUlc5QmdCYVJoeERTcGF1Qkl6cnJB|ae89cbbe4423defe0bade22264eb67b358f17092fe81d1d1db7fb5b43512353b"; q_c1=982f4ced0e034fc6a8afbb360bd2805f|1558700532000|1484481670000; tgw_l7_route=060f637cd101836814f6c53316f73463'

        const useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
        const headers = {
            'Cookie': cookie,
            'User-Agent': useragent,
        }

        let isend = false
        let num = 1
        while(!isend) {
            this.updateUrl()
            const options = {
                url: this.url,
                headers: headers,
            }
            const self = this
            let result = await request(options)
            if (result.error === null && result.response.statusCode == 200) {
                let body = JSON.parse(result.body)

                this.saveZhihuData(body)

                isend = body.is_end
                num ++
                this.offset += 20
            } else {
                console.log('*** ERROR 请求失败', result.error)
                isend = true
            }
        }
        console.log(num)
        res.send({
            status: 2000,
            message: '请求成功',
        })
    }
}

export default new Crawl()
