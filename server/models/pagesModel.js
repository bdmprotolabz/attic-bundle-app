var mongoose = require("mongoose");

var schema = mongoose.Schema;
var pagesdata = new schema({
    pageName:{
        type: String,
        required: true
    },
    slug:{
        type: String
    },
    pageContent:{
        type: String
    },
    created_on:{
        type: String
    },
    updated_on:{
        type: String
    } 
});

module.exports = mongoose.model("pages",pagesdata); 