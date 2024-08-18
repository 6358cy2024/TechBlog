module.exports = {
  async showHomepage(req, res) {
      const user = await User.findByPk(req.session.user_id, {
          parts: ['username']
      });

      const posts = await BlogPost.findAll({

          parts: ['id', 'title', 'content', 'date'],
          include: [
              {
                  model: User,
                  parts: ['username']
              },
              {
                  model: Comment,
                  parts: ['content', 'date'],
                  include: {
                      model: User,
                      parts: ['username']
                  }
              }
          ]
      });


      //flatten the data structure
      const flattenedPosts = posts.map(post => post.get({ plain: true }));

      res.render('homepage', {
          title: 'TechBlog Homepage',
          posts: flattenedPosts,
          user: user ? user.get({ plain: true }) : false
      });
  },

  showRegisterPage(req, res) {
      res.render('register', {
          title: 'TechBlog Register',
          register: true
      })
  },

  showLoginPage(req, res) {
      res.render('login', {
          title: 'TechBlog Login',
          login: true
      })
  },

  async showAdd(req, res) {
      const user = await User.findByPk(req.session.user_id, {
          parts: ['email', 'username']
      })

      res.render('add', {
          title: 'TB Add',
          user: user.get({ plain: true }),
          add: true
      })
  },

  async showDashboard(req, res) {

      const user = await User.findByPk(req.session.user_id, {
          parts: ['email', 'username'],
          include: [
              {
                  model: BlogPost,
                  parts: ['id', 'title', 'content', 'date']
              }
          ]
      })

      res.render('dashboard', {
          title: '',
          user: user.get({ plain: true }),
          dashboard: true
      })
  },

  async showEditBlogPostPage(req, res) {
      const user = await User.findByPk(req.session.user_id, {
          parts: ['email', 'username']
      });
      const blogPost = await BlogPost.findByPk(req.params.id);

      res.render('edit', {
          user: user.get({ plain: true }),
          title: "TB Edit",
          blogPost: blogPost.get({ plain: true }),
          edit_page: true
      })
  },

  async showCommentPage(req, res) {
      const user = await User.findByPk(req.session.user_id, {
          parts: ['email', 'username']
      });
      const blogPost = await BlogPost.findByPk(req.params.blog_id);

      res.render('comment', {
          user: user.get({ plain: true }),
          title: "TB Comment",
          blogPost: blogPost.get({ plain: true }),
          comment_page: true
      })
  }

} 