const express = require('express')

// NextJs related
const next = require('next')
const { parse } = require('url')
const { resolve } = require('path')
const config = require('config')

// GraphQL Related
const bodyParser = require('body-parser')
const graphqlRouter = require('./graphql')

const PORT = config.get('server').port
const dev = config.util.getEnv('NODE_ENV') !== 'production'

const frontend = next({
  dir: resolve(__dirname, '../frontend'),
  dev,
})

frontend.prepare()
  .then(() => {
    const app = express()

    // GraphQL Server
    app.use('/graphql', bodyParser.json(), graphqlRouter)

    // Set up next frontend app
    const handle = frontend.getRequestHandler()
    app.use((req, res) => {
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    })

    app.listen(PORT, (err) => {
      if (err) throw err
      console.log(`Server listening on port ${PORT} ...`)
    })
  })
