import express from "express"
import {home} from '../controller/user.controller.js'


const router = express.Router()

router.get('/', home)


export default router