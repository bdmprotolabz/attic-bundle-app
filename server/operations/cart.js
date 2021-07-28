var mongoose = require("mongoose");
var cart = require('../models/cartModel');

// add new collections
module.exports.addCart = function (req, res){
    cart.aggregate([
    {  $match : { ProductID : mongoose.Types.ObjectId(req.body.productid),VariantID:mongoose.Types.ObjectId(req.body.variantid),UserCartKey:req.body.cartkey } }
    ]).exec(function(err,data){
        if(err){
          res.send({"responseCode":400,"responseMessage":err })
        } else{
          if(data.length > 0)
          {
            quan=parseInt(data[0].Quantity)+parseInt(req.body.quantity);
            cart.update({"_id" : data[0]._id},{$set:{
                Quantity: quan
            }}).exec();
          }
          else
          {
            console.log("Insert New");
            var cartq = new cart(
                {   UserCartKey:req.body.cartkey,
                    ProductID:mongoose.Types.ObjectId(req.body.productid),
                    Quantity:req.body.quantity,
                    VariantID:mongoose.Types.ObjectId(req.body.variantid)
                });
            cartq.save()
          }
          res.send({"responseCode":200,"responseMessage":"Data Store Successfully"})
        }
    })
}


/*Remove From Cart */
module.exports.removefromcart=function(req,res){
    id=req.params.id;
    cart.remove({"_id":id}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Delete successfully.","cart": data})  
        }
    })
}

/* Get All Cart Item By UserKey*/
module.exports.getcart=function(req,res){
    cartkey=req.params.key;
    cart.aggregate([
    {  $match : { UserCartKey : cartkey } } ,
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
    ]).exec(function(err,cartdata){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
              var total=0;
                for(a=0;a<cartdata.length;a++)
                {
                  quan=parseInt(cartdata[a].Quantity);
                  //console.log(quan);
                  price=parseInt(cartdata[a].variants[0].price);
                  //console.log(price);
                  total=total+parseInt(quan*price);
                }
            res.send({"responseCode":200,"responseMessage":"Cart Get Successfully.","cart": cartdata,"total":total})  
        }
    })
}

/*Update Cart*/
module.exports.updatecart=function(req,res){
    id=req.params.id;
    cart.update({"_id":id},{$set:{
        Quantity: req.body.quantity
    }}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{

            cart.find({"_id":id}).exec(function(err,success){
              console.log(success[0].UserCartKey);
              cart.aggregate([{ $match:{UserCartKey:success[0].UserCartKey}},
                { $lookup:
                    { 
                      from:         "product_variants",
                      localField:   "VariantID",
                      foreignField: "_id",
                      as:           "variants"
                    }
                  },
                ]).exec(function(err1,cartdata){
                //console.log(cartdata);
                var total=0;
                for(a=0;a<cartdata.length;a++)
                {
                  quan=parseInt(cartdata[a].Quantity);
                  //console.log(quan);
                  price=parseInt(cartdata[a].variants[0].price);
                  //console.log(price);
                  total=total+parseInt(quan*price);
                }
                //console.log(total);
                res.send({"responseCode":200,"responseMessage":"Update successfully.","cart": cartdata,"total":total})
              })
            });  
        }
    });
}

module.exports.getcartcount=function(req,res){
    var userToken=req.body.usercartkey;
    cart.aggregate([{ $match:{"UserCartKey":req.body.usercartkey}},
    { $lookup:
        { 
          from:         "product_variants",
          localField:   "VariantID",
          foreignField: "_id",
          as:           "variants"
        }
      },
    ]).exec(function(err1,cartdata){
    //console.log(cartdata);
    var product=0;
    for(a=0;a<cartdata.length;a++)
    {
      quan=parseInt(cartdata[a].Quantity);
      product=product+parseInt(quan);
    }
    //console.log(total);
    res.send({"responseCode":200,"total":product})
  })
}