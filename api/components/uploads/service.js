const path = require('path')
const csvtojson = require('csvtojson')
const fs = require('fs').promises
const {
  cleanJSON,
  findSeparadorComa,
  findSeparadorPunto,
  findNoExistComas,
  validIsNumber,
  isValidData,
  validFormatDate,
  removeObjDuplic,
  findDuplicateObject,
  findColumsExtra,
  validStringNoEmpty,
  validStringNA
} = require('../../../utils/config')
class uploadsService {
  constructor(file) {
    this.file = file
    this.ruta = path.join(
      __dirname,
      '../../../',
      `public/uploads/${this.file.filename}`
    )

    this.dictionary = require('../../../utils/dictionary.json')
  }
  readfile() {
    return new Promise(async (resolve, reject) => {
      try {
        const file = await fs.readFile(this.ruta, 'latin1')
        resolve(file)
      } catch (err) {
        reject(err)
      }
    })
  }
  async getValidNamesColumns(reportName, reportHeader) {
    return new Promise(async (resolve, reject) => {
      try {
     
        const totalColumHeader =
          Object.keys(reportHeader).length
        const totalColumnDic = Object.keys(
          this.dictionary[reportName]
        ).length
        const columnsValids = Object.keys(
          this.dictionary[reportName]
        )
        if (
          Number(totalColumHeader) > Number(totalColumnDic)
        ) {
          throw new Error(
            `El archivo enviado tiene mas columnas de las solicitadas en el diccionario de datos, solo de tener las siguientes columnas: ${columnsValids.join()}.`
          )
        } else if (totalColumHeader < totalColumnDic) {
          throw new Error(
            `El archivo enviado tiene menos columnas de las solicitadas en el diccionario de datos, solo de tener las siguientes columnas: ${columnsValids.join()}`
          )
        } else {
          resolve(true)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  async getValidTotalColumnas(reportName, reportHeader) {
    return new Promise(async (resolve, reject) => {
      try {
        const reportColumHeader = Object.keys(reportHeader)
        const columnsValids = Object.keys(
          this.dictionary[reportName]
        )
        const totalColumsFile = reportColumHeader.length
        const totalColumsDicc = columnsValids.length
        if (totalColumsFile !== totalColumsDicc) {
          // const diferencia = await findColumsExtra(
          //   reportColumHeader,
          //   columnsValids
          // )
          throw new Error(
            `la cantidad de columnas del archivo es de ${totalColumsFile} y no coincide con el total del diccionario de datos que son ${totalColumsDicc}, si tiene la misma cantidad de columnas valide abriendo el archivo en excel y que no tenga una fila corrida.`
          )
        }
        reportColumHeader.map((column, index) => {
          if (
            column.toLowerCase() !==
            columnsValids[index].toLowerCase()
          ) {
            throw new Error(
              `el nombre del encabezado del archivo ${column.toLowerCase()} es diferente al solicitado ${columnsValids[
                index
              ].toLowerCase()}`
            )
          }
          return column
        })
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  async getValidDatatype(reportName, reportData) {
    return new Promise(async (resolve, reject) => {
      try {
      
        const dictionary = this.dictionary[reportName]
      
        let numeroFila = 2
        for (let fila of reportData) {
          const filaClean = await cleanJSON(fila)
          const filaKeys = Object.keys(filaClean)
          for (let columna of filaKeys) {
            const campo = filaClean[columna]
            const regla = dictionary[columna]
       
            await isValidData(
              numeroFila,
              columna,
              campo,
              regla
            )

            if (regla.tipo === 'Number' && regla.coma) {
              await findSeparadorPunto(
                numeroFila,
                columna,
                campo,
                regla
              )
              await findSeparadorComa(
                numeroFila,
                columna,
                campo
              )
            } else if (
              regla.tipo === 'Number' &&
              !regla.coma
            ) {
              await validIsNumber(
                numeroFila,
                columna,
                campo
              )
              await findNoExistComas(
                numeroFila,
                columna,
                campo,
                regla
              )
              await findSeparadorPunto(
                numeroFila,
                columna,
                campo,
                regla
              )
            } else if (regla.tipo === 'Date') {
              await validFormatDate(
                numeroFila,
                columna,
                campo,
                regla
              )
            } else if (regla.tipo === 'String') {
              await validStringNoEmpty(
                numeroFila,
                columna,
                campo,
                regla
              )
              await validStringNA(
                numeroFila,
                columna,
                campo,
                regla
              )
            }
          }
          numeroFila++
        }

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
  async csvtojson() {
    try {
      const response = await csvtojson({
        delimiter: '|',
        checkColumn: false,
        noheader: false,
        ignoreEmpty: false,
        trim: true,
        defaultEncoding: 'utf8',
        output: 'json'
      }).fromFile(this.ruta, { encoding: 'utf8' })
      return await Promise.resolve(response)
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  findColumsDate(columns) {
    return new Promise(async (resolve, reject) => {
      try {
        const fechas = columns
          .split(',')
          .filter((col) => {
            return col.startsWith('FECHA')
          })
          .join()
        resolve(fechas)
      } catch (err) {
        reject(err)
      }
    })
  }

  async columnsHeader(header) {
    try {
      const columnas = Object.keys(header)
      const columreplace = columnas.map((celda) => {
        return celda
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/á/gi, 'a')
          .replace(/é/gi, 'e')
          .replace(/í/gi, 'i')
          .replace(/ó/gi, 'o')
          .replace(/ú/gi, 'u')
          .replace(/ñ/gi, 'n')
          .trim()
          .toUpperCase()
          .replace(new RegExp(' ', 'g'), '_')
          .replace('(', '')
          .replace(')', '')
          .replace('%', 'PORCENTAJE')
          .replace('A�O', 'ANIO')
          .replace('ANO', 'ANIO')
      })
      return await Promise.resolve(columreplace.join())
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  async getConfigFile(columna, entidad) {
    return await Promise.resolve({
      entidad: entidad.nombre,
      sector: entidad.sector,
      sub_sector: entidad.subsector,
      bad_records_path: `/mnt/plata/gpif/${entidad.dbe}/bad_records`,
      destination_path: `/plata/gpif/${entidad.dbe}/Backups`,
      origin_data_type: 'CSV',
      source_options: {
        sep: '|',
        encoding: 'ISO-8859-1',
        header: 'true'
      },
      column_names: columna,
      date_columns: await this.findColumsDate(columna),
      cast_columns: {
        ANIO_REPORTE: 'int',
        ENTIDAD_REPORTANTE: 'bigint'
      },
      replace_and_convert: 'PENDIENTE',
      Porcentaje_rango_0_1: 'PORCENTAJE_EJECUCION',
      format_date: 'yyyy-MM-dd',
      shuffle: 10
    })
  }
}

module.exports = uploadsService
