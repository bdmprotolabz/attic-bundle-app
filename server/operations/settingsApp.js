var settingAppDb = require('../models/settingAppModel');

module.exports.saveSettings = function (req, res) {
    settingAppDb.find({ shopName: req.body.shopName }, function (err, u) {
        if (u.length) {
            settingAppDb.findByIdAndUpdate(u[0]._id, { 
                shopName: req.body.shopName,
                redirectPage: req.body.redirectPage,
                discountType: req.body.discountType,
                isPaymentBtn: req.body.isPaymentBtn,
                isDiscount: req.body.isDiscount,
                isStockControl: req.body.isStockControl,
                isCartLocale: req.body.isCartLocale,
                customCss: req.body.customCss,
            }).exec(function(err,data){
                if(err){
                    res.send({
                        "responseCode":400, 
                        "responseMessage": "Error!! Please try agaian",
                        "data": err
                    })
                } else {
                    res.send({
                        "responseCode":200,
                        "responseMessage":"Data updated successfully.",
                        "data": data._id
                    })
                }
            })

        }else{
            var settingapp = new settingAppDb(req.body)
            settingapp.save(function (err, succ) {
                if (err) {
                    res.send({
                        "responseCode": 400,
                        "responseMessage": 'Some error.. Please try again',
                        "data": err
                    })
                } else {
                    res.send({
                        "responseCode": 200,
                        "responseMessage": "Settings are Saved Successfully",
                        "data": succ._id
                    })
                }
            })
        }    
    })
}

module.exports.saveCartSettings = function (req, res) {
    settingAppDb.find({ shopName: req.body.shopName }, function (err, u) {
        if (u.length) {
            settingAppDb.findByIdAndUpdate(u[0]._id, { 
                shopName: req.body.shopName,
                cartTips: req.body.cartTips
            }).exec(function(err,data){
                if(err){
                    res.send({
                        "responseCode":400, 
                        "responseMessage": "Error!! Please try agaian",
                        "data": err
                    })
                } else {
                    res.send({
                        "responseCode":200,
                        "responseMessage":"Data updated successfully.",
                        "data": data._id
                    })
                }
            })

        }else{
            var settingapp = new settingAppDb(req.body)
            settingapp.save(function (err, succ) {
                if (err) {
                    res.send({
                        "responseCode": 400,
                        "responseMessage": 'Some error.. Please try again',
                        "data": err
                    })
                } else {
                    res.send({
                        "responseCode": 200,
                        "responseMessage": "Settings are Saved Successfully",
                        "data": succ._id
                    })
                }
            })
        }    
    })
}

module.exports.getSettingsByShopName = function (req, res) {
    // console.log(req)
    settingAppDb.find({ shopName: req.params.shop }).exec(function (err, data) {
        if (err) {
            res.send({
                "responseCode": "400",
                "responseMessage": "Some error.. Please try again",
                "data": []
            })
        } else {
            res.send({
                "responseCode": "200",
                "responseMessage": "Bundle information get successfully",
                "data": data
            })
        }
    })
}

