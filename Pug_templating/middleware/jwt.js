import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
const jwtMiddleware = (req,res,next) => {
    if (!req.session.token) {
        return res.status(403).json({message: 'access denied, get a token'})
    }
    try{
        const verifyToken = jwt.verify(req.session.token, process.env.JWT_SECRET)
        next()
    } catch (err) {
        res.status(403).send({error: err.message})
    }
}

export default jwtMiddleware