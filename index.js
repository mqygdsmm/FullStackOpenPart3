require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
morgan.token('postData', (req, res) => {return JSON.stringify(req.body)})
const customFormat = ':method :url :status :res[content-length] - :response-time ms (:postData)';
const Person = require('./models/person')

app.use(express.json())
app.use(morgan(customFormat))
app.use(cors())
app.use(express.static('dist'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
      response.json(result)
    })
})

app.get('/api/persons/:id',(request,response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    persons = persons.filter(p => p.id !== id)
    response.json(person)
  }
  else {
    response.json({
      error:"data to delete is already been removed"
    })
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name || !body.number) {
    response.json({
      error:"name or number not provided"
    })
  }
  else {
      const person = new Person({
        name: body.name,
        number: body.number
      })
      person.save().then(result => {
        console.log(`added ${body.name} ${body.number} to phonebook`)
        response.json(result)
      })
    }
  })
app.get('/info',(request, response) => {
  console.log(request)
  response.send(`Phonebook has info for ${persons.length} people<br>${new Date().toString()}`)
})
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {console.log(`server is running in ${PORT}`)})