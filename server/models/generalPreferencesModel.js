var mongoose = require("mongoose");

var schema = mongoose.Schema;
var generaldata = new schema({
    storeName:{
        type: String
    },
    tagLine:{
        type: String
    },
    supportEmail:{
        type: String
    },
    businessName:{
        type:String
    },
    Phone:{
        type: String
    },
    Address:{
        type: String
    },
    City:{
        type: String
    },
    postalCode:{
        type:String
    },
    country:{
        type: String
    },
    timeZone:{
        type: String
    },
    currency:{
        type:String
    },
    created_on:{
        type: String
    },
    updated_on:{
        type: String
    } 
});

module.exports = mongoose.model("generalpreferences",generaldata); 