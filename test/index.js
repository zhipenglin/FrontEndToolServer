var SSH=require('simple-ssh');
var parseString = require('xml2js').parseString;
var _=require('lodash');
var nodemailer= require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var ssh=new SSH({
    host:'192.168.1.110',
    user:'linzhipeng',
    pass:'zhipeng20160620'
});

function dateFormat(dateStr){
    var addZero=function(str){
        var map=['00','01','02','03','04','05','06','07','08','09'];
        return map[str]||str;
    }
    var date=new Date(dateStr);

    var year=date.getFullYear();
    var month=addZero(date.getMonth()+1);
    var day=addZero(date.getDate());
    var hour=addZero(date.getHours());
    var minute=addZero(date.getMinutes());
    return year+'-'+month+'-'+day+' '+hour+':'+minute;
}

//获取提交记录
/*
ssh.exec('cd wwwroot/static/toc/bole_mobile&&svn log --xml',{
    exit:function(code,stdout){
        parseString(stdout,function(err,res){
            console.log(JSON.stringify(_.groupBy(res.log.logentry.map(function(n){
                return {
                    author:n.author,
                    date:dateFormat(n.date),
                    option:n.msg
                }
            }),function(n){return n.author;})));
        })
    },
    err:function(stderr){
        console.log(stderr);
    }
}).start();*/

//获取目录下所有tag
/*
ssh.exec('svn list svn://192.168.1.203/fe/static/toc/bole_mobile/tag/',{
    exit:function(code,stdout){
        console.log('svn://192.168.1.203/fe/static/toc/bole_mobile/tag/'+_(stdout.split('\n')).compact().last());
    },
    err:function(stderr){
        console.log(stderr);
    }
}).start();*/

var config={
    mail: {
        from: {
            host: 'smtp.qq.com',
            secure: true,
            port:465,
            auth: {
                user: 'zhipeng.lin@ifchange.com',
                pass: 'Lin2016'
            }
        },
        to: [
            '409512079@qq.com'
        ]
    }
};
var smtpTransport=nodemailer.createTransport(smtpTransport(config.mail.from));

function sendMail(subject, html) {
    var mailOptions = {
        from: [config.mail.from.name, config.mail.from.auth.user].join(' '),
        to: config.mail.to.join(','),
        subject: subject,
        html: html
    };
    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log('Error occurred');
            console.log(error);
        } else {
            console.log('Message sent: ' + response.message);
        }
        smtpTransport.close();
    });
};

sendMail('发送邮件测试','<p>你好</p>');


