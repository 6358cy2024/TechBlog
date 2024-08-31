const { User, Blog, Comment } = require('../models');
const { format } = require('date-fns');

module.exports = {
    showHomePage(req, res) {
        res.render('homepage', {
            title: 'TechBlog Homepage'
        });
    },

    showRegisterPage(req, res) {
        res.render('register', {
            title: 'TechBlog Register',
            register: true
        });
    },

    showLoginPage(req, res) {
        res.render('login', {
            title: 'TechBlog Log In',
            login: true
        });
    },

    async showDashboardPage(req, res) {
        try {
            const user = await User.findByPk(req.session.user_id, {
                include: [{
                    model:Blog,
                    include:[Comment, User]
                }] 
            });
 
            // Format the createdAt date for each blogpost
            const blogs = user.blogs.map(blog => {
                return {
                    ...blog.get({ plain: true }),
                    formattedDate: format(new Date(blog.createdAt), 'dd/MM/yyyy')
                };
            });
            console.log(blogs)
            res.render('dashboard', {
                title: 'Blog - Dashboard',
                user: user.get({ plain: true }),
                blogs, 
                user_page: true,
                dashboard: true
            });
        } catch (error) {
            console.error('Error fetching user and blogs:', error);
            res.status(500).send('Internal Server Error');
        }
    },



    async showAddPage(req, res) {
        try {
            const user = await User.findByPk(req.session.user_id, {
                attributes: ['username']
            });

            res.render('add', {
                user: user.get({ plain: true }),
                title: 'Blog - Add Post',
                user_page: true,
                add: true
            });
        } catch (error) {
            console.log('Error rendering Add Page:', error);
            res.status(500).send('Internal Server Error');
        }
    }, async showEditPage(req, res) {
        try {
            const user = await User.findByPk(req.session.user_id, {
                attributes: ['username']
            });
            const blog = await Blog.findByPk(req.params.blog_id);
            console.log(blog)

            res.render('edit', {
                user: user.get({ plain: true }),
                title: 'Blog - Edit Post',
                blog: blog.get({ plain: true }),
                user_page: true,
                search: true
            });
        } catch (error) {
            console.log('Error rendering Add Page:', error);
            res.status(500).send('Internal Server Error');
        }
    }

};