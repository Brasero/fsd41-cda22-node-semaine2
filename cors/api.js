import express from "express";
import cors from "cors";

const app = express()

app.use(cors({
    origin: ['http://localhost:8000', 'http://localhost:8001']
}))


app.get('/c', (req,res) => {
    const users = [
        { name: "Leanne Graham b" },
        { name: "Ervin Howell b" },
        { name: "Clementine Bauch b" },
        { name: "Patricia Lebsack b" },
    ];
    res.json({ users })
})


app.listen(8888, () => {
    console.log("api running");
})