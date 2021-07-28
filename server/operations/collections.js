var CollectionDb = require('../models/collectionsModel');

// add new collections
module.exports.addCollection = function (req, res){
    

    var collectionq = new CollectionDb(req.body)
    collectionq.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":err })
      } else{
        res.send({"responseCode":200,"responseMessage":"Data Store Successfully"})
      }
    })
}

// get all collections
module.exports.getCollections = function (req, res){
    CollectionDb.find().exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Collections lists are displayed successfully.","CollectionsList": data})  
        }
    })
}

// get one collections
module.exports.getCollectionById=function(req,res){
    // console.log(req.params); 
    CollectionDb.find({_id:req.params.id}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err})
        } else{
            res.send({"responseCode":200,"responseMessage":"collections are displayed successfully.","data": data})
        }
    })
}

