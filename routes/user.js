const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.send('<h1>Hello world</h1>')
})
router.get('/info', (req,res) => {
    const aika = new Date().toString()

    res.send(`<p>Phonebook has info for </p>
    <p>${aika}</p>`)
})

module.exports = router