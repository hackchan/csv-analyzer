const { error: ErrMessage } = require('../utils/response')
const boom = require('@hapi/boom')

function logError(err, req, res, next) {
  //error(req, res, err.message, 500)
  console.log('err:', err)
  next(err)
}

function wrapError(err, req, res, next) {
  if (!err.isBoom) {
    //boom.badImplementation(err)
    next(boom.teapot(err))
  }

  next(err)
}

function error(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err

  let responseError = {}
  responseError.message = payload
  ErrMessage(req, res, responseError, statusCode)
}

module.exports = {
  logError,
  wrapError,
  error
}
