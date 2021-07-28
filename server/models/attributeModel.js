var mongoose = require("mongoose");

var schema = mongoose.Schema;
var attribute = new schema({
    product_id:{
        type: Object
    },
    attribute_name:{
        type: String,
        required: true
    },
    type:{
        type: String
    },
    status: {
        type: Boolean
    }
});

module.exports = mongoose.model("product_attribute",attribute); 