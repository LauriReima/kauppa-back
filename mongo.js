// const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
// const sisältö = process.argv[3]

// const url =
// `mongodb+srv://reimalauri:${password}@ecommerce.6yqc6jr.mongodb.net/?retryWrites=true&w=majority`
// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: sisältö,
//   important: true,
// })

// note.save().then(result => {
//   console.log(sisältö + ' added')
//   mongoose.connection.close()
// })

// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })
