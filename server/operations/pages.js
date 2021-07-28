var PagesDb = require('../models/pagesModel');

// add new collections
/*module.exports.addCollection = function (req, res){
    var collectionq = new CollectionDb(req.body)
    collectionq.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":err })
      } else{
        res.send({"responseCode":200,"responseMessage":"Data Store Successfully"})
      }
    })
}*/

// get all collections
module.exports.getPages = function (req, res){
    PagesDb.find().exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Pages lists are displayed successfully.","pages": data})  
        }
    })
}

// get one collections
module.exports.getPagesById=function(req,res){
    console.log(req.params);
    PagesDb.find({slug:req.params.slug}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err})
        } else{
            res.send({"responseCode":200,"responseMessage":"Page is displayed successfully.","data": data})
        }
    })
}