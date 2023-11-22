import posts from '../data/posts.js'



export const home = (req,res) => {
    res.render('Blog/home', {posts, title: 'Home'})
}