const express = require('express')
const router = express.Router()
const entidadService = require('../entidad/service')
const service = new entidadService()
const reportService = require('../reports/service')
const serviceReport = new reportService()
const path = require('path')

router.get('/', (req, res) => {
  const reportes = serviceReport.listar()
  res.render('index', {
    title: 'Analizer CSV',
    reportes
  })
})

router.get('/new-entry', (req, res) => {
  const entidades = service.listar()
  res.render('new-entries', {
    title: 'generar archivo de configuracion',
    entidades
  })
})

router.post('/new-entry', (req, res) => {
  const entidades = service.listar()
  console.log('data de formulario', req.body)
  res.render('new-entries', {
    title: 'Prueba new Entries',
    entidades
  })
})

router.get('/dicci', (req, res) => {
  res.render('diccionario', {
    title: 'Diccionario'
  })
})

router.get(
  '/ejecucion-presupuestal-ingresos',
  (req, res) => {
    res.render('ejecucionIngreso', {
      title: 'Ejecución presupuestal de ingresos'
    })
  }
)

router.get('/relacion-ingresos', (req, res) => {
  res.render('relacionIngreso', {
    title: 'Relacion de Ingresos'
  })
})

router.get('/ejecucion-presupuestal-gastos', (req, res) => {
  res.render('ejecucionGastos', {
    title: 'Ejecución presupuestal de gastos'
  })
})

router.get('/relacion-cdps', (req, res) => {
  res.render('relacionCdps', {
    title: 'Relacion de CDPs'
  })
})

router.get('/relacion-compromisos', (req, res) => {
  res.render('relacionCompromisos', {
    title: 'Relacion de compromisos'
  })
})

router.get('/relacion-obligaciones', (req, res) => {
  res.render('relacionObligaciones', {
    title: 'Relacion de Obligaciones'
  })
})

router.get('/relacion-pagos', (req, res) => {
  res.render('relacionPagos', {
    title: 'Relacion de Pagos'
  })
})

router.get('/auxiliar-saldos', (req, res) => {
  res.render('auxiliarConSaldos', {
    title: 'Auxiliar con Saldos'
  })
})

router.get('/libro-mayor-balance', (req, res) => {
  res.render('libroMayorBalance', {
    title: 'Libro Mayor y Balance '
  })
})

router.get('/estado-situacion-financiera', (req, res) => {
  res.render('estadoFinanciero', {
    title: 'Estado Situacion Financiera'
  })
})

router.get('/programa-proyecto', (req, res) => {
  res.render('programasyproyectos', {
    title: 'Programas y Proyectos'
  })
})

router.get('/contratacion', (req, res) => {
  res.render('contratacion', {
    title: 'Contratacion'
  })
})

router.get('/obras', (req, res) => {
  res.render('obras', {
    title: 'Obras e Infraestructura'
  })
})

router.get(
  '/ejecucion-presupuestal-ingresos-ejemplo',
  (req, res) => {
    const file = path.resolve(
      __dirname,
      '../../../public/EJECUCION_PRESUPUESTAL_DE_INGRESO_20210131.xlsx'
    )
    res.download(file)
  }
)

router.get('/relacion-ingresos-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/RELACION_DE_INGRESOS_20210131.xlsx'
  )
  res.download(file)
})

router.get('/relacion-gastos-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/EJECUCION_PRESUPUESTAL_DE_GASTOS_20210131.xlsx'
  )
  res.download(file)
})

router.get('/relacion-cdps-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/RELACION_DE_CDPS_20210131.xlsx'
  )
  res.download(file)
})

router.get('/relacion-compromisos-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/RELACION_DE_COMPROMISOS_20210131.xlsx'
  )
  res.download(file)
})

router.get('/relacion-obligaciones-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/RELACION_DE_OBLIGACIONES_20210131.xlsx'
  )
  res.download(file)
})

router.get('/relacion-pagos-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/RELACION_DE_PAGOS_20210131.xlsx'
  )
  res.download(file)
})

/*** */

router.get('/auxiliar-saldos-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/AUXILIAR CON SALDOS 20210131.xlsx'
  )
  res.download(file)
})

router.get('/libro-mayor-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/LIBRO_MAYOR_Y_BALANCE_20211031.xlsx'
  )
  res.download(file)
})

router.get('/estado-financiero-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/ESTADO_DE_SITUACION_FINANCIERA_20210131.xlsx'
  )
  res.download(file)
})

router.get('/programas-proyecto-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/PROGRAMAS_Y_PROYECTOS_20210131.xlsx'
  )
  res.download(file)
})

router.get('/contratacion-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/CONTRATACION_20210131.xlsx'
  )
  res.download(file)
})

router.get('/obras-ejemplo', (req, res) => {
  const file = path.resolve(
    __dirname,
    '../../../public/MATRIZ_SEGUIMIENTO_OBRAS_20210131.xlsx'
  )
  res.download(file)
})
module.exports = router
