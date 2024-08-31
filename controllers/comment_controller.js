const { Comment } = require('../models');

module.exports = {
    async addComment(req, res) {
        try {
            
            const newComment = await Comment.create({
                content: req.body.content,
                blogId: req.params.blog_id,
                userId: req.session.user_id
            });
            res.redirect('/dashboard')

        } catch (error) {
            console.log('Error adding comment:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};

