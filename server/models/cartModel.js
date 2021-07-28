var mongoose = require("mongoose");

var schema = mongoose.Schema;
var cartdata = new schema({
    UserCartKey:{
        type: String
    },
    ProductID:{
        type: Object
    },
    Quantity:{
        type: String
    },
    VariantID:{
        type:Object
    } 
});

module.exports = mongoose.model("cart",cartdata); 