/**
 * Created by ifchangetoclzp on 2016/7/7.
 */
var mongoose = require('mongoose');

module.exports=function(){
    mongoose.connect('mongodb://localhost:27017/front_end_tools', function(err) {
        if(err) {
            return console.log('connection error', err);
        }
        console.log('connection successful');
    });
};