require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
morgan.token('postData', (req, res) => {return JSON.stringify(req.body)})
const customFormat = ':method :url :status :res[content-length] - :response-time ms (:postData)';
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(customFormat))
app.use(cors())


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

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.json(result)
  })
  .catch(error => {
    next(error)
  })
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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, {new:true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => {
    next(error)
  })
})
app.get('/info',(request, response) => {
  Person.countDocuments({})
  .then(count => {
  response.send(`Phonebook has info for ${count} people<br>${new Date().toString()}`)
  })
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'castError') {
    response.status(400).send('mlformatted Id')
  }
  else {
    console.log('i am here')
    next(error)
  }
}

app.use(errorHandler)
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {console.log(`server is running in ${PORT}`)})