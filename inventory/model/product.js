import mongoose from "./index.js";


const productSchema = new mongoose.Schema({
    sale: Boolean,
    price: Number,
    society: String,
    qty: Number,
    size: {
        h: Number,
        w: Number,
        uom: String
    },
    year: Number
})

export default mongoose.model('product', productSchema)