import express from 'express'
import {home, all, show, deleteProd} from '../controller/product.controller.js'
const router = express.Router()

router.get('/', home)
router.get('/all', all)
router.get('/show/:name', show)
router.get('/delete/:name', deleteProd)

export default router;