var PagesDb = require('../models/onlineStoreSettingModel');

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
    PagesDb.findByIdAndUpdate(req.params.id, { isShippingOnProduct: req.body.ShippingOnProductPage, isFeaturedCollectionOnHome: req.body.FeaturedCollectionOnHomePage, isCountdownOnCheckout: req.body.CountdownOnCheckoutPage, isCountdownOnProduct: req.body.CountdownOnProductPage, isDisplayTrackOrderOnMenu: req.body.TrarkOrderPageOnMenu, testimonyPageUrlOnMenu: req.body.TestimonyPageUrlForMenu, testimonyPageUrlOnProduct: req.body.TestimonyPageUrlForProductPage, discountPercentage: req.body.DiscountPercentage, isTopbarPromotion: req.body.TopBarPromotion, discountOrofferText: req.body.DiscountText }).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err})
        } else{
        	PagesDb.findById(req.params.id).exec(function(err,data1){
        		res.send({"responseCode":200,"responseMessage":"displayed successfully.","data": data1})
        	})
        }
    })
}