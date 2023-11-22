import express from "express"
import {home, addPost} from '../controller/user.controller.js'
import {jwtHome, getToken, securedRoute, deleteToken} from '../controller/jwt.controller.js'
import jwtMiddleware from "../middleware/jwt.js";


const router = express.Router()

router.get('/', home)
router.get('/jwt', jwtHome)
router.get('/getToken', getToken)
router.get('/securedRoute', jwtMiddleware, securedRoute)
router.get('/clear', deleteToken)


router.all('/add', addPost)

export default router