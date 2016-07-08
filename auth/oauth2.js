/**
 * Created by ifchangetoclzp on 2016/7/7.
 */
var oauth2orize=require('oauth2orize');
var crypto=require('crypto');
var passport=require('passport');

var User=require('../model/user');
var AccessToken=require('../model/accessToken');
var RefreshToken=require('../model/refreshToken');

var oauthServer=oauth2orize.createServer();

var generateTokens=function(data,done){
    RefreshToken.remove(data,function(err){
        if(err) done(err);
    });
    AccessToken.remove(data,function(err){
        if(err) done(err);
    });

    var tokenValue=crypto.randomBytes(32).toString('hex');
    var refreshTokenValue=crypto.randomBytes(32).toString('hex');

    data.token=tokenValue;
    var token=new AccessToken(data);

    data.token=refreshTokenValue;
    var refreshToken=new RefreshToken(data);

    refreshToken.save(function(err){
        if(err) done(err);
    });

    token.save(function(err){
        if(err) done(err);
        done(null,tokenValue,refreshTokenValue,{
            'expores_in':3600
        });
    });
};

oauthServer.exchange(oauth2orize.exchange.password(function(client,username,password,scope,done){
    User.findOne({username:username},function(err,user){
        if(err) return done(err);
        if(!user||!user.checkPassword(password)) return done(null,false);
        generateTokens({
            userId:user.userId,
            clientId:client.clientId
        },done)
    });
}));

oauthServer.exchange(oauth2orize.exchange.refreshToken(function(client,refreshTocken,scope,done){
    RefreshToken.findOne({token:refreshTocken,clientId:client.clientId},function(err,token){
        if(err) return done(err);
        if(!token) return done(null,false);
        User.findById(token.userId,function(err,user){
            if(err) return done(err);
            if(!user) return done(null,false);

            generateTokens({
                userId:user.userId,
                clientId:client.clientId
            },done);
        });
    });
}));

module.exports=[
    passport.authenticate(['basic','oauth2-client-password'],{session:false}),
    oauthServer.token(),
    oauthServer.errorHandler()
];