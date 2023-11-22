import express from "express"
import {home, login, dashboard} from '../controller/user.controller.js'
import auth from '../middleware/auth.js'


const router = express.Router()

router.get('/', home)
router.get('/dashboard', auth, dashboard)
router.get('/logout', (req,res) => {
    req.session.auth = false;
    req.session.message = "Déconnexion reussie";
    res.redirect('/')
})



router.post('/login', login)


export default router