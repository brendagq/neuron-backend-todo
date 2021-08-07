require('dotenv').config()

const dbConnect = require('./src/lib/db')
const server = require('./src/server')

const port = process.env.PORT || 3000
const listenServer = function () {
  return new Promise((resolve, reject) => {
    server.listen( port , () => {
        console.log('Server Up')
        resolve()
    })
  })
}

async function main () {
    await dbConnect()
    await listenServer()
}

main()
    .then(() => {
        console.log('API Ready')
    })
    .catch(error => {
        console.error('Error: ', error)
    })