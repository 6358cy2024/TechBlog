const router = require('express').Router();

const view_controller = require('../controllers/view_controller');
const {redirectGuest, redirectUser} = require('./helpers/index')//differ between them so they need different paths

//Homepage
router.get('/', redirectUser, view_controller.showHomePage);

//Login
router.get('/login', redirectUser, view_controller.showLoginPage);

//Register
router.get('/register', redirectUser, view_controller.showRegisterPage);

//Dashboard 
router.get('/dashboard', redirectGuest, view_controller.showDashboardPage);

//Add
router.get('/add', redirectGuest, view_controller.showAddPage);

//Edit
router.get('/edit/:post_id', redirectGuest, view_controller.showEditPage);

module.exports = router