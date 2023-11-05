const dotenv = require('dotenv')
dotenv.config();




module.exports = {
    development: {
      username: "fouser",
      password: "qwerty",
      database: "sricare",
      host: "localhost",
      dialect: 'postgres'
    },
    test: {
      username: "fouser",
      password: "qwerty",
      database: "sricare",
      host: "localhost",
      dialect: 'postgres'
    },
    production: {
      username: "fouser",
      password: "qwerty",
      database: "sricare",
      host: "localhost",
      dialect: 'postgres'
    }
}
