var mongoose = require("mongoose");

var schema = mongoose.Schema;
var trackingdata = new schema({
    GoogleTagManager:{
        type: String
    },
    GoogleAnalytics:{
        type: String
    },
    GoogleConversion:{
        type: String
    },
    GoogleSiteVerificationCode:{
        type:String
    },
    FacebookPixel:{
        type: String
    },
    BingSiteVerificationCode:{
        type: String
    },
    created_on:{
        type: String
    },
    updated_on:{
        type: String
    } 
});

module.exports = mongoose.model("trackingpreferences",trackingdata); 