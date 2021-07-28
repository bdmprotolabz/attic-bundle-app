var mongoose = require("mongoose");

var schema = mongoose.Schema;
var accountdata = new schema({
    email:{
        type: String,
        required: true
    },
    role:{
        type: String
    },
    password:{
        type: String
    },
    created_on:{
        type: String
    },
    updated_on:{
        type: String
    } 
});

module.exports = mongoose.model("accounts",accountdata); 