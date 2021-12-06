const { success } = require('../../../utils/response')

const express = require('express')
const router = express.Router()

router.get('/', listaProductos)
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params
    res.json({
      codigo: Number(id),
      name: 'nintendo ds',
      price: 1000
    })
  } catch (error) {
    next(error)
  }
})

async function listaProductos(req, res, next) {
  try {
    const listaProductos = [
      {
        codigo: 1,
        name: 'nintendo ds',
        price: 1000
      },
      {
        codigo: 2,
        name: 'nintendo switch',
        price: 1200
      }
    ]
    success(req, res, listaProductos)
  } catch (error) {
    next(error)
  }
}

module.exports = router
