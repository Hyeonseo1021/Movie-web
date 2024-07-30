const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/users', UserController.userSignup);
router.get('/users', UserController.getAllusers);
router.post('/login', UserController.userSignin);

module.exports = router;
