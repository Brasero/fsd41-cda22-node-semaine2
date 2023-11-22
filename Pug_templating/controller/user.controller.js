import posts from '../data/posts.js'



export const home = (req,res) => {
    res.render('Blog/home', {posts, title: 'Home'})
}

export const addPost = (req,res) => {
    const {method} = req

    if (method === 'POST') {
        const {title, date} = req.body
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/

        if(!title || title.trim() === "") {
            req.session.message = 'Please fill the title input'
            console.log('title', title)
            res.redirect('/add')
            return
        }

        if(!date.match(dateRegex)) {
            req.session.messsage = 'Please fill the date input'
            console.log('date', date)
            res.redirect('/add')
            return
        }

        const newPost = {
            title,
            date
        }
        posts.push(newPost)
        res.status(201).redirect('/')
        return
    }

    res.render('Blog/add', {title: 'Posts'})
}