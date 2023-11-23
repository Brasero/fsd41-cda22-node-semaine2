import express from "express"
import kittenController from "../controller/kitten.js"

const router = express.Router()

const middleware = (req,res,next) => {
    console.log('home page');
    next()
}

router.get('/', middleware, kittenController.home)
router.get('/kittens/:id', kittenController.getKittenById)
router.get('/add', kittenController.addKitten)
router.get('/delete/:id', kittenController.deleteKitten)

router.post('/add', kittenController.addKitten)

router.all('/update/:id', kittenController.updateKitten)



export default router;