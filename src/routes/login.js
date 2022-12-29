const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/loginController');

router.get('/logout', loginController.logout)
router.post('/checked', loginController.checkedLogin);

module.exports = router;
