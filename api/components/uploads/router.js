const express = require('express')
const router = express.Router()
const uploadService = require('./service')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { limit } = require('../../../config_params')
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(
      null,
      uuidv4() +
        path.extname(file.originalname).toLocaleLowerCase()
    )
  }
})
console.log('limits:', limit)
const upload = multer({
  storage,
  dest: 'public/uploads/',
  limits: { fileSize: limit * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    //const csv = '/application/vnd.ms-excel/'
    //const filestypes = `${/csv/}`
    //file.mimetype === 'text/csv'
    //file.mimetype === 'application/vnd.ms-excel'
    //console.log('file:',file.originalname)
    //console.log('mimetype:',file.mimetype)
    //const mimetype = filestypes.test(file.mimetype)
    //console.log('mimetype:',mimetype)
    var ext = path.extname(file.originalname)
    if (ext !== '.csv') {
      cb(new Error('Solo se permite archivos csv'), null)
      //return cb(new Error('Solo se permite archivos csv'))
    }
    cb(null, true)
  },
  onError: function (err, next) {
    next(err)
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
    const diccionarioSel = req.body.entity
    if (!diccionarioSel || diccionarioSel === '') {
      throw new Error(
        'El diccionario seleccionado no esta disponible'
      )
    }

    const serviceUpload = new uploadService(req.file)
    const dataCSV = await serviceUpload.csvtojson()
    const header = dataCSV[0]
    await serviceUpload.deleteFile()

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
