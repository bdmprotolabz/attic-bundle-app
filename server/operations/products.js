var mongoose = require("mongoose");
var ProductDb = require('../models/productsModel');
var Variants = require('../models/variantModel');
var TagDb = require('../models/tagsModel');
var CollectionsDb = require('../models/collectionsFromProductTable');
var attrmodel = require('../models/attributeModel');
var attrvaluemodel = require('../models/attributeValueModel');

// save product and varients
module.exports.addProduct = function (req, res){
    // console.log(req.body.data)
    // console.log(req.body.data.collections.length)

    // process.exit()

    addInProductTable = {
        title : req.body.data.title,
        description : req.body.data.description,
        isHideOnSearchEngine : req.body.data.hideFromSearchEngine,
        isAddToHomepage : req.body.data.addToHomePage,
        isHideFromListingPage : req.body.data.hideFromListingPage,
        facebookPixelId : req.body.data.facebookPixelId,
        status : 1,
        created_at : req.body.data.created_at,
        updated_at : null
    }
    // console.log(addInProductTable)

    // ----------------------------------------------
    // products table
    // ----------------------------------------------
   
    var productq = new ProductDb(addInProductTable)

    // save in the product table
    productq.save(function(err,succ){
      if(err){
        //res.send({"responseCode":400,"responseMessage":err })
      } else{

        //  save in the tag table
        var currentProductId = productq._id;   //  current product id
        //console.log("current PID:" + currentProductId);
        tags = req.body.data.tag;  
        tagsLength = tags.length; 
        //console.log(tags); 
        for (var i=0; i<tagsLength; i++){
          var tagData = new Array();
          tagData[i] = {
            product_id : currentProductId,
            tag: tags[i],
            status: 1,
            created_at : req.body.data.created_at,
            updated_at : null
          }
          var tagq = new TagDb(tagData[i])
          tagq.save()
          
        }  // for loop of tags end 

        collectionsLength = req.body.data.collections.length;
        for(var j=0; j<collectionsLength; j++){

          var collectionData = new Array();
          collectionData[j] = {
            product_id: currentProductId,
            collection_id: req.body.data.collections[j].value,
            status: 1,
            created_at: req.body.data.created_at,
            updated_at: null
          }

          //console.log(collectionData[j])

          var colq = new CollectionsDb(collectionData[j])
          colq.save();
          }

          attributelength=req.body.data.attribute.length;
          Attributes=req.body.data.attribute;
          //console.log(attributelength);
          for(x=0;x<attributelength;x++)
          {
            //console.log(currentProductId);
            //console.log(Attributes[x]);
            var attdata = new attrmodel({
              product_id:currentProductId,
              attribute_name:Attributes[x].name,
              type:Attributes[x].type,
              status: true
            });
            attdata.save();
            currentAttributeID= attdata._id;
            //console.log("currentAttributeID "+currentAttributeID);
            
            for(y=0; y<Attributes[x].value.length; y++)
            {
              var colorcode="";
              value=Attributes[x].value[y];
              if(Attributes[x].type == "color")
              {
                colorcode=Attributes[x].value[y].colorcode;
                value=Attributes[x].value[y].colorname;
              }
              var attvaluedata = new attrvaluemodel({
                attribute_id:currentAttributeID,
                value:Attributes[x].value[y].colorname,
                color_code:colorcode
              });
              attvaluedata.save();
            }
          }

          variantsLength=req.body.data.variants.length;
          vari= req.body.data.variants;
          for(z=0;z<variantsLength;z++)
          {
            vari[z]["product_id"]=currentProductId;
            var variant= new Variants(vari[z]);
            variant.save();
          }
          res.send({"responseCode": 200, "responseMessage": "Data Stored Successfully" })
        }  
    })

}

// get all products
module.exports.getProductsList = function (req, res){
    ProductDb.find().exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Products lists are displayed successfully.","ProductsList": data})  
        }
    })
}

// get product list
module.exports.getProductDetail = function (req, res){
  id = req.params.id
  // console.log(id);
  ProductDb.aggregate([
    //---- find by the object id ----
    {  $match : { _id : mongoose.Types.ObjectId(id) } } ,
      
    //---- make the join for getting the attr names ----
    { $lookup:
      { 
        from:         "product_attributes",
        localField:   "_id",
        foreignField: "product_id",
        as:           "pr_attr"
      }
    },
   // ---- join on the product attributes ----
    { $lookup:
      { 
        from:         "product_attribute_values",
        localField:   "pr_attr._id",
        foreignField: "attribute_id",
        as:           "pr_attr_values"
      }
    },
    // ---- get the price ----
    { $lookup:
      { 
        from:         "product_variants",
        localField:   "_id",
        foreignField: "product_id",
        as:           "variants"
      }
    },

    { $lookup:
      { 
        from:         "product_variant_images",
        localField:   "variants._id",
        foreignField: "product_variant_id",
        as:           "variant_images"
      }
    },

  ]).exec(function(err, data){
    
    if(err){
      res.send({"responseCode":400,"responseMessage": err })
    } else {
      // var proAttr = new Array();
      // proAttr = data[0]['pr_attr'][0];
      
      /*var attr = new Array();
      proAttrLength = data[0]['pr_attr'].length;
      
      for(var atr=0; atr<proAttrLength; atr++){
        attr[atr] = data[0]['pr_attr'][atr];        
      }
      //console.log(attr)

      var attrValues = new Array();
      attrValuesLength = data[0]['pr_attr_values'].length;
      
      for(var x=0; x<attrValuesLength; x++) {
        attrValues[x] = data[0]['pr_attr_values'][x]
      }*/
      //console.log(attrValues)
      var arr=[];

      /*for(var y=0; y<attr.length; y++) {
        var a=0;
        for(var z=0; z<attrValues.length; z++){
          if(String(attrValues[z]['attribute_id']) == String(attr[y]['_id'])){
            //console.log(attr[y]['attribute_name']);
            
            arr[a] = (attrValues[z]);
            a++;
            //console.log(attrValues[z]['value']);
          } else {
            //console.log('srry')
          }
        }
        a=0;
        //console.log(arr);
        attr[y][attr[y]['attribute_name']]=[];
        for(a=0;a<arr.length;a++)
        {
          //console.log(arr[a]);
          attr[y][attr[y]['attribute_name']][a]=arr[a];
        }
        //attr[y][attr[y]['attribute_name']]=arr;
        arr.length = 0
      }*/
      //console.log(data.length);
      var sizegroup=[];
      var colorgroup=[];
      var colorcode=[];
      var slidegroup=[];
      var labelgroup=[];
      var s=0;
      var c=0;
      var sl=0;
      var l=0;
      for(a=0;a<data[0].variants.length;a++)
      {
        if(!isInArray(data[0].variants[a].size, sizegroup))
        {
          sizegroup[s]=data[0].variants[a].size;
          s++;
        }
        if(!isInArray(data[0].variants[a].slide, slidegroup))
        {
          slidegroup[sl]=data[0].variants[a].slide;
          sl++;
        }
        if(!isInArray(data[0].variants[a].color[0], colorgroup))
        {
          colorgroup[c]=data[0].variants[a].color[0];
          colorcode[c]=data[0].variants[a].color[1];
          c++;
        }
        if(!isInArray(data[0].variants[a].label, labelgroup))
        {
          labelgroup[l]=data[0].variants[a].label;
          l++;
        }
        //console.log(data[0].variants[a].color[0]);
      }

      console.log(sizegroup);
      console.log(colorgroup);
      console.log(colorcode);
      console.log(slidegroup);
      console.log(labelgroup);
      data[0]["sizegroup"]=sizegroup;
      data[0]["colorgroup"]=colorgroup;
      data[0]["colorcode"]=colorcode;
      data[0]["slidegroup"]=slidegroup;
      data[0]["labelgroup"]=labelgroup;
      res.send({"responseCode":200,"responseMessage":"Product displayed successfully.","Product": data})  
  }
  })
}
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
module.exports.getProductsHome = function (req, res){

    ProductDb.aggregate([  
    { $lookup:
      { 
        from:         "product_variants",
        localField:   "_id",
        foreignField: "product_id",
        as:           "variants"
      }
    },
    { $lookup: {
        from: 'product_variant_images',
        localField: 'variants._id',
        foreignField: 'product_variant_id',
        as: 'variant_image'
      }
    },
    { $sample: { size: 12 } }
    ]).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Products lists are displayed successfully.","ProductsList": data})  
        }
    })
}

module.exports.getProductsShop = function (req, res){
    pageno = req.params.pageno;
    skiprec = (parseInt(pageno)-1)*12;
    console.log(skiprec)
    ProductDb.aggregate([  
    { $lookup:
      { 
        from:         "product_variants",
        localField:   "_id",
        foreignField: "product_id",
        as:           "variants"
      }
    },
    { $lookup:
      { 
        from:         "product_variant_images",
        localField:   "variants._id",
        foreignField: "product_variant_id",
        as:           "variant_images"
      }
    },
    { $skip: skiprec  }
    ]).limit(12).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Products lists are displayed successfully.","ProductsList": data})  
        }
    })
}

module.exports.getProductsCount = function (req, res){
    ProductDb.aggregate([  
    { $count: "count"  }
    ]).limit(12).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
            res.send({"responseCode":200,"responseMessage":"Products lists are displayed successfully.",data})  
        }
    })
}


/*Get Variants data */
module.exports.getProductsVariantData = function (req, res)
{
    values = Object.values(req.body);
    keys = Object.keys(req.body);
    var obj = {};
    query='';
    _obj={};
    obj1 = {};
    objInner = {};
    for(a=0;a<keys.length;a++)
    {
      if(keys[a] == "product_id")
      {
        obj[keys[a]] = mongoose.Types.ObjectId(values[a]);
      }
      else if(keys[a] == "color")
      {
        obj[keys[a]] = values[a];
      }
      else
      {
        obj[keys[a]] = values[a];
      }
    }
    console.log(obj);
    Variants.aggregate([
    
    {  $match : obj },
    { $lookup:
      { 
        from:         "products",
        localField:   "product_id",
        foreignField: "_id",
        as:           "products"
      }
    },
    { $lookup:
      { 
        from:         "product_variant_images",
        localField:   "_id",
        foreignField: "product_variant_id",
        as:           "variant_images"
      }
    }
    ]).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{

          console.log(data.length);
      var sizegroup=[];
      var colorgroup=[];
      var colorcode=[];
      var slidegroup=[];
      var labelgroup=[];
      var s=0;
      var c=0;
      var sl=0;
      var l=0;
      for(a=0;a<data.length;a++)
      {
        if(!isInArray(data[a].size, sizegroup))
        {
          sizegroup[s]=data[a].size;
          s++;
        }
        if(!isInArray(data[a].slide, slidegroup))
        {
          slidegroup[sl]=data[a].slide;
          sl++;
        }
        if(!isInArray(data[a].color[0], colorgroup))
        {
          colorgroup[c]=data[a].color[0];
          colorcode[c]=data[a].color[1];
          c++;
        }
        if(!isInArray(data[a].label, labelgroup))
        {
          labelgroup[l]=data[a].label;
          l++;
        }
        //console.log(data[a].color[0]);
      }

      console.log(sizegroup);
      console.log(colorgroup);
      console.log(colorcode);
      console.log(slidegroup);
      console.log(labelgroup);
      var variantsdata={};
      variantsdata["sizegroup"]=sizegroup;
      variantsdata["colorgroup"]=colorgroup;
      variantsdata["colorcode"]=colorcode;
      variantsdata["slidegroup"]=slidegroup;
      variantsdata["labelgroup"]=labelgroup;
      console.log(variantsdata);
            res.send({"responseCode":200,"responseMessage":"Variants List Display Successfully.","data":data,"variantsdata":variantsdata})  
        }
    })
}


module.exports.searchproduct = function (req, res){
  keywrds = req.body.search;
  //console.log(keywrds);
  ProductDb.aggregate([
    {  $match : {"title":{$regex:".*"+keywrds+".*"}} },
    { $lookup:
      { 
        from:         "product_variants",
        localField:   "_id",
        foreignField: "product_id",
        as:           "variants"
      }
    },
    { $lookup:
      { 
        from:         "product_variant_images",
        localField:   "variants._id",
        foreignField: "product_variant_id",
        as:           "variant_images"
      }
    }]).exec(function(err, data){
  //ProductDb.find({"title":{$regex:".*"+keywrds+".*"}}).exec(function(err, data){
    if(err){
      res.send({"responseCode":400,"responseMessage": err })
    } else {
      
      res.send({"responseCode":200,"responseMessage":"Product displayed successfully.","Product": data})  
  }
  })
}

module.exports.getProductSimilar = function (req, res){
    //console.log(req.body.product_id.length);
    var sample=[];
    var samplex=[];
    var prodlist=[];
    var s=0;
    var t=0;
    var _loop_count=0;
    var _loop_countx=0;
    var _loop_countxx=0;
    //console.log("First time" + sample);
    for(a=0;a<req.body.product_id.length;a++)
    {
    CollectionsDb.aggregate([ 
    { $match:{ product_id:mongoose.Types.ObjectId(req.body.product_id[a])}}, 
    ]).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage": err })
        } else{
       
        //console.log('before loop')
        //console.log(data);
        for(b=0;b<data.length;b++)
        {
          if(!isInArray(data[b].collection_id.toString(), sample))
          {
            sample[s]=data[b].collection_id.toString();
            s++;
          }
        }
        if(_loop_count+1 == req.body.product_id.length){
          for(x=0;x<sample.length;x++)
          {
            CollectionsDb.aggregate([ 
              { $match:{ collection_id:mongoose.Types.ObjectId(sample[x])}}, 
              ]).exec(function(err,datax){
                if(err){
                    res.send({"responseCode":400,"responseMessage": err })
                } else{
                  for(b=0;b<datax.length;b++)
                  {
                    if(!isInArray(datax[b].product_id.toString(), samplex))
                    {
                      samplex[t]=datax[b].product_id.toString();
                      t++;
                    }
                  }
                  if(_loop_countx+1 == sample.length){

                    for(y=0;y<samplex.length;y++)
                    {
                      ProductDb.aggregate([ 
                        { $match:{ _id:mongoose.Types.ObjectId(samplex[y])}},
                        { $lookup:
                          { 
                            from:         "product_variants",
                            localField:   "_id",
                            foreignField: "product_id",
                            as:           "variants"
                          }
                        },
                        { $lookup:
                          { 
                            from:         "product_variant_images",
                            localField:   "variants._id",
                            foreignField: "product_variant_id",
                            as:           "variant_images"
                          }
                        },
                        { $sample: { size: 8 } }
                        ]).exec(function(err,dataxx){
                          if(err){
                              res.send({"responseCode":400,"responseMessage": err })
                          } else{
                            prodlist.push(dataxx);
                            if(_loop_countxx+1 == samplex.length){
                              res.send({"responseCode":200,"responseMessage":"Products lists are displayed successfully.","ProductsList": prodlist});
                            }
                            _loop_countxx++;
                            //console.log(datax);
                          }
                      });
                    }


                    //res.send({"responseCode":200,"responseMessage":"Products lists are displayed successfully.","ProductsList": samplex});
                  }
                  _loop_countx++;
                  //console.log(datax);
                }
            });
          }
          
        }

        _loop_count++;
      }

    })
   
    }   
}