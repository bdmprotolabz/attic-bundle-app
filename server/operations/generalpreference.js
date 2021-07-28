var PagesDb = require('../models/generalPreferencesModel');

// get all option
module.exports.getAllOption = function (req, res){
    PagesDb.find().exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"displayed successfully.","option": data})  
        }
    })
}

// get one collections
module.exports.updateOption=function(req,res){
    console.log(req.body);
    PagesDb.findByIdAndUpdate(req.params.id, { storeName: req.body.StoreName, tagLine: req.body.TagLine, supportEmail: req.body.SupportEmail, businessName: req.body.BusinessName, Phone: req.body.Phone, Address: req.body.Address, City: req.body.City, postalCode: req.body.PostalCode, country: req.body.Country, timeZone: req.body.TimeZone, currency: req.body.Currency }).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err})
        } else{
        	PagesDb.findByIdAndUpdate(req.params.id, { storeName: req.body.StoreName, tagLine: req.body.TagLine, supportEmail: req.body.SupportEmail, businessName: req.body.BusinessName, Phone: req.body.Phone, Address: req.body.Address, City: req.body.City, postalCode: req.body.PostalCode, country: req.body.Country, timeZone: req.body.TimeZone, currency: req.body.Currency }).exec(function(err,data1){
        		res.send({"responseCode":200,"responseMessage":"Page is displayed successfully.","data": data1})
        	})
        }
    })
}