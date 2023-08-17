const express = require('express');

const router= express.Router();
//added 
const homeController  = require('../controllers/home_controller');

console.log('router loaded');


//added
router.get('/',homeController.home);
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));

router.use('/api',require('./api'));




module.exports=router;
