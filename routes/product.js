const express = require('express')
const jwt = require('jsonwebtoken')
const Product = require('../models/product')
const User = require('../models/user')
const router = express.Router()

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

router.get('/', (req,res) =>{
    Product.find({}).then(product => {
        res.json(product)
    })
})

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id).then(product => {
        if(product){
            res.json(product)
        }
        else {
            res.status(404).end()
        }
    }).catch(err => next(err))
})

router.post('/', async (req,res)=>{
    const body = req.body
    if (!body.name) {
        return res.status(400).json({
            error: 'content missing proly'
        })
    }
    console.log(body)
    const product = new Product({
        name: body.name,
        price: body.price,
        image: body.image,
        category: body.category
    })
    const savedProduct = await product.save()
    
    res.json(savedProduct)
})

router.delete('/:id', (req,res, next) => {
    Product.findByIdAndRemove(req.params.id).then(product =>{
        res.status(204).end()
    }).catch(error => next(error))
})

router.put('/:id', (req, res, next) => {
    Product.findById(req.params.id)
})


module.exports = router