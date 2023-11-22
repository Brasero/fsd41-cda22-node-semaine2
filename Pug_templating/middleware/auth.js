const auth = (req,res,next) => {
    if (req.session.auth) {
        req.session.message = "Vous êtes connecté";
        return next()
    }

    req.session.message = "Accès refusée";
    res.redirect('/')
}

export default auth