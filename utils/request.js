import request from 'request'

function requestMethod(options) {
    return new Promise((resolve, reject) => {
        request(options, function(error, response, body) {
            let result = {
                error: error,
                response: response,
                body: body
            }
            if (error === null && response.statusCode == 200) {
                resolve(result)
            } else {
                reject(result)
            }
        })
    })
}

export default requestMethod
