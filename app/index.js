import express from 'express'
import morgan from 'morgan'
import {api} from './routes/api.js'
import {web} from './routes/web.js'
import {notFound} from './error/not-found.js'

const originalJson = express.response.json
// @ts-ignore
express.response.json = function (obj) {
  const ok = this.statusCode >= 200 && this.statusCode < 300
  const timeStamp = new Date().toISOString()

  const responseObj = {
    error: ok
      ? undefined
      : {status: this.statusCode, ...obj},
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
app.use('/', web)
app.use('/api/:seed', api)
app.get('*', notFound)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({message: 'This is your fault, not mine!'})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
