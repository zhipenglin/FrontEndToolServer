/**
 * Created by ifchangetoclzp on 2016/7/7.
 */
var mongoose=require('mongoose');

var RefreshTokenSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    clientId:{
        type:String,
        required:true
    },
    token:{
        type:String,
        unique:true,
        required:true
    },
    createTime:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('RefreshToken',RefreshTokenSchema);