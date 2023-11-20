import express from "express";
import {join} from "node:path";
import kittenRoutes from './router/kitten.js'

const app = express();

const cwd = process.cwd()
const staticPath = join(cwd, 'public')

app.use(express.static(staticPath))

app.use(express.urlencoded({extended: false}))

app.use(kittenRoutes)


app.listen(8000, () => {
    console.log('server start')
})