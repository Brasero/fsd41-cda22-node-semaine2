import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {})
    .then(() => {
        console.log('Connected to DB')
    }).catch((err) => {
        console.error(err.message)
    })

export default mongoose;