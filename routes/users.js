const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.js'); 

router.get('/', usersController.getall);

router.get('/:id', usersController.getsingle);

module.exports = router; 
