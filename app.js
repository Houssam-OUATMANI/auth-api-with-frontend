const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()

const {LOCAL_PORT} = process.env
const databaseConnexion = require('./models/database/connexion')
const routes = require('./controllers/controllers')

databaseConnexion()
app.set('view engine' , 'ejs')
app.use(express.static(path.join(__dirname , 'public')))
app.use(express.urlencoded({extended : true}))
app.use(routes)


app.listen(LOCAL_PORT)