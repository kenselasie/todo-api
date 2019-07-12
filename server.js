const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const {mongoose} = require('./dbs/mongoose')
const {Todo} = require('./models/Todo')


const app = express()
app.use(bodyParser.json())

//Adding data to the database
app.post('/addtodos', (req, res) => {
    const todo = new Todo({
        accomplished: req.body.accomplished,
        dateDue: req.body.dateDue,
        note: req.body.note,
        author: req.body.author
    })

    todo.save().then((doc) => {
        res.send(doc)
    },(e) => {
        res.status(400).send(e)
    })
})

app.get('/alltodos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e)
    })
})

//Getting Todos By Id
app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    if(!ObjectID.isValid(id)){
       return res.status(404).send()
    }
    
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send()            
        }
        res.send({todo})
    }).catch((e) => {
        res.status(400).send()
    })
    
})
// Getting Todos By Author
app.get('/authortodos/:author', (req, res) => {
    const author = req.params.author
    // const author = req.query.name
    console.log(author)

    Todo.find({author}).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((e) => {
        res.status(400).send()
    })
})

    

//Deleting by id
app.delete('/deletetodo/:id', (req, res) => {
    const id = req.params.id
    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo){
            return res.status(404).send()
        }
        res.status(200).send({
            message: 'this data has been deleted',
            todo
        })
    }).catch((e) => {
        res.status(400).send()
    })
})
// Deleting by specific author
app.delete('/deleteByAuthor/:author', (req, res) => {
    const author = req.params.author
    Todo.findOneAndDelete(author).then((todo) => {
        res.status(200).send({
            message: 'succesfully deleted this todo',
            todo
        })
    }).catch((e) => {
        res.status(400).send()
    })
})

//Updating a route
app.patch('/updatetodo/:id', (req, res) => {
    const id = req.params.id
    const body = _.pick(req.body, ['note', 'accomplished', 'dateDue'])

    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    if(_.isBoolean(body.accomplished && body.accomplished)) {
        body.dateDue = new Date().getTime()
    } else{
        body.accomplished = false
        body.dateDue = null
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((e) => {
        res.status(400).send()
    })

})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Started on port ${3000}`)
})

module.exports = {app}