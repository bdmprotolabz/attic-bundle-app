var mongoose = require("mongoose");

var schema = mongoose.Schema;
var variantdata = new schema({
    size:{
        type:String
    },
    color:{
        type:Array
    },
    label:{
        type:String
    },
    slide:{
        type:String
    },
    sku:{
        type: String
    },
    product_id:{
        type: Object
    },
    weight:{
        type: String
    },
    price:{
        type:String
    } 
});

module.exports = mongoose.model("product_variants",variantdata);