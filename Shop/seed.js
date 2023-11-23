import productSchema from './model/product.js'
import products from './data/products.js'

(async function seed() {
    await productSchema.deleteMany();
    await productSchema.insertMany(products)
    console.log("Product created")
    process.exit(0)
})()