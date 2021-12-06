const { writeFile } = require('../../../utils/readfile')

class EntidadService {
  constructor() {
    this.entidadesDB = require('../../../utils/db.json')
  }

  add(data) {
    return new Promise(async (resolve, reject) => {
      try {
        //const file = await readFile('db.json')
        const fileObj = this.listar()
        fileObj[data.namedepart].push(data)
        let json = JSON.stringify(fileObj)
        const entidad = await this.listarByOne(
          data.identidad
        )
        if (!entidad) {
          await writeFile('db.json', json)
          resolve('ok')
        } else {
          reject('no se puede crear entidad ya existe')
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  update(id, changes) {}

  listar() {
    return this.entidadesDB
  }

  listarByName(name) {
    return new Promise((resolve, reject) => {
      try {
        const datos = this.entidadesDB[name]
        if (datos && datos.length > 0) {
          resolve(this.entidadesDB[name])
        } else {
          throw new Error('No se encontraron datos!!!')
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  listarByOne(id) {
    return new Promise((resolve, reject) => {
      try {
        const entidades = [
          ...this.entidadesDB.arauca,
          ...this.entidadesDB.boyaca,
          ...this.entidadesDB.casanare
        ]
        const entidad = entidades.find(
          (item) => item.identidad == id
        )
        if (entidad) {
          resolve(entidad)
        } else {
          throw new Error('No se encontro entidad!!!')
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = EntidadService
