var mongoose = require("mongoose");

var schema = mongoose.Schema;
var checoutformdata = new schema({
    Ismobilenumber:{
        type: String
    }
});

module.exports = mongoose.model("checkoutformoptions",checoutformdata);