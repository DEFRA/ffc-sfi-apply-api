const Joi = require('joi')
const mqConfig = require('./mq-config')
const { development, production, test } = require('./constants').environments

// Define config schema
const schema = Joi.object({
  port: Joi.number().default(3001),
  env: Joi.string().valid(development, test, production).default(development),
  cacheName: Joi.string(),
  redisHost: Joi.string(),
  redisPort: Joi.number().default(6379),
  redisPassword: Joi.string().default(''),
  redisPartition: Joi.string().default('ffc-sfi-apply-api'),
  sessionTimeoutMinutes: Joi.number().default(30),
  restClientTimeoutMillis: Joi.number().default(60000)
})

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  cacheName: 'redisCache',
  redisPartition: process.env.REDIS_PARTITION,
  redisHost: process.env.REDIS_HOSTNAME,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
  sessionTimeoutMinutes: process.env.SESSION_TIMEOUT_IN_MINUTES,
  restClientTimeoutMillis: process.env.REST_CLIENT_TIMEOUT_IN_MILLIS
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the Joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === development
value.isProd = value.env === production

value.eligibilitySubscription = mqConfig.eligibilitySubscription
value.standardsSubscription = mqConfig.standardsSubscription
value.validateSubscription = mqConfig.validateSubscription
value.calculateSubscription = mqConfig.calculateSubscription
value.submitSubscription = mqConfig.submitSubscription

// Don't try to connect to Redis for testing or if Redis not available
value.useRedis = !value.isTest && value.redisHost !== undefined

if (!value.useRedis) {
  console.info('Redis disabled, using in memory cache')
}

value.catboxOptions = {
  host: value.redisHost,
  port: value.redisPort,
  password: value.redisPassword,
  tls: value.isProd ? {} : undefined,
  partition: value.redisPartition
}

module.exports = value
