let counter = 0;

export const counterMiddleware = (req,res, next) => {
    counter++
    req.counter = counter
    next()
}

export const logMiddleware = (req,res,next) => {
    //<COUNTER>) <METHOD> <PATH> <QUERY|BODY>
    const counter = req.counter
    const method = req.method.toUpperCase()
    const {path} = req
    const body = isNotEmpty(req.body) ? JSON.stringify(req.body) : ''
    const query = isNotEmpty(req.query) ? JSON.stringify(req.query) : ''

    console.log(`${counter}) ${method} ${path} ${body} ${query}`);

    next()
}

const isNotEmpty = (obj) => {
    return Object.keys(obj).length > 0;
}