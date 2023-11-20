const products = [
    {
        name: 'iPhone 14',
        price: 799
    }
]

const showProducts = (req, res) => {
    let html = '<ul>'
    products.forEach(product => {
        html+=`
            <li>${product.name} - ${product.price}</li>
        `
    })

    html+= '</ul>';

    res.status(200).send(html)
}

const addProduct = (req, res) => {
    const {method} = req

    if (method === 'POST') {
        const {name, price} = req.body;
        const newProduct = {
            name,
            price
        }
        products.push(newProduct)

        res.redirect('/product')
        return
    }

    res.send(`
        <form action="/product/add" method="POST">
            <input name="name" type="text" placeholder="Nom" />
            <input name="price" type="number" placeholder="Prix">
            <input type="submit" value="ok" />
        </form>
    `)
}

export default {
    showProducts,
    addProduct
}