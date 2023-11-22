import express from "express"
import dotenv from 'dotenv'
import {join} from 'node:path'
import userRoutes from './router/routes.js'
import session from 'express-session';
import message from "./middleware/message.js"

dotenv.config()

const cwd = process.cwd()
const staticPath = join(cwd, 'public')

const { PORT, HOST, SESSION_SECRET } = process.env

const app = express()

app.set('view engine', 'pug')
app.set('views', join(cwd, 'views'))


app.use(express.static(staticPath))
app.use(express.urlencoded({extended: false}))
app.use(session({
    name: 'user',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(message)

app.use('/', userRoutes)


app.use((req,res) => {
    res.status(404).send('page not found')
})

app.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`)
})