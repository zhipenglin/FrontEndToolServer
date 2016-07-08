/**
 * Created by lzp on 16/7/5.
 */
var mongoose=require('mongoose');
var crypto=require('crypto');

var UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    hashedPassword:{
        type:String,
        require:true
    },
    salt:{
        type:String,
        required:true
    },
    createTime:{
        type:Date,
        default:Date.now
    }
});

UserSchema.methods.encryptPassword=function(password){
    return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
};
UserSchema.virtual('userId').get(function(){
    return this.id;
});
UserSchema.virtual('password').set(function(password){
    this._plainPassword=password;
    this.salt=crypto.randomBytes(32).toString('base64');
    this.hashedPassword=this.encryptPassword(password);
});

UserSchema.methods.checkPassword=function(password){
    return this.encryptPassword(password)===this.hashedPassword;
};

module.exports=mongoose.model('User',UserSchema);