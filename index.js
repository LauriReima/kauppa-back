const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Product = require('./models/notes')

const app = express()
const logger = require('./utils/logger')
const config = require('./utils/config')
app.use(cors())
app.use(express.json())
//app.use(express.static('build'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// const requestLogger = (req, res, next) => {
//     console.log('Method:', req.method);
//     console.log('Path:', req.path);
//     console.log('Body:', req.body);
// 	console.log('Seerver:', res.getHeader('Server'));
// 	console.log('server:', res.get('Server'));
//     next()
// }
// app.use(requestLogger)
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const noteRouter = require('./routes/notes')
const loginRouter = require('./routes/login')

//app.use('/', loginRouter)
app.use('/api/notes', noteRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(logger.errorHandler)

 
app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`) 
})
