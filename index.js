const express = require('express')
const app = express()


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

app.get('/info',(request, response) => {
  console.log(request)
  response.send(`Phonebook has info for ${persons.length} people<br>${new Date().toString()}`)
})
const port = 3001
app.listen(port, () => {console.log(`server is running in ${port}`)})