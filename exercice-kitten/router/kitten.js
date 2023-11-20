import express from "express"
import kittenController from "../controller/kitten.js"

const router = express.Router()

router.get('/', kittenController.home)
router.get('/kittens/:id', kittenController.getKittenById)
router.get('/add', kittenController.addKitten)
router.get('/update/:id', kittenController.updateKitten)

router.post('/add', kittenController.addKitten)



export default router;