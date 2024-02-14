const express = require('express')
const router = express.Router()
const Note = require('../models/notes')


router.get('/', (req,res) => {
    //console.log(Product);
    Note.find({}).then(note => {
        res.json(note)    
    }) 
})

router.get('/:id', (req,res,next) => {
    Note.findById(req.params.id).then(product => {
        if (product) {
            res.json(product)
        }
        else {
            res.status(404).end()
        } 
    }).catch(err => next(err)) 
})

router.post('/', (req,res) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false
    })
    note.save().then(result =>{
        console.log('lähetetty')
        res.json(note)
    })   
})

router.delete('/api/notes/:id', (req,res, next) => {
    Note.findByIdAndRemove(req.params.id).then(product => {
        res.status(204).end()
    }).catch(err => next(err))
})

router.put('/api/notes/:id', (req,res,next) => {
    const body = req.body
    const product = {
        content: body.content,
        important: body.important,
    }
    Note.findByIdAndUpdate(req.params.id, product, {new: false}).then(
        updatedProd => {
            res.json(updatedProd)
        }).catch(err => next(err))
})

module.exports = router