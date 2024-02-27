const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const logger = require('./utils/logger')
const config = require('./utils/config')
app.use(cors())
app.use(express.json())
//app.use(express.static('build'))
morgan.token('body', function (req, res) {
    if (req.body.password !== undefined){
        return JSON.stringify(req.body.username)	
    }
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(logger.errorHandler)

 
app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`) 
})
