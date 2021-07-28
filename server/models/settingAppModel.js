var mongoose = require("mongoose");

var schema = mongoose.Schema;
var settingApp = new schema({
    shopName:{
        type: String,
    },
    redirectPage:{
        type: String,
    },
    discountType:{
        type: String,
    },
    isPaymentBtn: { 
        type: Boolean
    },
    isDiscount: { 
        type: Boolean
    },
    isStockControl: { 
        type: Boolean
    },
    isCartLocale: { 
        type: Boolean
    },
    customCss:{
        type: String,
    },
    cartTips:{
        type: Boolean
    },
}, { timestamps: true });

module.exports = mongoose.model("settingApp",settingApp); 