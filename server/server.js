const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');


const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb://localhost/AppAttic';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


app.get('/user', (req,res) => {
    res.json({
        email: 'testuser@gmail.com',
        password: '12345',
        status: '1'
    })
})

app.use(express.static(__dirname + '/public'));

// var fs = require('fs');
// var path = require('path');

// // Buffer mydata
// var BUFFER = bufferFile('scripts/scripts.js');

// function bufferFile(relPath) {
// return fs.readFileSync(path.join(__dirname, relPath)); // zzzz....
// }

// fs.readFile( __dirname + '/scripts/scripts.js', function (err, data) {
//   if (err) {
//     throw err; 
//   }
//   console.log(data.toString());
// });

// ------------------------------------------------------------------------
// Operations start
// var collections = require('./operations/collections');

var user = require('./operations/users');
var bundle = require('./operations/bundles');
var settingsApp = require('./operations/settingsApp');

// below are the routes --------- 
// collections routes
// app.post('/addCollection', collections.addCollection);
// app.post('/getCollections',collections.getCollections);
// app.post('/getCollectionById/:id',collections.getCollectionById);
app.post('/auth-user', user.authUser);
app.post('/create-and-get-discount', user.createAndGetDiscount);
app.post('/check-discount', user.checkDiscount);
app.post('/get-product-by-product-id', user.GetProductByProductId);
app.post('/uninstall-user', user.uninstallUser);

app.post('/get-bundle-by-id/:id', bundle.getBundleById);
app.post('/get-bundles-by-shop/:shop', bundle.getBundlesByShop);

app.post('/save-step-one', bundle.saveStepOne);
app.post('/save-step-two', bundle.saveStepTwo);
app.post('/save-step-three', bundle.saveStepThree);
app.post('/update-step-one', bundle.updateStepOne);

app.post('/update-bundle-name', bundle.updateBundleNameById);
app.post('/update-bundle-tag', bundle.updateBundleTagById);

app.post('/saveMasterEditSettings', bundle.saveMasterEditSettings);
app.post('/doBundleAction', bundle.doBundleAction);
app.post('/get-bundles-by-filter', bundle.getBundlesByFilter);


app.post('/launchBundle', bundle.launchBundle); 

// ------------------------------------------------------------------------

app.post('/saveSettings', settingsApp.saveSettings);
app.post('/saveCartSettings', settingsApp.saveCartSettings);
app.post('/get-shop-settings/:shop', settingsApp.getSettingsByShopName);


// Front end Ajax Calls
app.post('/get-bundles-by-productid/', bundle.getBundlesByProductID);
app.post('/get-bundles-by-embededcode/', bundle.getBundlesByembededcode);


// append /attic-api for our http requests
app.use('/attic-api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));