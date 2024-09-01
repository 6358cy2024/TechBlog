const { User } = require('../models');

module.exports = {
  async registerUser(req, res) {
    try {
      const user = await User.create(req.body);
      req.session.user_id = user.id;

      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
      res.redirect('/register');//bring back to register
    }
  },

  async loginUser(req, res) {
    const formData = req.body;
    const user = await User.findOne({
      where: {
        username: formData.username
      }
    });
    if (!user) {//if not a user
      return res.redirect('/register');
    }
    const valid_pass = await user.validatePassword(formData.password);
    //ensure Password is secure
    if (!valid_pass) {
      return res.redirect('/login');
    }
   
    req.session.user_id = user.id;
    res.redirect('/dashboard');//bring back to dashboard
  },

  logoutUser(req, res) {
    req.session.destroy();//end the session
    res.redirect('/');
  }
}