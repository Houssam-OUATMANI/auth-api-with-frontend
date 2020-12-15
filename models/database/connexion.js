const mongoose = require('mongoose')
const {DATABASE_URI} = process.env

function databaseConnexion() {
    let oneInstance = null

    if (oneInstance === null){
        oneInstance = mongoose.connect(DATABASE_URI, {useNewUrlParser :true ,useUnifiedTopology :true})
        .then(() => console.log('Connect to the database'))
        .catch(err => console.log('Cannot reach database'))
    }

    return oneInstance
}


module.exports = databaseConnexion