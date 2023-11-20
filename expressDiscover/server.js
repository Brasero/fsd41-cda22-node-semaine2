import express from 'express';
import {join} from 'node:path'

const cwd = process.cwd() // permet de récupérer le chemin absolu du dossier d'execution

const app = express(); // instancie une application express

const staticPath = join(cwd, 'public')

app.use(express.static(staticPath))
app.use(express.static(cwd))

// Une route est composé de son path "/" et de son handler (req, res) => {...}

// app.get('/assets/css/:fileName', (req, res) => {
//     const {fileName} = req.params
//     res.status(200).sendFile(join(cwd, '/public/assets/css', fileName))
// })

app.get("/", (req, res) => {
    const {name, age} = req.query //paramétre de requete (ex: http://localhost:8000/?name=test&age=12)

    console.log(name, age);
    res.status(200).sendFile(join(cwd, 'index.html'), (err) => { //sendFile permet d'envoyer des fichiers en tant que réponse
        if (err) res.status(404).send('error')
    })
})
/*
app.post("/", (req, res) => {
    res.send("You're in POST method")
})

app.get('/hello/15', (req, res) => {

    res.send('second route')
})

// un paramètre dynamique est déclaré dans le path en étant précedé de ":", il est possible d'en déclarer autant que l'on souhaite
// il est ensuite possible de les récupérer dans "req.params"
app.get('/:name/:age', (req, res) => {
    const {name, age} = req.params

    console.log(name, age)
    res.send('ok')
})


app.get('/:id.:name', (req, res) => {
    const {id, name} = req.params
    console.log(id, name)
    res.send('hello')
})
app.get(/[0-9]+/, (req, res) => {
    res.send(req.path)
})
*/





app.listen(8000, () => {
    console.log('Server started at http://localhost:8000')
})