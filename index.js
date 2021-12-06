const path = require('path')
const express = require('express')
const routers = require('./network/router')
const morgan = require('morgan')
const { wrapError, error } = require('./middlewares/error')
const app = express()
app.set(
  'views',
  path.join(__dirname, '/api/components/views')
)
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3010)
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
/**Routes */

routers(app)

/**Error MiddleWare */
//app.use(logError)
app.use(wrapError)
app.use(error)

app.listen(app.get('port'), () => {
  console.log('running in port:' + port)
})
