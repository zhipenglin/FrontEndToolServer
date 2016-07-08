var express = require('express');
var router = express.Router();
var passport=require('passport');
router.post('/user', function(req, res, next) {

});

router.get('/user',passport.authenticate('local',{session:false}),function(req,res,next){

})

module.exports = router;
