const express = require('express');

const router= express.Router();
//added 
const homeController  = require('../controllers/home_controller');

console.log('router loaded');


//added
router.get('/',homeController.home);
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));




module.exports=router;
