var mongoose = require("mongoose");

var schema = mongoose.Schema;
var User = new schema({
    shopName:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    accessToken:{
        type: String,
        required: true
    },
    otherInfo: {
        type: Array
    },
    planId: {
        type: String
    },
    timezone: {
        type: String
    },
    isSubscription: { 
        type: Boolean
    },
    status:{
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model("users",User); 