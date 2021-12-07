require('dotenv').config()
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.NODE_PORT || 3010,
  limit: process.env.LIMIT_FILE_MB
}

module.exports = config
