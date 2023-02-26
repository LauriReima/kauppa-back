const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

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
    res.json(notes)
})
app.get('/api/notes/:id', (req,res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        res.json(note)
    }
    else {
        res.status(404).end()
    } 
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
    const note = {
        id: generId(),
        content: body.content,
        important: body.important || false
    }

    notes = notes.concat(note)
    res.json(note)
})
app.delete('/api/notes/:id', (req,res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`); 
})
