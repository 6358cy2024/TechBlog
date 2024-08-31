const router = require('express').Router();
const comment_controller = require('../controllers/comment_controller');

// Comment route
router.post('/add/:blog_id', comment_controller.addComment);

module.exports = router;