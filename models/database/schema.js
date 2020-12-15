
const mongoose = require('mongoose')


const user = mongoose.Schema({
    name : {
        type : String,
        minLength : 4,
        maxLength : 25,
        required :true
    },
    email : {
        type : String,
        required :true
    },
    password : {
        type : String,
        min : 8,
        max : 1024,
        required :true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

const User = mongoose.model('user' , user)
module.exports = User