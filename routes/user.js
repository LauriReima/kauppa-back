const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Product = require('../models/product')


router.get('/', (req,res) => {
    User.find({}).then(note => {
        res.json(note)    
    }) 
})

router.get('/:id', (req,res,next) => {
    User.findById(req.params.id).then(user => {
        if (user) {
            res.json(user)
        }
        else {
            res.status(404).end()
        } 
    }).catch(err => next(err)) 
})

router.post('/',async (req,res) => {
    const { username, password } = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    console.log(passwordHash)
    const user = new User({
        username,
        passwordHash
    })	
    const  savedUser = () =>{
        user.save()
    } 

    User.find({username: user.username}).then(u => {
        if(u.length === 0){
            if (password.length > 3){
                savedUser()
                res.status(201).json(user)				
            }
            else {
                return res.status(400).json({
                    error: 'password too weak'
                })
            }
				
        }else {
            return res.status(400).json({
                error: 'user allready exists'
            })
        }	
    })
	
})

router.put('/:id', async (req, res,next) => {
    const body = req.body
    
    const user = {
        $push : {cart: [...body.product]},
    }
    console.log(body, 'huhaa')
    User.findByIdAndUpdate(req.params.id, 
        user, {new: true}).then(
        updatedUser => {
            res.json(updatedUser)
        }).catch(err => next(err))
    //user.save()
})


module.exports = router