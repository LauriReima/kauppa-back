const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/', (req,res) => {
	User.find({}).then(note => {
		res.json(note)    
	}) 
})

router.get('/:id', (req,res,next) => {
	User.findById(req.params.id).then(product => {
		if (product) {
			res.json(product)
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

	const user = new User({
		username,
		passwordHash
	})
	
	const savedUser = await user.save()

	res.status(201).json(savedUser)
})

module.exports = router