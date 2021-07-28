var userDb = require('../models/usersModel');
const Shopify = require('shopify-api-node');

module.exports.authUser = function (req, res) {
    console.log(req.body)

    userDb.find({ shopName: req.body.shopName }, function (err, u) {
        if (u.length) {
            console.log(req.body)
            console.log(u[0]._id)
            console.log("existing user is here");
            userDb.findByIdAndUpdate(u[0]._id, {
                shopName: req.body.shopName,
                email: req.body.email,
                accessToken: req.body.accessToken,
                otherInfo: req.body.otherInfo,
                planId: req.body.planId,
                timezone: req.body.timezone,
                isSubscription: req.body.isSubscription,
                status: req.body.status
            }).exec(function (err, data) {
                if (err) {
                    res.send({
                        "responseCode": 400,
                        "responseMessage": "Error!! Please try agaian",
                        "data": err
                    })
                } else {
                    userDb.findById(u[0]._id).exec(function (err, data1) {
                        res.send({
                            "responseCode": 200,
                            "responseMessage": "Data updated successfully.",
                            "data": data1._id
                        })
                    })
                }
            })
        } else {
            var user = new userDb(req.body)
            console.log("new user created");
            user.save(function (err, succ) {
                if (err) {
                    res.send({
                        "responseCode": 400,
                        "responseMessage": 'Some error.. Please try again',
                        "data": err
                    })
                } else {

                    const ScriptTagShopify = require('shopify-api-node');


                    const shopifie = new ScriptTagShopify({
                        shopName: req.body.shopName,
                        accessToken: req.body.accessToken
                    });


                    let params = {
                        "event": "onload",
                        'src': "https://dev-cbf83a9.com/scripts.js",
                        "display_scope": "all"
                    };


                    shopifie.scriptTag.create(params)
                        .then((data) => {

                            console.log(`data `, data);
                            res.send({
                                "responseCode": 200,
                                "responseMessage": "Shop information saved Successfully",
                                "data": succ._id
                            })

                        }).catch((err) => {

                            console.log(`Error in creating scripttag'. = `, err);
                            res.send({
                                "responseCode": 400,
                                "responseMessage": 'Some error.. Please try again after some time',
                                "data": err
                            })

                        });

                }
            })
        }
    })

}

module.exports.uninstallUser = function (req, res) {

    userDb.find({ shopName: req.body.shopName }, function (err, u) {
        if (u.length) {
            var myquery = { shopName: req.body.shopName };
            userDb.deleteOne(myquery, {
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
                        "responseMessage": "Store is deleted successfully.",
                        "data": data
                    })
                }
            })
        }
    })

}

module.exports.GetProductByProductId = function (req, res) {
    userDb.find({ shopName: req.body.shop }).then((data) => {
        var productId = req.body.productId;
        var bundleIDSend = req.body.bundleIDSend;
        // productId = '6599413727411,';
        productId = productId.split(",");

        let purchasesInfoArray = []
        var TtlPricePrdcts = '0.00';
        var TtlPriceSend = '0.00';
        var shopName = '';
        var accessToken = '';

        data.forEach(element => {
            shopName = element.shopName;
            accessToken = element.accessToken;
        });


        const shopify = new Shopify({
            shopName: shopName,
            accessToken: accessToken
        });

        shopify.product.count()
            .then(async (count) => {
                if (count > 0) {
                    var totalcount = productId.length;
                    var startCount = 0;

                    var bundleDb = require('../models/bundlesModel');
                    bundleDb.find({ _id: bundleIDSend }).then((data) => {
                        productId.forEach(element => {
                            shopify.product.get(element).then(function (result) {
                                startCount++;
                                TtlPriceSend = parseFloat(TtlPriceSend) + parseFloat(result.variants[0].price);

                                GetProduct = {
                                    "Id": result.id,
                                    "Title": result.title,
                                    "Variants": result.variants,
                                    "Images": result.images
                                }
                                purchasesInfoArray.push(GetProduct)

                                if (totalcount == startCount) {
                                    if (data[0].pricingDiscountType == 'percentage_off') {
                                        var percentage = data[0].pricingDiscountAmount;
                                        price = TtlPriceSend;
                                        calcPrice = price - ((price / 100) * percentage);
                                        price = calcPrice.toFixed(2);
                                    } else if (data[0].pricingDiscountType == 'fixed_amount_off') {
                                        var AmountOff = data[0].pricingDiscountAmount;
                                        var original_price = TtlPriceSend;
                                        var discounted_price = original_price - AmountOff;
                                        var discount = 100 * (original_price - discounted_price) / original_price;
                                        calcPrice = original_price - ((original_price / 100) * discount);
                                        price = calcPrice.toFixed(2);
                                    } else {
                                        price = TtlPriceSend;
                                    }

                                    TtlPricePrdcts = parseFloat(TtlPricePrdcts) + parseFloat(price);

                                    res.send({
                                        "Products": purchasesInfoArray,
                                        "BundleData": data,
                                        "Total": TtlPricePrdcts,
                                        "Totalsend": TtlPriceSend
                                    });
                                }
                            }).catch(err => {
                                console.log(err);
                            });
                        });
                    }).catch((err) => {
                        console.log(`Error in bundle'. = `, err);
                    });
                }
            }).catch(err => {
                console.log(err);
            });

    }).catch((err) => {
        console.log(`Error in user'. = `, err);
    });
}

module.exports.createAndGetDiscount = function (req, res) {
    var favor = req.body.pids;
    var totalPrice = req.body.totalPrice;
    favor = favor.split(",");

    var mathdigit = Math.random().toString().slice(2, 11);

    userDb.find({ shopName: req.body.shop }).then((data) => {

        var shopName = '';
        var accessToken = '';

        data.forEach(element => {
            shopName = element.shopName;
            accessToken = element.accessToken;
        });

        var datetime = new Date();
        datetime.setDate(datetime.getDate() - 1);

        var couponcode = "DISCOUNT-AA-" + mathdigit;
        const shopify = new Shopify({
            shopName: shopName,
            accessToken: accessToken
        });

        var bundleDb = require('../models/bundlesModel');
        bundleDb.find({ _id: req.body.bundle }).then((data) => {

            var d_type = '';
            var d_offer = '';
            data.forEach(element => {
                d_type = element.pricingDiscountType;
                d_offer = element.pricingDiscountAmount;
            });

            if (d_type == "percentage_off" || d_type == "free_shipping") {
                var params = ({
                    title: couponcode,
                    target_type: "line_item",
                    target_selection: "entitled",
                    allocation_method: "across",
                    value_type: "percentage",
                    value: "-" + d_offer,
                    customer_selection: "all",
                    once_per_customer: true,
                    once_per_order: true,
                    usage_limit: '1',
                    entitled_variant_ids: favor,
                    prerequisite_subtotal_range: ({ greater_than_or_equal_to: totalPrice }),
                    starts_at: datetime
                });

                if (d_type == "free_shipping") {

                    var params = ({
                        title: couponcode,
                        target_type: "shipping_line",
                        target_selection: "all",
                        allocation_method: "each",
                        value_type: "percentage",
                        value: "-100",
                        customer_selection: "all",
                        once_per_customer: true,
                        once_per_order: true,
                        usage_limit: '1',
                        prerequisite_subtotal_range: ({ greater_than_or_equal_to: totalPrice }),
                        starts_at: datetime
                    });
                }

            } else {

                var params = ({
                    title: couponcode,
                    target_type: "line_item",
                    target_selection: "entitled",
                    allocation_method: "across",
                    value_type: "fixed_amount",
                    value: "-" + d_offer,
                    customer_selection: "all",
                    once_per_customer: true,
                    once_per_order: true,
                    usage_limit: '1',
                    entitled_variant_ids: favor,
                    prerequisite_subtotal_range: ({ greater_than_or_equal_to: totalPrice }),
                    starts_at: datetime
                });

            }
            shopify.priceRule.create(params)
                .then((data) => {
                    shopify.discountCode.create(data.id, { "code": couponcode }).then((data) => {
                        console.log(`coupon code created = `, data);
                        res.send({
                            "status": 'success',
                            "discount_code": {
                                "discount_data": data,
                                "totalPrice": totalPrice,
                                "favorite": favor
                            }
                        });
                    }).catch((err) => {
                        console.log(`Error in create coupon code'. = `, err);
                    });
                }).catch((err) => {
                    console.log(`Error in create price rule'. = `, err);
                });
        }).catch((err) => {
            console.log(`Error in bundle'. = `, err);
        });
    }).catch((err) => {
        console.log(`Error in user'. = `, err);
    });
}

module.exports.checkDiscount = function (req, res) {

    var priceRuleId = req.body.prc_rul_id;
    var discountId = req.body.dscntId;

    userDb.find({ shopName: req.body.shop }).then((data) => {
        var shopName = '';
        var accessToken = '';

        data.forEach(element => {
            shopName = element.shopName;
            accessToken = element.accessToken;
        });

        const shopify = new Shopify({
            shopName: shopName,
            accessToken: accessToken
        });
        shopify.priceRule.get(priceRuleId).then((Pricedata) => {
            shopify.discountCode.get(priceRuleId, discountId).then((data) => {
                console.log(`Discount data  = `, data);
                res.send({
                    "status": 'success',
                    "data": data
                });
            }).catch((err) => {
                res.send({
                    "status": 'error',
                    "data": err
                });
                console.log(`Error in getting disocunt data'. = `, err);
            });
        }).catch((err) => {
            console.log(`Error in getting PriceRule data'. = `, err);
        });
    }).catch((err) => {
        console.log(`Error in user'. = `, err);
    });
}