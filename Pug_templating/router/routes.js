import express from "express"
import {home, addPost} from '../controller/user.controller.js'


const router = express.Router()

router.get('/', home)


router.all('/add', addPost)

export default router