const express = require('express')
const app = express()

app.use(express.json())

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
    response.json(persons)
})

app.get('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
      response.json(person)
    }
    else {
      response.status(400).json({
        error:'page not found'
      })
    }
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
    if (persons.find(p => p.name === body.name)) {
      response.json({
        error:"name must be unique"
      })
    }
    else {
      const person = {
        id: Math.floor(Math.random() * 10000),
        name: body.name,
        number: body.number
      }
      persons = persons.concat(person)
      response.json(person)
    }
  }
})
app.get('/info',(request, response) => {
  console.log(request)
  response.send(`Phonebook has info for ${persons.length} people<br>${new Date().toString()}`)
})
const port = 3001
app.listen(port, () => {console.log(`server is running in ${port}`)})