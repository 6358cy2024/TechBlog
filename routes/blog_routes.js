const router = require('express').Router();
const blog_controller = require('../controllers/blog_controller');

router.post('/add', blog_controller.addPost);

router.put('/edit/:id', blog_controller.updatePost);

router.delete('/remove/:id', blog_controller.deletePosts);

module.exports = router;