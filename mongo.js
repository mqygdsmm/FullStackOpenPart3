const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mqygywl:${password}@cluster0.5xwqu9w.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = mongoose.Schema({
    name:String,
    number:String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    name = process.argv[3]
    number = process.argv[4]
    person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log(`added ${name} ${number} to the phonebook`)
        mongoose.connection.close()
    })
}
else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}