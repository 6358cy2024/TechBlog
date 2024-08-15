const router = require('express').Router();
const user_controller = require('../controllers/user_controller');
//basic user tracking for guests or returning users
router.post('/register', user_controller.registerUser);

router.post('/login', user_controller.loginUser);

router.get('/logout', user_controller.logoutUser)

module.exports = router;