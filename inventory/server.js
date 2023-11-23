import products from './data/product.js';
import product from "./model/product.js";

async function init() {
    try {

        await product.deleteMany({})
        console.log('Collection was purged');

        await product.insertMany(products)
        console.log('Product Created')

        const companies = await product.find({}, {_id: 0, society: 1, price:1, qty: 1})
        console.log('Companies:', companies)

        const remove = await product.deleteOne({society: 'Alice'})
        const companiesUpdated = await product.find({}, {_id: 0, society: 1, price:1, qty: 1})
        console.log('Deleted item : ', remove)
        console.log("Remaining item: ", companiesUpdated)

        await product.updateMany({}, { $mul: { qty: 2 }})
        const qtyMultiplied = await product.find({}, {_id:0, qty: 1})
        console.log('Quantity was multiplied', qtyMultiplied)

        const filtredCompanies = await product.find({ qty: {$gte: 100} }, {_id:0, society:1, qty:1}).sort({qty: -1})
        console.log("Filterd companies", filtredCompanies)

    } catch(err) {
        console.error(err.message)
    }
}

init()