var checkout = require('../models/checkoutModel');
var orders = require('../models/orderModel');
var orderdtls = require('../models/ordersDetailModel');
var ordercustomer = require('../models/orderCustomer');
var cart = require('../models/cartModel');
var mongoose = require("mongoose");

function GenerateToken(flag){
    const SET="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const SET1="0123456789";
    token="";
    if(flag == "C")
    {
        for(a=1;a<3;a++)
        {
            var ran=Math.floor(Math.random() * (26 - 0)) + 0;
            token=token.concat(SET[ran]);
        }
    }
    else
    {
        for(a=1;a<6;a++)
        {
            var ran=Math.floor(Math.random() * (10 - 0)) + 0;
            token=token.concat(SET1[ran]);
        }
    }
    //console.log(typeof token);
    return token;
}

module.exports.createUser=function(req,res){
        var ordern=GenerateToken("C")+'-'+GenerateToken("N")+'-'+GenerateToken("N");
        console.log(ordern);
    var odr = new orders({
    	ordernumber:ordern,
    	paymentmethod:req.body.paymentmethod,
    	totalamount:req.body.totalamount,
    	shipping:req.body.shipping,
    	orderstatus:req.body.orderstatus,
    	orderdate:req.body.orderdate,
        paymentstatus:req.body.paymentstatus
    });
    odr.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":err })
      } else

      {

        usertoken=req.body.usertoken;

        cart.aggregate([
            {  $match : { UserCartKey : usertoken } } ,
            { $lookup:
              { 
                  from:         "products",
                  localField:   "ProductID",
                  foreignField: "_id",
                  as:           "product"
              }
            },
            { $lookup:
              { 
                from:         "product_variants",
                localField:   "VariantID",
                foreignField: "_id",
                as:           "variants"
              }
            },
            { $lookup:
              { 
                from:         "product_variant_images",
                localField:   "variants._id",
                foreignField: "product_variant_id",
                as:           "variant_images"
              }
            },
            { $lookup:
              { 
                from:         "product_attribute_values",
                localField:   "variants.size",
                foreignField: "_id",
                as:           "size"
              }
            },
            { $lookup:
              { 
                from:         "product_attribute_values",
                localField:   "variants.color",
                foreignField: "_id",
                as:           "color"
              }
            },
            { $lookup:
              { 
                from:         "product_attribute_values",
                localField:   "variants.lebel",
                foreignField: "_id",
                as:           "lebel"
              }
            },
            { $lookup:
              { 
                from:         "product_attribute_values",
                localField:   "variants.slide",
                foreignField: "_id",
                as:           "slide"
              }
            },
            ]).exec(function(err,data){
                if(err){
                    res.send({"responseCode":400,"responseMessage": err })
                } else{
                    console.log(data.length);
                    for(a=0;a<data.length;a++)
                    {
                        var ordrdtl= new orderdtls({
                            ordernumber:ordern,
                            product_id: data[a].ProductID,
                            productname: data[a].product[0].title,
                            productprice: data[a].variants[0].price,
                            productimage: data[a].variant_images[0].image,
                            description: data[a].product[0].description,
                            orderquantity: data[a].Quantity,
                            weight: data[a].variants[0].weight,
                            sku: data[0].variants[0].sku,
                            variant_id: data[a].VariantID
                        });
                        ordrdtl.save(); 
                    }

                    var ordrcstmr = new ordercustomer({
                        email:req.body.email,
                        fullname:req.body.fullname,
                        address:req.body.address,
                        city:req.body.city,
                        province:req.body.province,
                        zipcode:req.body.zipcode,
                        country:req.body.country,
                        shipping:req.body.shippingtype,
                        card:req.body.card,
                        month:req.body.month,
                        year:req.body.year,
                        cvc:req.body.cvc,
                        ordernumber:ordern,
                        paymentmethod:req.body.paymentmethod
                    });
                    ordrcstmr.save();

                    orders.aggregate([  
                    {  $match : { ordernumber : ordern } } ,
                    { $lookup:
                      { 
                        from:         "orderdetails",
                        localField:   "ordernumber",
                        foreignField: "ordernumber",
                        as:           "orderdetails"
                      }
                    },
                    { $lookup: {
                        from: 'ordercustomers',
                        localField: 'ordernumber',
                        foreignField: 'ordernumber',
                        as: 'customer'
                      }
                    },
                    ]).exec(function(err,order){
                        if(err){
                            res.send({"responseCode":400,"responseMessage": err })
                        } else{
                            res.send({"responseCode":200,"responseMessage":"Order Placed Successfully.","order": order})  
                        }
                    })


                    //res.send({"responseCode":200,"responseMessage":"Cart Get Successfully.","cart": data})  
                }
            });
        //res.send({"responseCode":200,"responseMessage":"Data Store Successfully"})
      }
    })
}

module.exports.getorderbypaymentstatus=function(req,res){

    orders.aggregate([  
    {  $match : { paymentstatus : req.body.paymentstatus } } ,
    { $lookup:
      { 
        from:         "orderdetails",
        localField:   "ordernumber",
        foreignField: "ordernumber",
        as:           "orderdetails"
      }
    },
    { $lookup: {
        from: 'ordercustomers',
        localField: 'ordernumber',
        foreignField: 'ordernumber',
        as: 'customer'
      }
    },
    ]).exec(function(err,order){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Orders get Successfully.","order": order})  
        }
    })
}


module.exports.getorderbyotherdata=function(req,res){
    values = Object.values(req.body);
    keys = Object.keys(req.body);
    var obj = {};
    for(a=0;a<keys.length;a++)
    {
      obj[keys[a]] = values[a];
    }
    ordercustomer.aggregate([  
    {  $match : obj } ,
    { $lookup:
      { 
        from:         "orderdetails",
        localField:   "ordernumber",
        foreignField: "ordernumber",
        as:           "orderdetails"
      }
    },
    { $lookup: {
        from: 'orders',
        localField: 'ordernumber',
        foreignField: 'ordernumber',
        as: 'order'
      }
    },
    { $lookup: {
          from: 'product_variants',
          localField: 'orderdetails.variant_id',
          foreignField: '_id',
          as: 'variants'
        }
    },
    ]).exec(function(err,order){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Orders get Successfully.","order": order})  
        }
    })/*
    res.send({"responseCode":400,"responseMessage":"Test" });*/
}


module.exports.getorders=function(req,res){

    orders.aggregate([  
    { $lookup:
      { 
        from:         "orderdetails",
        localField:   "ordernumber",
        foreignField: "ordernumber",
        as:           "orderdetails"
      }
    },
    { $lookup: {
        from: 'ordercustomers',
        localField: 'ordernumber',
        foreignField: 'ordernumber',
        as: 'customer'
      }
    },
    ]).exec(function(err,order){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Orders get Successfully.","order": order})  
        }
    })
}