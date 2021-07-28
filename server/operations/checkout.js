var checkout = require('../models/checkoutModel');


module.exports.createUser=function(req,res){
    var chkout = new checkout({
    	email:req.body.email,
    	fullname:req.body.fullname,
    	address:req.body.address,
    	city:req.body.city,
    	province:req.body.province,
    	zipcode:req.body.zipcode,
    	country:req.body.country,
    	shipping:req.body.shipping,
    	card:req.body.card,
    	month:req.body.month,
    	year:req.body.year,
    	cvc:req.body.cvc,
    	usertoken:req.body.usertoken,
    	paymentmethod:req.body.paymentmethod
    });
    chkout.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":err })
      } else{
        res.send({"responseCode":200,"responseMessage":"Data Store Successfully"})
      }
    })
}