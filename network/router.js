const express = require('express')
const productos = require('../api/components/products/router')
const clients = require('../api/components/clients/router')
const uploads = require('../api/components/uploads/router')
const entidad = require('../api/components/entidad/router')
const cliUI = require('../api/components/cli/router')
const routers = (app) => {
  const router = express.Router()

  app.use('/api', router)
  router.use('/products', productos)
  router.use('/clients', clients)
  router.use('/entidad', entidad)
  router.use('/entidad', entidad)
  app.use('/', router)
  router.use('/', cliUI)
  router.use('/uploads', uploads)
}

module.exports = routers
