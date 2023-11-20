import express from 'express';
import routes from './router/routes.js';

const app = express()

app.use(express.urlencoded({extended: true})) // parse les données de formulaire POST PUT PATCH
app.use(express.json()) // parse les données reçues au format JSON

app.use('/',routes) // == app.use('/', routes)

app.listen(8000, () => {
    console.log('server start')
})