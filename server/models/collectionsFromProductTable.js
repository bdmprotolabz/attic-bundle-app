var mongoose = require("mongoose");

var schema = mongoose.Schema;
var CollectionsM = new schema({
    product_id:{
        type: String,
        required: true
    },
    collection_id:{
        type: String,
        required: true
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

module.exports = mongoose.model("product_collections",CollectionsM); 