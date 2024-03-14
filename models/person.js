const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log(url)

mongoose.connect(url)
.then(result => {
    console.log(`connected to mongodb`)
})
.catch(error => {
    console.log('failed to connect to monogoDB', error.message)
})

const personSchema = mongoose.Schema({
    name:String,
    number:String
})
console.log(`connnecting to ${url}`)

personSchema.set('toJSON', {
transform : (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString() 
    delete returnedObject._id
    delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person',personSchema)
