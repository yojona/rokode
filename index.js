const express = require('express')
const app = express()

const registroRouter = require('./routes/registro')
const validacionRouter = require('./routes/validacion')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', registroRouter, validacionRouter)

app.listen(process.env.PORT || 3000)
