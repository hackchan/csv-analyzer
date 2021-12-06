const express = require('express')
const ReportService = require('./service')
const service = new ReportService()
const router = express.Router()

const { success } = require('../../../utils/response')

router.get('/', listarReportes)


function listarReportes(req, res, next) {
  try {
    const reportes = service.listar()
    success(req, res, entidades, 200)
  } catch (error) {
    next(error)
  }
}



module.exports = router
