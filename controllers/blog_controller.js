const { User,  Blog } = require('../models');

module.exports ={
	async createBlog (req, res) {
        const formData = req.body;
        try {
            await BlogPost.create({
                ...formData,//testing spread operator
                UserId: req.session.user_id
            });

            res.redirect('/dashboard');//send back to dashboard

        } catch (error) {
            console.log(error);

            res.redirect('/add');
        }
	},

    async updateBlog(req, res) {
        try {
            const updatedBlog = await BlogPost.update({
                title: req.body.title,
                content: req.body.content
            }, {
                where: { id: req.params.id }
            });

            res.redirect('/');//send back to homepage
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    
    async deleteBlogs(req, res) {

        await BlogPost.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/dashboard');
    }

}