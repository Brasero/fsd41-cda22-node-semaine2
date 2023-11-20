import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('hello world')
})

app.get('/:name/:age', (req, res) => {
    const {name, age} = req.params
    res.status(200).send(`Bonjour ${name}, vous avez ${age}`);
})

app.get('/user', (req, res) => {
    const {name, age} = req.query
    res.status(200).send(`Bonjour ${name}, vous avez ${age}`)
})


app.listen(8000, () => {
    console.log("running at http://localhost:8000")
})