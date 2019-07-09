import express from 'express'
import bodyParser from 'body-parser'
import routes from '../api/routes.mjs'

const app = express()
const port = '3000'

app.use(bodyParser.json())
app.use(
   bodyParser.urlencoded({
      extended: true
   })
)

app.use('/', routes)
app.listen(port)

export default app