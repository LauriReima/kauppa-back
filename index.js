require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Product = require('./models/product')
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
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('/', (req,res) => {
    res.send('<h1>Hello world</h1>')
})
app.get('/info', (req,res) => {
    const aika = new Date().toString()

    res.send(`<p>Phonebook has info for ${notes.length}</p>
    <p>${aika}</p>`)
})

app.get('/api/notes', (req,res) => {
    //console.log(Product);
    Product.find({}).then(product => {
        res.json(product)    
    })
    
})
app.get('/api/notes/:id', (req,res,next) => {
    Product.findById(req.params.id).then(product => {
       if (product) {
        res.json(product)
    }
    else {
        res.status(404).end()
    } 
    }).catch(err => next(err))
     
})
const generId = () => {
    const maxId = notes.length > 0
            ? Math.max(...notes.map(n => n.id))
            : 0
            return maxId + 1
}
app.post('/api/notes', (req,res) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    // const note = {
    //     id: generId(),
    //     content: body.content,
    //     important: body.important || false
    // }
    const note = new Product({
        content: body.content,
        important: body.important || false
    })
    note.save().then(result =>{
        console.log('lähetetty');
       // mongoose.connection.close()
       res.json(note)
    })
    //notes = notes.concat(note)
    
})
app.delete('/api/notes/:id', (req,res, next) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        res.status(204).end()
    }).catch(err => next(err))
})

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
