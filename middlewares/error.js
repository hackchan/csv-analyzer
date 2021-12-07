const { error: ErrMessage } = require('../utils/response')
const boom = require('@hapi/boom')
const { limit } = require('../config_params')
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
  if (err.code == 'LIMIT_FILE_SIZE') {
    console.log('payload:', payload)
    payload.message = `Tamaño  de archivo es demasiado grande. maximo permitido ${limit}MB`
  }
  let responseError = {}
  responseError.message = payload
  //ErrMessage(req, res, responseError, statusCode)
  console.log('go::', err.code)
  res.render('error', {
    title: 'Errores CSV',
    err: responseError.message.message
  })
}

module.exports = {
  logError,
  wrapError,
  error
}
