const express = require('express')
const app = express()
app.use(express.json()) 
const morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));


let persons = [
    {
            "name": "Arto Hellas", 
            "number": "040-123456",
            "id": 1
          },
          { 
            "name": "Ada Lovelace", 
            "number": "39-44-5323523",
            "id": 2
          },
          { 
            "name": "Dan Abramov", 
            "number": "12-43-234345",
            "id": 3
          },
          { 
            "name": "Mary Poppendieck", 
            "number": "39-23-6423122",
            "id": 4
          }
  ]

  app.get('/info', (req, res) => {
    const cnt = persons.length
    const content = `Phonebook has info for ${cnt} people`

    const datevalue =  new Date();
    res.send(`${content} <br /><br /> ${datevalue}`)
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const randomId = Math.floor(Math.random() * 10000); 
    return randomId + 1
  }
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }

    const names = persons.map(person => person.name)
    if (names.indexOf(body.name) >= 0){  
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = {
      content: body.content,
      name: body.name,
      numner: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })