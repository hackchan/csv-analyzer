const { writeFile } = require('../../../utils/readfile')

class ReportService {
  constructor() {
    this.repostesDB = require('../../../utils/report.json')
  }


  listar() {
    return this.repostesDB
  }

}
module.exports = ReportService