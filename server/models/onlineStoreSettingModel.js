var mongoose = require("mongoose");

var schema = mongoose.Schema;
var onlineStoredata = new schema({
    isShippingOnProduct:{
        type: String
    },
    isFeaturedCollectionOnHome:{
        type: String
    },
    isCountdownOnCheckout:{
        type: String
    },
    isCountdownOnProduct:{
        type:String
    },
    isDisplayTrackOrderOnMenu:{
        type: String
    },
    testimonyPageUrlOnMenu:{
        type: String
    },
    testimonyPageUrlOnProduct:{
        type: String
    },
    discountPercentage:{
        type:String
    },
    isTopbarPromotion:{
        type: String
    },
    discountOrofferText:{
        type: String
    },
    created_on:{
        type: String
    },
    updated_on:{
        type: String
    } 
});

module.exports = mongoose.model("onlinestorepreferences",onlineStoredata); 