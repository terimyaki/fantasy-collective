const expressGraphQL = require('express-graphql')
const schema = require('./schema')
const config = require('config')

const dev = config.util.getEnv('NODE_ENV') !== 'production'

module.exports = expressGraphQL({
  schema,
  graphiql: dev,
  pretty: dev,
})
