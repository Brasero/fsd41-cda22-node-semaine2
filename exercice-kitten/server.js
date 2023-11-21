import express from "express";
import {join} from "node:path";
import kittenRoutes from './router/kitten.js'
import productRoutes from './router/product.js'

const app = express();

const cwd = process.cwd()
const staticPath = join(cwd, 'public')

const myMiddleware = (req, res, next) => {
    console.log('hello middleware');
    next()
}

const myMiddlewareWithParam = (message) => {


    return (req, res, next) => {
        console.log(message)
        next()
    }
}

app.use(express.static(staticPath))

app.use(express.urlencoded({extended: false}))

const middlewares = [
    myMiddlewareWithParam('hello'),
    myMiddleware
]


// placer les middleware avant la déclaration des routes /!\
app.use('/', kittenRoutes)

//app.use(middlewares)
app.use('/product', middlewares, productRoutes)

app.listen(8000, () => {
    console.log('server start')
})