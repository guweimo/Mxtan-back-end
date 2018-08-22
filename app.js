import http from 'http'
// import createError from 'http-errors'
import express from 'express'
import path from 'path'
// import config from 'config-lite'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import router from './routes/index.js'
import session from 'express-session'

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
    )
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Credentials', true) //可以带cookies
    res.header('X-Powered-By', '3.2.1')

    if (req.method == 'OPTINOS') {
        res.send(200)
    } else {
        next()
    }
})

// app.use(cookieParser())

// app.use('/api/', indexRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/navList', addRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

router(app)

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

var server = http.createServer(app)

server.listen(port)

function normalizePort(val) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
}
