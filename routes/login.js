const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/', async (req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null 
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
    const userToken = {
        username: user.username,
        id: user.id
    }
    const token = jwt.sign(
        userToken, 
        process.env.SECRET,
        { expiresIn: 60*60 })

    res.status(200).send({token, username: user.username})
})

module.exports = router