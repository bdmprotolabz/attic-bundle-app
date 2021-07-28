var mongoose = require("mongoose");

var schema = mongoose.Schema;
var Prdcts = new schema({
    slug:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    isHideOnSearchEngine:{
        type: Boolean
    },
    isAddToHomepage:{
        type: Boolean
    },
    isHideFromListingPage:{
        type: Boolean
    },
    facebookPixelId: {
        type: String
    },
    status:{
        type: Boolean
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
});

module.exports = mongoose.model("products",Prdcts); 