const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const studentArray = require('./InitialData');
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get('/api/student', (req, res) => {
    res.json(studentArray)
  })
  
  // Get ID
  app.get('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const student = studentArray.find(s => s.id === id)
    if (student) {
      res.json(student)
    } else {
      res.status(404).send('Student not found')
    }
  })
  
  // Add new  record
  app.post('/api/student', (req, res) => {
    const { name, currentClass, division } = req.body
    if (name && currentClass && division) {
      const id = studentArray.length > 0 ? studentArray[studentArray.length - 1].id + 1 : 1
      studentArray.push({ id, name, currentClass, division })
      res.json({ id })
    } else {
      res.status(400).send('Incomplete student record')
    }
  })
  
  // Update by ID
  app.put('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { name } = req.body
    const student = studentArray.find(s => s.id === id)
    if (student && name) {
      student.name = name
      res.json({ message: 'Student record updated' })
    } else {
      res.status(400).send('Invalid student record or update')
    }
  })
  
  // Delete by ID
  app.delete('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const studentIndex = studentArray.findIndex(s => s.id === id)
    if (studentIndex !== -1) {
      studentArray.splice(studentIndex, 1)
      res.json({ message: 'Student record deleted' })
    } else {
      res.status(404).send('Student not found')
    }
  })

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   