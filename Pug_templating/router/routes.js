import express from "express"
import {home, addPost} from '../controller/user.controller.js'
import {jwtHome} from '../controller/jwt.controller.js'


const router = express.Router()

router.get('/', home)
router.get('/jwt', jwtHome)


router.all('/add', addPost)

export default router