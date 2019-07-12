const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/todoApp', { useNewUrlParser: true })
.then(() => 'You are now connected to the TodoDatabase!')
.catch(err => console.error('Something went wrong', err))


module.exports = {mongoose}