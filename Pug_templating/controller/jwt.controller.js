import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

let token = '';
export const jwtHome = (req, res) => {
    res.send(`
    <style>html { font-size: 1.6rem; }</style>
    <h1>Routes de l'app</h1>
    <ul>
      <li><a href="/getToken">/getToken</a> (Crée un token et le met dans la session)</li>
      <li><a href="/clear">/clear</a> (Efface la session et le token)</li>
    </ul>

    <ul>
      <li><a href="/securedRoute">/securedRoute</a> (Route accessible uniquement avec un token valide dans la session)</li>
    </ul>
  `)
}

export const getToken = (req,res) => {
    const user = {
        userId: Date.now().toString(),
        email: 'test@test.fr',
        role: 'admin'
    };
    req.session.token = jwt.sign(
        user,
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    res.json({
        token: req.session.token
    })
}

export const securedRoute = (req,res) => {
    res.send({
        message: "access granted",
        token: req.session.token
    })
}

export const deleteToken = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.status(501).send({message: 'something went wrong'})
            return
        }

        res.redirect('/jwt')
    })
}