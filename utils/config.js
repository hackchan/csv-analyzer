const moment = require('moment')

const findColumsExtra = (columsFile, columsDictionary) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('columsFile', columsFile)
      console.log('columsDictionary', columsDictionary)
      if (columsFile.length > columsDictionary.length) {
        let difference = columsFile.filter(
          (column) =>
            !columsDictionary.includes(column.toLowerCase())
        )
        resolve(difference)
      } else {
        let difference = columsDictionary.filter(
          (column) => !columsFile.includes(column)
        )
        resolve(difference)
      }
    } catch (error) {
      reject(error)
    }
  })
}

const findDuplicateObject = (reportData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fila1
      let fila2
      let filtrados = reportData.filter(
        (
          reportDataItem,
          reportDataIndice,
          reportDataArray
        ) => {
          let indice = reportDataArray.findIndex(
            (reportDataArrayItem) => {
              return (
                JSON.stringify(reportDataArrayItem) ===
                JSON.stringify(reportDataItem)
              )
            }
          )
          let isIndx = indice !== reportDataIndice
          if (isIndx) {
            fila1 = indice
            fila2 = reportDataIndice
          }
          return isIndx
        }
      )

      if (filtrados.length > 0) {
        throw new Error(
          `la fila=> ${fila1 + 2} con la fila=> ${
            fila2 + 2
          } error=> se esta repitiendo la siguiente informacion ${JSON.stringify(
            filtrados
          )} `
        )
      }
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const removeObjDuplic = (report) => {
  return new Promise(async (resolve, reject) => {
    try {
      let findIndex = 0
      let filtrados = report.filter(
        (actual, indice, arreglo) => {
          if (
            arreglo.findIndex((valorArreglo) => {
              return (
                JSON.stringify(valorArreglo) ===
                JSON.stringify(actual)
              )
            }) !== indice
          ) {
            findIndex = indice
          }
          return (
            arreglo.findIndex((valorArreglo) => {
              return (
                JSON.stringify(valorArreglo) ===
                JSON.stringify(actual)
              )
            }) !== indice
          )
        }
      )

      if (filtrados.length > 0) {
        throw new Error(
          `fila=> ${findIndex} error=> se esta repitiendo la siguiente informacion ${JSON.stringify(
            filtrados
          )} `
        )
      }

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const cleanJSON = (fila) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = Object.keys(fila).reduce(
        (prev, current) => ({
          ...prev,
          [current.toLowerCase()]: fila[current]
        }),
        {}
      )
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

const findNoExistComas = (
  numeroFila,
  nombreColuma,
  campo,
  regla
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tot = campo.split(',').length
      if (tot > 1) {
        throw new Error(
          `columna => ${nombreColuma}
           fila    => ${numeroFila}
           valor   => ${campo}
           error   => ${regla.message} `
        )
      }

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const validFormatDate = (
  numeroFila,
  nombreColuma,
  campo,
  regla
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !moment(
          campo,
          moment.HTML5_FMT.DATE,
          true
        ).isValid()
      ) {
        throw new Error(
          `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${
            campo ? campo : 'vacio'
          } error=> ${regla.message} `
        )
      }

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const validStringNoEmpty = (
  numeroFila,
  nombreColuma,
  campo
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!campo || campo.length === 0) {
        throw new Error(
          `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${
            campo ? campo : 'vacio'
          } error=> No puede haber campos de texto vacios, recuerde el valor por defecto N/A`
        )
      }
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const validStringNA = (numeroFila, nombreColuma, campo) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !campo ||
        campo === 'na' ||
        campo === 'n/a' ||
        campo === 'n/A' ||
        campo === 'n A' ||
        campo === 'N/a'
      ) {
        throw new Error(
          `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${
            campo ? campo : 'vacio'
          } error=> solo es valido el valor por defecto para texto => N/A`
        )
      }
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const validIsNumber = (numeroFila, nombreColuma, campo) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!/^[0-9]+$/.test(campo)) {
        throw new Error(
          `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${
            campo ? campo : 'vacio'
          } error=> Debe ser un valor numerico `
        )
      }

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const isValidData = (
  numeroFila,
  nombreColuma,
  campo,
  regla
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (regla.valid != 0 && Array.isArray(regla.valid)) {
        if (!regla.valid.includes(campo)) {
          throw new Error(
            `columna => ${
              nombreColuma ? nombreColuma : 'vacio'
            } fila=> ${
              numeroFila ? numeroFila : 'vacio'
            } valor=> ${
              campo ? campo : 'vacio'
            } error=> debe contener uno de los siguientes valores ${
              regla.valid
            }`
          )
        }
      }
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const findSeparadorComa = (
  numeroFila,
  nombreColuma,
  campo,
  regla
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tot = campo.split(',').length
      if (tot > 2) {
        throw new Error(
          `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${campo} error=> ${regla.message} `
        )
      }

      resolve(Number(campo.replace(/,/g, '.')))
    } catch (error) {
      reject(error)
    }
  })
}

const findSeparadorPunto = (
  numeroFila,
  nombreColuma,
  campo,
  regla
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tot = campo.split('.').length
      if (tot > 1) {
        throw new Error(
          `[ columna =>  ${nombreColuma} ]
           [ fila    =>  ${numeroFila}   ]
           [ valor   =>  ${campo}        ]
           [ error   =>  ${regla.message}] `
        )
      }
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  cleanJSON,
  findNoExistComas,
  findSeparadorComa,
  findSeparadorPunto,
  validIsNumber,
  isValidData,
  validFormatDate,
  removeObjDuplic,
  findDuplicateObject,
  findColumsExtra,
  validStringNoEmpty,
  validStringNA
}
