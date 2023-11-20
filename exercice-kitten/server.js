import express from "express";
import {join} from "node:path";
import {readFileSync} from "node:fs"

const app = express();

const cwd = process.cwd()
const htmlPath = join(cwd, 'view')
const staticPath = join(cwd, 'public')
const dataPath = join(cwd, 'data')

app.use(express.static(staticPath))

app.get('/', (req, res) => {
    const data = readFileSync(join(dataPath, 'kittens.json'), 'utf8');
    const kittens = JSON.parse(data)

    let html = readFileSync(join(htmlPath, 'header.html'), 'utf8')

    html += `<div class="cards">`

    kittens.forEach(kitten => {
        const {id, name, image} = kitten
        html += `
            <div class="card">
                <div class="card__img">
                    <img src="${join('/images', image)}" alt="${name}">
                </div>
                <span class="card__name">
                    <a href="/kittens/${id}" class="link">${name}</a>
                </span>
            </div>
        `
    })

    html += `</div></body></html>`;

    res.status(200).send(html)
})

app.get('/kittens/:id', (req, res) => {
    const {id} = req.params;

    try {
        const data = readFileSync(join(dataPath, `${id}.json`), "utf-8")
        const kitten = JSON.parse(data)

        let html = readFileSync(join(htmlPath, 'header.html'), 'utf8')

        html += `
        <div class="container">
            <div class="left">
                <img src="${join('/images', kitten.image)}" alt="${kitten.name}">
            </div>
            <div class="right">
                <h1>${kitten.name}</h1>
                <p>${kitten.description}</p>
                <p><strong>Age : </strong> ${kitten.age} an${kitten.age > 1 && "s"}</p>
            </div>
        </div>
        `

        html+=`</body></html>`
        res.status(200).send(html)
    } catch(err) {
        res.status(404).send(err)
    }
})

app.listen(8000, () => {
    console.log('server start')
})