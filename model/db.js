/**
 * Created by lzp on 16/7/5.
 */

var mongodb=require('mongodb');
var server=new mongodb.Server('localhost',27017,{auto_reconnect:true});
var db=new mongodb.Db('my_test_db',server,{safe:true});

module.exports=function(){
    return new Promise(function(reslove,reject){
        db.open(function(err,db){
            if(err){
               return reject(err);
            }
            db.createCollection('mycoll',{safe:true},function(err,collection){
                if(err){
                    return reject(err);
                }
                reslove(collection);
            });
        });
    });
}