var mongoose = require("mongoose");

var schema = mongoose.Schema;
var odrctmrdata = new schema({
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
    ordernumber:{
        type:String
    }
});

module.exports = mongoose.model("ordercustomer",odrctmrdata);