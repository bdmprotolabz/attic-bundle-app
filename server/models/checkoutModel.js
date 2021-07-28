var mongoose = require("mongoose");

var schema = mongoose.Schema;
var checkoutdata = new schema({
    email:{
        type:String
    },
    fullname:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    province:{
        type:String
    },
    zipcode:{
        type:String
    },
    country:{
        type:String
    },
    shipping:{
        type:String
    },
    card:{
        type:String
    },
    month:{
        type:String
    },
    year:{
        type:String
    },
    cvc:{
        type:String
    },
    paymentmethod:{
        type:String
    },
    usertoken:{
        type:String
    }
});

module.exports = mongoose.model("checkout",checkoutdata);