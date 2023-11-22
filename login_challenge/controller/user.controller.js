import {join} from 'node:path'
import user from "../data/user.js"
import SHA1 from 'crypto-js/sha1.js'

const cwd = process.cwd()


export const home = (req,res) => {
    res.sendFile(join(cwd, 'views', 'form.html'), (err) => {
        if(err) {
            console.log(err)
            res.status(500).send('something broke');
        }
    })
}

export const login = (req,res) => {
    const {login, password} = req.body
    const {login: l, password: p} = user

    req.session.auth = false

    if(!login || !password) {
        req.session.message = 'Merci de remplir tout les champs';
        res.redirect('/')
        return
    }

    if(login === l && SHA1(password).toString() === p) {
        req.session.auth = true;
        req.session.message = 'Connexion reussi';

        res.redirect('/dashboard');
        return
    }

    req.session.message = 'Mauvais identifiant'
    res.redirect('/')
}

export const dashboard = (req,res) => {
    res.sendFile(join(cwd, 'views', 'dashboard.html'))
}