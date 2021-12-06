const express = require('express')
const entidadService = require('./service')
const service = new entidadService()
const router = express.Router()
//const db = require('../../../utils/db')
const { success } = require('../../../utils/response')

router.get('/', listarEntidad)
router.get('/:id', listarEntidadByOne)
router.get('/name/:name', listarEntidadByName)
router.post('/', addEntidad)

function listarEntidad(req, res, next) {
  try {
    const entidades = service.listar()
    success(req, res, entidades, 200)
  } catch (error) {
    next(error)
  }
}

async function listarEntidadByName(req, res, next) {
  try {
    const { name } = req.params
    const entidades = await service.listarByName(name)
    success(req, res, entidades, 200)
  } catch (error) {
    next(error)
  }
}

async function listarEntidadByOne(req, res, next) {
  try {
    const { id } = req.params
    const entidades = await service.listarByOne(id)
    success(req, res, entidades, 200)
  } catch (error) {
    next(error)
  }
}

async function addEntidad(req, res, next) {
  try {
    const body = req.body
    await service.add(body)
    success(req, res, { message: 'created!', data: body })
  } catch (err) {
    next(err)
  }
}

module.exports = router
