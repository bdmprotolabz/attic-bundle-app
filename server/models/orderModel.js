var mongoose = require("mongoose");

var schema = mongoose.Schema;
var orderdata = new schema({
    ordernumber:{
        type:String
    },
    paymentmethod:{
        type:String
    },
    totalamount:{
        type:String
    },
    shipping:{
        type:String
    },
    orderstatus:{
        type:String
    },
    orderdate:{
        type:String
    },
    paymentstatus:{
        type:String
    }
});

module.exports = mongoose.model("order",orderdata);