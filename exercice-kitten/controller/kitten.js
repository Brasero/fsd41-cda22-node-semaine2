import {readFileSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import kitten from '../model/kitten.js';

const cwd = process.cwd()
const dataPath = join(cwd, 'data')
const htmlPath = join(cwd, 'view')

const home = async (req, res) => {
    const kittens = await kitten.find();

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

const getKittenById = async (req, res) => {
    const {id} = req.params;

    try {
        const kittenData = await kitten.findById(id)
        const imgPath = kittenData.image.startsWith('http') ? kittenData.image : join('/images', kittenData.image)

        let html = readFileSync(join(htmlPath, 'header.html'), 'utf8')

        html += `
        <div class="container">
            <div class="left">
                <img src="${imgPath}" alt="${kittenData.name}">
            </div>
            <div class="right">
                <h1>${kittenData.name}</h1>
                <p>${kittenData.description}</p>
                <p><strong>Age : </strong> ${kittenData.age} an${kittenData.age > 1 && "s"}</p>
                <a href="/update/${kittenData.id}">Modifier</a>
                <a href="/delete/${kittenData.id}">Supprimer</a>
            </div>
        </div>
        `

        html+=`</body></html>`
        res.status(200).send(html)
    } catch(err) {
        res.status(404).send(err)
    }
}

const addKitten = async (req, res) => {
    const {method} = req

    if(method === 'POST') {
        const {name, age, description, image} = req.body

        const newKitten = await kitten.create({
            name,
            age: parseInt(age),
            description,
            image
        })


        res.redirect(`/kittens/${newKitten.id}`)
        return
    }

    let html = readFileSync(join(htmlPath, 'header.html'), 'utf8')
    html += readFileSync(join(htmlPath, 'form.html'), 'utf8')

    res.status(200).send(html)
}


const updateKitten = async (req, res) => {

    const {method} = req
    const {id} = req.params
    const kittenData = await kitten.findById(id)

    if(!kittenData) {
        res.status(404).send('kitten not found')
        return
    }

    if (method === 'POST') {
        Object.keys(req.body).map(key => {
            kittenData[key] = key === 'age' ? parseInt(req.body[key]) : req.body[key]
        })
        await kittenData.save();

        res.redirect(`/kittens/${id}`);
        return
    }

    let html = readFileSync(join(htmlPath, 'header.html'), 'utf8')
    html += `
        <div class="container">
            <div class="right" style="width: 100%">
                <form action="/update/${id}" method="post">
                    <label for="name">Nom</label>
                    <input type="text" id="name" value="${kittenData.name}" name="name" required>
                    <label for="age">Age</label>
                    <input type="number" id="age" value="${kittenData.age}" name="age" required>
                    <label for="description">Description</label>
                    <textarea id="description" name="description" required>${kittenData.description}</textarea>
                    <label for="image">Image</label>
                    <input type="text" id="image" name="image" value="${kittenData.image}" required>
                    <button type="submit">modifier</button>
                   
                </form>
            </div>
        </div>
        </body>
        </html>
    `

    res.send(html)
}

const deleteKitten = (req,res) => {
    const {id} = req.params

   kitten.findByIdAndDelete(id).then(() => {
       res.redirect('/')
   }).catch((err) => {
       console.log(err.message)
       res.redirect('/')
   })
}

export default {
    home,
    getKittenById,
    addKitten,
    updateKitten,
    deleteKitten
}