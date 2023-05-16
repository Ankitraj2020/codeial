const express = require('express');
const router = express.Router();


const usersController = require('../controllers/post_controller');
router.get('/post',usersController.post);



module.exports = router;