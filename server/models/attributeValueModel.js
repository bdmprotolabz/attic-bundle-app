var mongoose = require("mongoose");

var schema = mongoose.Schema;
var attributevalue = new schema({
    attribute_id:{
        type: Object
    },
    value:{
        type: String
    },
    color_code:{
        type: String
    }
});

module.exports = mongoose.model("product_attribute_values",attributevalue); 