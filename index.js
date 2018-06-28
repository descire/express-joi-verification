const Joi = require('joi')

class VerificationError extends Error {
  constructor (options) {
    super('Invalid Request Format Error')
    const { message, path } = options
    this.message = message
    this.path = path
  }
  get [Symbol.toStringTag] () {
    return 'VerificationError'
  }
}

exports = module.exports = function verification (schema) {
  return function (req, res, next) {
    if (!schema) {
      next()
    }

    const condition = {}
    const verificationObj = {}

    Object.keys(schema).forEach(key => {
      const item = schema[key]
      const requestObj = req[key]

      for (let k in item) {
        condition[k] = item[k]
        verificationObj[k] = requestObj[k]
      }
    })

    const s = Joi.object().keys(condition)

    const result = Joi.validate(verificationObj, s)
    const { error } = result
    if (error) {
      next(new VerificationError(error.details[0]))
    } else {
      next()
    }
  }
}