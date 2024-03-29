const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    passwordHash: String,
    cart: [
        {
            type: mongoose.Schema.Types.Object, 
            ref: 'Product',
            unique: false
        }
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User