var bundleDb = require('../models/bundlesModel');

module.exports.saveStepOne = function (req, res) {

    // console.log(req.body)
    var bundle = new bundleDb(req.body)

    bundle.save(function (err, succ) {
        if (err) {
            res.send({
                "responseCode": 400,
                "responseMessage": 'Some error.. Please try again',
                "data": err
            })
        } else {
            res.send({
                "responseCode": 200,
                "responseMessage": "Bundle information saved Successfully",
                "data": succ._id
            })
        }
    })
}

module.exports.saveStepTwo = function (req, res) {

    // console.log(req.body)

    bundleDb.findByIdAndUpdate(req.body.id, {
        products: req.body.products,
        pricingDiscountType: req.body.pricingDiscountType,
        pricingDiscountAmount: req.body.pricingDiscountAmount,
        bundleMessage: req.body.bundleMessage,
        bundleSuccessMessage: req.body.bundleSuccessMessage,
        scheduleBundle: req.body.scheduleBundle,
        activeDate: req.body.activeDate,
        DeActiveDate: req.body.DeActiveDate
    }).exec(function (err, data) {
        if (err) {
            res.send({
                "responseCode": 400,
                "responseMessage": "Error!! Please try agaian",
                "data": err
            })
        } else {
            res.send({
                "responseCode": 200,
                "responseMessage": "Data updated successfully.",
                "data": []
            })
        }
    })
}

module.exports.saveStepThree = function (req, res) {

    console.log("Request is: " + req.body);

    bundleDb.findByIdAndUpdate(req.body.id, {
        alignment: req.body.alignment,
        fontSize: req.body.fontSize,
        fontColor: req.body.fontColor,
        imageBorderRadius: req.body.imageBorderRadius,
        buttonColor: req.body.buttonColor,
        buttonBgColor: req.body.buttonBgColor,
        buttonFontSize: req.body.buttonFontSize,
        animationGlow: req.body.animationGlow,
        animationShake: req.body.animationShake,
        animationButtonSize: req.body.animationButtonSize,

        FontFamily: req.body.FontFamily,
        FontWeight: req.body.FontWeight,
        FontType: req.body.FontType,
        imageShadowX: req.body.imageShadowX,
        imageShadowY: req.body.imageShadowY,
        imageShadowBlur: req.body.imageShadowBlur,
        imageShadowSpread: req.body.imageShadowSpread,
        imageShadowColor: req.body.imageShadowColor,
        imageBorderRadius: req.body.imageBorderRadius,
        imageBorderWidth: req.body.imageBorderWidth,
        imageBorderColor: req.body.imageBorderColor,
        buttonBorderColor: req.body.buttonBorderColor,
        buttonBorderRadius: req.body.buttonBorderRadius,
        buttonBorderWidth: req.body.buttonBorderWidth,
        buttonShadowX: req.body.buttonShadowX,
        buttonShadowY: req.body.buttonShadowY,
        buttonShadowBlur: req.body.buttonShadowBlur,
        buttonShadowSpread: req.body.buttonShadowSpread,
        buttonShadowColor: req.body.buttonShadowColor,
        buttonAlignment: req.body.buttonAlignment,
        buttonFontSize: req.body.buttonFontSize,
        buttonFontType: req.body.buttonFontType,
        ButtonFontWeight: req.body.ButtonFontWeight,
        isButtonItalic: req.body.isButtonItalic,
        isButtonUnderline: req.body.isButtonUnderline,


    }).exec(function (err, data) {
        if (err) {
            res.send({
                "responseCode": 400,
                "responseMessage": "Error!! Please try agaian",
                "data": err
            })
        } else {
            res.send({
                "responseCode": 200,
                "responseMessage": "Data updated successfully.",
                "data": []
            })
        }
    })
}

module.exports.launchBundle = function (req, res) {

    console.log("Request is: " + req.body);

    bundleDb.findByIdAndUpdate(req.body.id, {
        status: 1,
    }).exec(function (err, data) {
        if (err) {
            res.send({
                "responseCode": 400,
                "responseMessage": "Error!! Please try agaian",
                "data": err
            })
        } else {
            res.send({
                "responseCode": 200,
                "responseMessage": "Data updated successfully.",
                "data": []
            })
        }
    })
}

module.exports.updateStepOne = function (req, res) {

    // console.log(req.body)

    bundleDb.findByIdAndUpdate(req.body.id, {
        products: req.body.products,
        bundleDisplay: req.body.bundleDisplay,
        bundleDisplayProducts: req.body.bundleDisplayProducts,
    }).exec(function (err, data) {
        if (err) {
            res.send({
                "responseCode": 400,
                "responseMessage": "Error!! Please try agaian",
                "data": err
            })
        } else {
            res.send({
                "responseCode": 200,
                "responseMessage": "Data updated successfully.",
                "data": []
            })
        }
    })
}

module.exports.getBundleById = function (req, res) {
    bundleDb.find({ _id: req.params.id }).exec(function (err, data) {
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

module.exports.getBundlesByShop = function (req, res) {
    // console.log(req)
    bundleDb.find({ shopName: req.params.shop }).exec(function (err, data) {
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

module.exports.getBundlesByFilter = function(req, res) {

    if(req.body.doSearch !=""){
        if(req.body.TypeSend == '1'){
            bundleDb.find({ 'bundleName': {'$regex': req.body.doSearch} }).exec(function (err, data) {
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
        }else{
            bundleDb.find({ 'bundleTag': {'$regex': req.body.doSearch} }).exec(function (err, data) {
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
    }else{
        bundleDb.find({ shopName: req.body.shop }).exec(function (err, data) {
                if (err) {
                    res.send({
                        "responseCode": "400",
                        "responseMessage": "Some error.. Please try again",
                        "data": []
                    })
                } else {
                    res.send({
                        "responseCode": "200",
                        "responseMessage": "Bundle information get successfully on empty filter",
                        "data": data
                    })
                }
            })
    }
}

module.exports.updateBundleNameById = function (req, res) {
    console.log(req.body)

    bundleDb.findByIdAndUpdate(req.body.id, {
        bundleName: req.body.value
    }).exec(function (err, data) {
        if (err) {
            res.send({
                "responseCode": 400,
                "responseMessage": "Error!! Please try agaian",
                "data": err
            })
        } else {
            res.send({
                "responseCode": 200,
                "responseMessage": "Data updated successfully.",
                "data": data
            })
        }
    })
}

module.exports.updateBundleTagById = function (req, res) {

    // console.log(req.body)

    bundleDb.findByIdAndUpdate(req.body.id, {
        bundleTag: req.body.value
    }).exec(function (err, data) {
        if (err) {
            res.send({
                "responseCode": 400,
                "responseMessage": "Error!! Please try agaian",
                "data": err
            })
        } else {
            res.send({
                "responseCode": 200,
                "responseMessage": "Data updated successfully.",
                "data": []
            })
        }
    })
}

module.exports.saveMasterEditSettings = function (req, res) {
    console.log("Request is: " + req.body);
    //console.log(req.body.id);
    if(req.body.id == ""){
        console.log("in if means empty");
        res.send({
            "responseCode": 400,
            "responseMessage": "Error!! Please try agaian",
            "data": "ID is not present"
        })
    }else{
        var count1 = 0;
        var rowArr = req.body.id; 
        //var rowArr = rowids.split(",");
        for(var i=0; i<rowArr.length;i++){
        //     console.log("in loop with i = " + rowArr[1]);
            bundleDb.findByIdAndUpdate(rowArr[0], {
                alignment: req.body.alignment,
                fontSize: req.body.fontSize,
                fontColor: req.body.fontColor,
                imageBorderRadius: req.body.imageBorderRadius,
                buttonColor: req.body.buttonColor,
                buttonBgColor: req.body.buttonBgColor,
                buttonFontSize: req.body.buttonFontSize,
                animationGlow: req.body.animationGlow,
                animationShake: req.body.animationShake,
                animationButtonSize: req.body.animationButtonSize,

                FontFamily: req.body.FontFamily,
                FontWeight: req.body.FontWeight,
                FontType: req.body.FontType,
                imageShadowX: req.body.imageShadowX,
                imageShadowY: req.body.imageShadowY,
                imageShadowBlur: req.body.imageShadowBlur,
                imageShadowSpread: req.body.imageShadowSpread,
                imageShadowColor: req.body.imageShadowColor,
                imageBorderRadius: req.body.imageBorderRadius,
                imageBorderWidth: req.body.imageBorderWidth,
                imageBorderColor: req.body.imageBorderColor,
                buttonBorderColor: req.body.buttonBorderColor,
                buttonBorderRadius: req.body.buttonBorderRadius,
                buttonBorderWidth: req.body.buttonBorderWidth,
                buttonShadowX: req.body.buttonShadowX,
                buttonShadowY: req.body.buttonShadowY,
                buttonShadowBlur: req.body.buttonShadowBlur,
                buttonShadowSpread: req.body.buttonShadowSpread,
                buttonShadowColor: req.body.buttonShadowColor,
                buttonAlignment: req.body.buttonAlignment,
                buttonFontSize: req.body.buttonFontSize,
                buttonFontType: req.body.buttonFontType,
                ButtonFontWeight: req.body.ButtonFontWeight,
                isButtonItalic: req.body.isButtonItalic,
                isButtonUnderline: req.body.isButtonUnderline,
            }).exec(function (err, data) {
                if (err) {
                    res.send({
                        "responseCode": 400,
                        "responseMessage": "Error!! Please try agaian",
                        "data": "error"
                    })
                } else {
                    res.send({
                        "responseCode": 200,
                        "responseMessage": "Data updated successfully.",
                        "data": []
                    })
                }
            })
        }
        
    }
}

module.exports.doBundleAction = function(req, res) {
    if(req.body.doAction !="deleteBundle"){
        if(req.body.doAction !="enableBundle"){
            var newStatus = 0;
        }else{
            var newStatus = 1;
        }
        var rowArr = req.body.id;
        rowArr.pop();
        var counter = 0;
        for(var i=0; i<rowArr.length; i++){
            bundleDb.updateOne({ _id: rowArr[i] }, 
            { $set: { status: newStatus }},
            function (err, result) {
                if (err){
                    counter--;
                }else{
                    counter++;
                }
            });
        }  
        setTimeout(function(){  
            if(counter<=0){
                bundleDb.find({ shopName: req.body.shop }).exec(function (err, data) {
                    res.send({
                        "responseCode": 400,
                        "responseMessage": "error",
                        "data": data
                    })
                })
            }else{
                bundleDb.find({ shopName: req.body.shop }).exec(function (err, data) {
                    res.send({
                        "responseCode": 200,
                        "responseMessage": "Data Updated successfully.",
                        "data": data
                    })
                })
            }
        }, 1000);
    }else{
        var rowArr = req.body.id; var counter = 0;
        for(var i=0; i<rowArr.length;i++){
            var myquery = { _id: rowArr[i] };
            bundleDb.deleteOne(myquery, {
            }).exec(function (err, data) {
                if (err) {
                    counter = 0;
                } else {
                    counter++;
                }
            })
        }
        setTimeout(function(){
            if (counter==0) {
                bundleDb.find({ shopName: req.body.shop }).exec(function (err, data) {
                    res.send({
                        "responseCode": 400,
                        "responseMessage": "Error!! Please try agaian",
                        "data": data
                    })
                })
            } else {
                bundleDb.find({ shopName: req.body.shop }).exec(function (err, data) {
                    res.send({
                        "responseCode": 200,
                        "responseMessage": "Data Deleted successfully.",
                        "data": data
                    })
                })
            }
        }, 1000);
    }
}


// Front End Ajax calls
module.exports.getBundlesByProductID = function (req, res) {
    // console.log(req)
    bundleDb.find({ shopName: req.body.shopName }).exec(function (err, data) {
        if (err) {
            res.send({
                "responseCode": "400",
                "responseMessage": "Some error.. Please try again",
                "data": []
            })
        } else {
            var xxx = [];
            for(var x=0; x<data.length;x++){
                if(data[x].bundleDisplay=="specific_products" && data[x].status!=0){
                    for(var y=0; y<data[x].bundleDisplayProducts.length; y++){
                        var pid = data[x].bundleDisplayProducts[y].id.split("gid://shopify/Product/");
                        if(req.body.productid==pid[1]){
                            xxx = data[x];
                        } 
                    }
                }
                if(data[x].bundleDisplay=="products_in_bundle" && data[x].status!=0){
                    for(var y=0; y<data[x].products.length; y++){
                        var pid = data[x].products[y].id.split("gid://shopify/Product/");
                        if(req.body.productid==pid[1]){
                            xxx = data[x];
                        } 
                    }
                }
                if(data[x].bundleDisplay=="none_products_page" && data[x].status!=0){
                    for(var y=0; y<data[x].products.length; y++){
                        var pid = data[x].products[y].id.split("gid://shopify/Product/");
                        if(req.body.productid==pid[1]){
                            xxx = data[x];
                        } 
                    }
                }
            }
            res.send({
                "responseCode": "200",
                "responseMessage": "Bundle information get successfully",
                "data": xxx
            })
        }
    })
}


// Front End Ajax calls
module.exports.getBundlesByembededcode = function (req, res) {
    // console.log(req)
    bundleDb.find({ embededCodeSTR: req.body.embededCode }).exec(function (err, data) {
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