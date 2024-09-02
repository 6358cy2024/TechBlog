const { Comment } = require('../models');

module.exports = {
    async addComment(req, res) {
        try {
            //parts of the Comment
            const newComment = await Comment.create({
                content: req.body.content,
                blogId: req.params.blog_id,
                userId: req.session.user_id
            });
            res.redirect('/dashboard')

        } catch (error) {
            console.log('Unable to add comment', error);
            res.status(500).send('Internal Error');
        }
    },
};

