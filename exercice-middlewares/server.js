import express from "express"
import session from 'express-session';
import {counterMiddleware, logMiddleware, redirectMiddleware} from './middlewares.js';

const app = express()

app.use(express.urlencoded({extended: false}))

app.use(session({
    name: 'name',
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false
}))
app.use(counterMiddleware)
app.use(logMiddleware)


// app.all("*", (req, res) => {
//     res.send(`
//         <code>
//             <a href="/">/</a><br/>
//             <a href="/app">/app</a><br/>
//             <a href="/app/Julian">/app/Julian</a><br/>
//             <a href="/app/Driss?lang=ca">/app/Driss?lang=ca</a><br/>
//             <br/>
//             <form action="/app/create" method="post">
//                 <input type="text" name="name" placeholder="name" />
//                 <button type="submit">POST /app/create</button>
//             </form>
//         </code>
//     `)
// })

app.get('/', redirectMiddleware, (req, res) => {
    res.send({page: 'home', counter: req.session.counter})
})

app.get('/checkPage', (req, res) => {
    res.send(`
        <div>valeur du compteur : ${req.session.counter}</div>
        <a href="/delete">Réinitialisé le compteur</a>
    `)
})

app.get('/delete', (req,res) => {
    req.session.counter = 0;
    res.redirect('/');
})


app.listen(8000, () => {
    console.log("server started at http://localhost:8000")
})