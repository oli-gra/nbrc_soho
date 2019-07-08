import express from 'express'
import bodyParser from 'body-parser'
import routes from '../api/routes'

const app = express()
require('dotenv').config()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(
   bodyParser.urlencoded({
      extended: true
   })
)

app.use('/', routes)
app.listen(port)

