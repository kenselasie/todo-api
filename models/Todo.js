const mongoose = require('mongoose')

const Todo = mongoose.model('Todo',{
    dateCreated:{
        type: Date,
        default: Date.now
    },
    dateDue:{
        type: Number
    },
    accomplished:{
        type: Boolean,
        default: false
    },
    author:{
        type: String,
        required: true,
        default: 'Ken'
    },
    note:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})
module.exports = {Todo}