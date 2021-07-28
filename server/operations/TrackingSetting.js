var PagesDb = require('../models/trackingsettingModel');

// get all option
module.exports.getAllOption = function (req, res){
    PagesDb.find().exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Data displayed successfully.","option": data})  
        }
    })
}

// get one collections
module.exports.updateOption=function(req,res){
    console.log(req.body);
    PagesDb.findByIdAndUpdate(req.params.id, { GoogleTagManager: req.body.GTagManager, GoogleAnalytics: req.body.GAnalytics, GoogleConversion: req.body.GConversion, GoogleSiteVerificationCode: req.body.GSiteVerification, FacebookPixel: req.body.FPixel, BingSiteVerificationCode: req.body.BSiteVerification}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err})
        } else{
        	PagesDb.findById(req.params.id).exec(function(err,data1){
        		res.send({"responseCode":200,"responseMessage":"displayed successfully.","data": data1})
        	})
        }
    })
}