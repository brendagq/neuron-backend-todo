const express = require('express')
const cors = require('cors')

const userRoute = require('./routers/user')
const taskRoute = require('./routers/task')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/user', userRoute)
app.use('/api/task', taskRoute)

module.exports = app