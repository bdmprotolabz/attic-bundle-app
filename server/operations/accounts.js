var PagesDb = require('../models/accountModel');

// get all collections
module.exports.getUsers = function (req, res){
    PagesDb.find().exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Pages lists are displayed successfully.","account": data})  
        }
    })
}

// get one collections
module.exports.createUser=function(req,res){
    var account = new PagesDb(req.body)
    account.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":err })
      } else{
        res.send({"responseCode":200,"responseMessage":"Data Store Successfully"})
      }
    })
}


// get one collections
module.exports.deleteUser=function(req,res){
    id=req.params.id;
    PagesDb.remove({"_id":id}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Delete successfully.","account": data})  
        }
    })
}