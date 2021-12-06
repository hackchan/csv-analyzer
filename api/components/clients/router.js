const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    const { limit, offset } = req.query
    if (limit && offset) {
      res.json({ limit, offset })
    } else {
      next('no hay parametros')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
