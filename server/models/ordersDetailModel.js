var mongoose = require("mongoose");

var schema = mongoose.Schema;
var orderdtldata = new schema({
    ordernumber:{
        type:String
    },
    product_id:{
        type:Object
    },
    variant_id:{
        type:Object
    },
    productname:{
        type:String
    },
    productprice:{
        type:String
    },
    productimage:{
        type:String
    },
    description:{
        type:String
    },
    orderquantity:{
        type:String
    },
    weight:{
        type:String
    },
    sku:{
        type:String
    }
});

module.exports = mongoose.model("orderdetail",orderdtldata);