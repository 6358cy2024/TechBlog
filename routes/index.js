const router = require('express').Router();

const blog_routes = require('./blog_routes')
const user_routes = require('./user_routes')
const view_routes = require('./view_routes')
const comment_route = require('./comment_routes') 

router.use('/', [view_routes, user_routes]);
router.use('/blog', blog_routes)
router.use('/comments', comment_route)

router.use('*',(req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });

module.exports = router

  