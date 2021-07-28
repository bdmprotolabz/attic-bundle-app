var mongoose = require("mongoose");

var schema = mongoose.Schema;
var Clcton = new schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    collections:{
        type: String
    },
    homepage:{
        type: String
    },
    created_on:{
        type: String
    } 
});

module.exports = mongoose.model("collections",Clcton); 



// var mongoose = require('mongoose');

// // var schema = mongoose.Schema;

// var collectionSchema = mongoose.Schema({
//     title:{
//         type: String,
//         required: true
//     },
//     description:{
//         type: String
//     },
//     collection:{
//         type: Number
//     },
//     homepage:{
//         type: Number
//     }
// }, {timestamp:true})

// var Collection = mongoose.model('Collection', collectionSchema);
// module.exports = Collection;
