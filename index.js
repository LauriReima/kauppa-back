require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Product = require('./models/notes')
const { connection, default: mongoose } = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())
//app.use(express.static('build'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// const requestLogger = (req, res, next) => {
//     console.log('Method:', req.method);
//     console.log('Path:', req.path);
//     console.log('Body:', req.body);
//     console.log('---');
//     next()
// }
// app.use(requestLogger)
const productRouter = require('./routes/product')
const loginRouter = require('./routes/user')
const noteRouter = require('./routes/notes')

//app.use('/', loginRouter)
app.use('/api/notes', noteRouter)
app.use('/api/products', productRouter)

const generId = () => {
    const maxId = notes.length > 0
            ? Math.max(...notes.map(n => n.id))
            : 0
            return maxId + 1
}

const errorHandler = (err, req, res, next) => {
    if (err.name === 'CastError'){
        return res.status(400).send({ error: 'id:tä ei löydy'})
    }
    next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`); 
})
