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
    name: {
        type: String,
        minLength:3,
        required: true,
    },
    number: {
        type: String,
        minLength:8,
        validate: {
            validator: (v) => /\d{2,3}-\d+$/.test(v)
        }
    }
})
console.log(`connnecting to ${url}`)

personSchema.set('toJSON', {
transform : (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() 
    delete returnedObject._id
    delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person',personSchema)
