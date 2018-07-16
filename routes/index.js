import home from './home'
import sign from './sign'

export default app => {
    app.use('/home', home)
    app.use('/sign', sign)
}
