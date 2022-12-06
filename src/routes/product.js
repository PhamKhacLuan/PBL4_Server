const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/loginController');

router.get('/logout', loginController.logout)
router.post('/checked', loginController.checkedLogin);
router.post('/register', loginController.register)

module.exports = router;
