import {readFileSync, writeFileSync} from "node:fs";
import {join} from "node:path";

const cwd = process.cwd()
const dataPath = join(cwd, 'data')
const htmlPath = join(cwd, 'view')

const home = (req, res) => {
    const data = readFileSync(join(dataPath, 'kittens.json'), 'utf8');
    const kittens = JSON.parse(data)

    let html = readFileSync(join(htmlPath, 'header.html'), 'utf8')

    html += `<div class="cards">`

    kittens.forEach(kitten => {
        const {id, name, image} = kitten
        const imgPath = image.startsWith('http') ? image : join('/images', image)
        html += `
            <div class="card">
                <div class="card__img">
                    <img src="${imgPath}" alt="${name}">
                </div>
                <span class="card__name">
                    <a href="/kittens/${id}" class="link">${name}</a>
                </span>
            </div>
        `
    })

    html += `</div></body></html>`;

    res.status(200).send(html)
}

const getKittenById = (req, res) => {
    const {id} = req.params;

    try {
        const data = readFileSync(join(dataPath, `${id}.json`), "utf-8")
        const kitten = JSON.parse(data)
        const imgPath = kitten.image.startsWith('http') ? kitten.image : join('/images', kitten.image)

        let html = readFileSync(join(htmlPath, 'header.html'), 'utf8')

        html += `
        <div class="container">
            <div class="left">
                <img src="${imgPath}" alt="${kitten.name}">
            </div>
            <div class="right">
                <h1>${kitten.name}</h1>
                <p>${kitten.description}</p>
                <p><strong>Age : </strong> ${kitten.age} an${kitten.age > 1 && "s"}</p>
                <a href="/update/${kitten.id}">Modifier</a>
            </div>
        </div>
        `

        html+=`</body></html>`
        res.status(200).send(html)
    } catch(err) {
        res.status(404).send(err)
    }
}

const addKitten = (req, res) => {
    const {method} = req

    if(method === 'POST') {
        const {name, age, description, image} = req.body
        const kittens = JSON.parse(readFileSync(join(dataPath, 'kittens.json'), 'utf8'))
        const kitten = {
            id: kittens.length + 1,
            name,
            age: parseInt(age),
            description,
            image
        }
        kittens.push(kitten)
        writeFileSync(
            join(dataPath, 'kittens.json'),
            JSON.stringify(kittens, null, 2)
        )
        writeFileSync(
            join(dataPath, `${kitten.id}.json`),
            JSON.stringify(kitten, null, 2)
        )

        res.redirect('/')
        return
    }

    let html = readFileSync(join(htmlPath, 'header.html'), 'utf8')
    html += readFileSync(join(htmlPath, 'form.html'), 'utf8')

    res.status(200).send(html)
}


const updateKitten = (req, res) => {

    const {method} = req
    const {id} = req.params
    const kittens = JSON.parse(readFileSync(join(dataPath, 'kittens.json'), 'utf8'))
    const kitten = kittens.find(kitten => kitten.id === parseInt(id))

    if (method === 'POST') {

        return
    }

    let html = readFileSync(join(htmlPath, 'header.html'), 'utf8')
    html += `
        <div class="container">
            <div class="right" style="width: 100%">
                <form action="/update/${id}" method="post">
                    <label for="name">Nom</label>
                    <input type="text" id="name" value="${kitten.name}" name="name" required>
                    <label for="age">Age</label>
                    <input type="number" id="age" value="${kitten.age}" name="age" required>
                    <label for="description">Description</label>
                    <textarea id="description" name="description" required>${kitten.description}</textarea>
                    <label for="image">Image</label>
                    <input type="text" id="image" name="image" value="${kitten.image}" required>
                    <button type="submit">modifier</button>
                </form>
            </div>
        </div>
        </body>
        </html>
    `

    res.send(html)
}

export default {
    home,
    getKittenById,
    addKitten,
    updateKitten
}