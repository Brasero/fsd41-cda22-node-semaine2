import express from "express"
import dotenv from "dotenv"
import {join} from 'node:path';
import router from './router/route.js'

dotenv.config()

const cwd = process.cwd()
const staticPath = join(cwd, 'public')
const app = express()
app.set('view engine', 'pug')
app.use(express.static(staticPath))

app.use(router)
app.listen(8000, () => {
    console.log("Server listening at http://localhost:8000");
})