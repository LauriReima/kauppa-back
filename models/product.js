const mongoose = require('mongoose')
const config = require('../utils/config')
const url = config.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url).then(result => {
	console.log('yhdistetty mongoon')
}).catch((err) => {
	console.log('error yhdistyksesä', err.message)
})

const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	image: String || null,
	category: String
})

productSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})
const Product = mongoose.model('Product', productSchema)

module.exports = Product