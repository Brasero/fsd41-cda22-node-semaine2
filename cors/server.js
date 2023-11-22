import express from 'express';

const app = express();

app.get('/', (req,res) => {
    res.sendFile('./views/home.html', {root: './'})
})

app.listen(8000,() => {
    console.log('running')
})