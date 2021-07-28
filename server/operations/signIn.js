var express = require('express');

module.exports.checkAuthDetail = function(req,res){
    // console.log(req.body);
    email = req.body.email;
    password = req.body.password;
    if(email == 'testuser@teetung.com' && password == '12345678'){
        res.send({"responseCode":200, "responseMessage":"success"})
    } else {
        res.send({"responseCode":400, "responseMessage":"Not Found"})
    }
}