const { Comment } = require('../models');

module.exports = {
    async addComment(req, res) {
        try {
            // comment object
            const newComment = await Comment.create({
                content: req.body.content,
                postId: req.params.post_id,
                userId: req.session.user_id
            });
            res.redirect('/dashboard')

        } catch (error) {
            console.log('Error adding comment:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};

