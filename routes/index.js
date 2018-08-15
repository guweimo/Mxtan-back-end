import home from './home'
import sign from './sign'
import article from './article'

export default app => {
    app.use('/home', home)
    app.use('/sign', sign)
    app.use('/article', article)
}
