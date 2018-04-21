const axios = require('axios')
const qs = require('querystring')
const _ = require('lodash/fp')
const config = require('config')

const artsyConfig = config.get('artsy')

const BASE_URL = 'https://api.artsy.net/api'
const defaultOptions = {
  totalCount: 1,
  size: 50,
}

const instance = axios.create({
  baseURL: BASE_URL,
})

const createParams = _.mapKeys.bind(null, _.snakeCase)
const createOutput = _.mapKeys.bind(null, _.camelCase)

const getToken = async ({ id, secret }) => {
  const body = qs.stringify({ client_id: id, client_secret: secret })
  const xappToken = await axios.post(`${BASE_URL}/tokens/xapp_token`, body)
    .then(({ status, statusText, data }) => {
      if (status < 200 || status >= 300) {
        const error = new Error(statusText)
        error.statusCode = status
        throw error
      }
      return data
    })
    .then(({ token }) => token)

  return xappToken
}

const getArtworks = async (options = {}) => {
  const formatted = createParams(options)
  const params = Object.assign({ ...defaultOptions }, formatted)

  const result = await instance.get('/artworks', { params })
    .then(({ status, statusText, data }) => {
      if (status !== 200) {
        const error = new Error(statusText)
        error.statusCode = status
        throw error
      }
      return data
    })
    .then(createOutput)

  return result
}

const getArtists = async (options = {}) => {
  const formatted = createParams(options)
  const params = Object.assign({ ...defaultOptions }, formatted)

  const result = await instance.get('/artists', { params })
    .then(({ status, statusText, data }) => {
      if (status !== 200) {
        const error = new Error(statusText)
        error.statusCode = status
        throw error
      }
      return data
    })
    .then(({ _embedded: { artists } }) => artists)
    .then(data => data.map(createOutput))

  return result
}

const getAuctions = async (options = {}) => {
  const formatted = createParams(options)
  const params = Object.assign({ ...defaultOptions }, formatted)

  const result = await instance.get('/sales', { params })
    .then(({ status, statusText, data }) => {
      if (status !== 200) {
        const error = new Error(statusText)
        error.statusCode = status
        throw error
      }
      return data
    })
    .then(createOutput)

  return result
}

// Add Request Interceptor to handle token
const tokenKey = 'x-xapp-token'
instance.interceptors.request.use(async (instanceConfig) => {
  if (!instanceConfig.headers.common[tokenKey]) {
    const token = await getToken(artsyConfig)
    Object.assign(instanceConfig.headers.common, { [tokenKey]: token })
  }

  return instanceConfig
})

instance.interceptors.response.use(null, async (error) => {
  const { response: { status } } = error
  if (status === 401) instance.defaults.headers.common[tokenKey] = undefined

  throw error
})

module.exports = {
  getToken,
  getArtworks,
  getArtists,
  getAuctions,
}
