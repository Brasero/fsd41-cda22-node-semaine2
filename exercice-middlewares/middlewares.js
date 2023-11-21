export const counterMiddleware = (req,res, next) => {
    if (req.session.counter && req.session.counter <= 10) {
        req.session.counter++
    } else if (req.path !== '/checkPage') {
        req.session.counter = 1
    }
    next()
}

export const logMiddleware = (req,res,next) => {
    //<COUNTER>) <METHOD> <PATH> <QUERY|BODY>
    const counter = req.session.counter
    const method = req.method.toUpperCase()
    const {path} = req
    const body = isNotEmpty(req.body) ? JSON.stringify(req.body) : ''
    const query = isNotEmpty(req.query) ? JSON.stringify(req.query) : ''

    console.log(`${counter}) ${method} ${path} ${body} ${query}`);

    next()
}

export const redirectMiddleware = (req,res,next) => {

    if(req.session.counter && req.session.counter > 10 && req.path !== '/checkPage') {
        res.redirect('/checkPage')
        return
    }
    next()
}

const isNotEmpty = (obj) => {
    return Object.keys(obj).length > 0;
}