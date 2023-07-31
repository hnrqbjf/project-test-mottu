const dotenv = require("dotenv")
dotenv.config({ path:".env"})

const env = {
  url: process.env.URL
}

module.exports = env