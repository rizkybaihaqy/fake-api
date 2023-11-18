import {routes} from '#routes.js'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const originalJson = express.response.json
// @ts-ignore
express.response.json = function (obj) {
  const ok = this.statusCode >= 200 && this.statusCode < 300
  const timeStamp = new Date().toISOString()

  const responseObj = {
    error: ok ? undefined : {status: this.statusCode, ...obj},
    data: ok ? obj : undefined,
    ok: ok,
    timeStamp
  }

  originalJson.call(this, responseObj)
}

const app = express()
const port = process.env.PORT || 8080

app.use(morgan('dev'))

app.use(express.static('public'))
app.use(bodyParser.json())

app.use('/api/:seed', routes)

app.get('*', (req, res) => {
  const fullUrl = req.baseUrl + req.url.replace(/\?.*$/, '')
  res.status(404).json({
    message: `There is no such things as ${fullUrl
      .split('/')
      .slice(-1)} in ${fullUrl.split('/').slice(-2)[0]}`
  })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({message: 'This is your fault, not mine!'})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
