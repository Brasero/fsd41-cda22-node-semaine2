import express from "express";
import productController from '../controller/product.controller.js'

const router = express.Router()


router.param('id', (req, res, next, id) => {
    console.log("route with params id");

    req.id = id;
    next()
})
router.get('/', productController.showProducts)

router.get('/add', productController.addProduct)

router.post('/add', productController.addProduct)



export default router;