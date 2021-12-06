const express = require('express')
const router = express.Router()
const entidadService = require('../entidad/service')
const service = new entidadService()
const uploadService = require('./service')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(
      null,
      'entidad' +
        path.extname(file.originalname).toLocaleLowerCase()
    )
  }
})

const upload = multer({
  storage,
  dest: 'public/uploads/',
  limits: { fileSize: 90000000 },
  fileFilter: function (req, file, cb) {
    file.mimetype === 'text/csv' ? cb(null, true) : cb(null, false)
  }
})

router.get('/', loadingExcel)
router.post('/', upload.single('file'), loadingCSV)

function loadingExcel(req, res, next) {
  try {
    res.send({ loading: true })
  } catch (err) {
    next(err)
  }
}

async function loadingCSV(req, res) {
  try {
    console.log(req.file)
    const diccionarioSel = req.body.entity
    if (!diccionarioSel || diccionarioSel === '') {
      throw new Error(
        'El diccionario seleccionado no esta disponible'
      )
    }
    
    
    const serviceUpload = new uploadService(req.file)
    const dataCSV = await serviceUpload.csvtojson()
    const header = dataCSV[0]
  

    /**VALIDACIONES */
    await serviceUpload.getValidTotalColumnas(
      diccionarioSel,
      header
    )
    await serviceUpload.getValidNamesColumns(
      diccionarioSel,
      header
    )
    await serviceUpload.getValidDatatype(
      diccionarioSel,
      dataCSV
    )

    res.render('infoOK', {
      title: 'Archivo correcto',
      file: req.file.originalname
    })
   
  } catch (err) {
    res.render('error', {
      title: 'Errores CSV',
      err
    })
  }
}

module.exports = router
