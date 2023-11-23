import productModel from '../model/product.js'

const onError = (res) => {
    return (err) => {
        console.log('Something broke with DB:')
        console.log(err.message)
        res.status(501).json({message: err.message})
    }
}


export const home = (req,res) => {
    productModel.find().countDocuments().then((stat) => {
        res.render('shop/home', {stat, title: 'Home'})
    }).catch(onError(res))
}

export const all = (req,res) => {
    productModel.find({}, {_id: 0, society: 1, qty: 1}).then(products => {
        res.render('shop/all', {products, title: "All"})
    }).catch(onError(res))
}

export const show = (req,res) => {
    const {name} = req.params
    productModel.findOne({ society : name }).then(prod => {
        res.render('shop/show', {prod})
    }).catch(onError(res))
}

export const deleteProd = (req,res) => {
    const {name} = req.params
    productModel.deleteOne({society: name}).then(() => {
        res.redirect('/all')
    }).catch(onError(res))
}