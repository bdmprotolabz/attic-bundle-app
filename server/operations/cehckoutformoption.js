var PagesDb = require('../models/checkoutfromoptionModel');

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
    console.log(req.params.id);
    //res.send({"responseCode":200,"responseMessage":"Page is displayed successfully.","data": data})
    PagesDb.findByIdAndUpdate(req.params.id, { Ismobilenumber: req.body.Isoption }).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err})
        } else{
        	PagesDb.findByIdAndUpdate(req.params.id, { Ismobilenumber: req.body.Isoption }).exec(function(err,data1){
        		res.send({"responseCode":200,"responseMessage":"Page is displayed successfully.","data": data1})
        	})
        }
    })
}