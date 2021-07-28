var mongoose = require("mongoose");

var schema = mongoose.Schema;
var Bundle = new schema({
    // shopId:{
    //     type: String,
    //     required: true
    // },
    shopName:{
        type: String,
        required: true
    },
    bundleType:{
        type: String,
    },
    bundleName:{
        type: String,
        required: true
    },
    bundleTag: {
        type: String
    },
    products: {
        type: Array
    },
    pricingDiscountType: {
        type: String
    },
    pricingDiscountAmount: { 
        type: String
    },
    bundleDisplay: { 
        type: String
    },
    bundleDisplayProducts: { 
        type: Array
    },
    embededCode: { 
        type: String
    },
    embededCodeSTR: { 
        type: String
    },
    bundleMessage: { 
        type: String
    },
    bundleSuccessMessage: { 
        type: String
    },
    scheduleBundle: { 
        type: Boolean
    },
    activeDate: { 
        type: String
    },
    DeActiveDate: { 
        type: String
    },
    alignment: { 
        type: String
    },
    fontSize: { 
        type: String
    },
    fontColor: { 
        type: Array
    },
    imageBorderRadius: { 
        type: String
    },
    buttonColor: { 
        type: Array
    },
    buttonBgColor: { 
        type: Array
    },
    buttonFontSize: { 
        type: String
    },
    buttonBorderRadius: { 
        type: String
    },
    animationGlow: { 
        type: String
    },
    animationShake: { 
        type: String
    },
    animationButtonSize: { 
        type: String
    },
    FontFamily: { 
        type: String
    },
    FontWeight: { 
        type: String
    },
    FontType: { 
        type: String
    },
    imageShadowX: { 
        type: String
    },
    imageShadowY: { 
        type: String
    },
    imageShadowBlur: { 
        type: String
    },
    imageShadowSpread: { 
        type: String
    },
    imageShadowColor: { 
        type: Array
    },
    imageBorderRadius: { 
        type: String
    },
    imageBorderWidth: { 
        type: String
    },
    imageBorderColor: {
        type: Array
    },
    buttonBorderColor: { 
        type: Array
    },
    buttonBorderRadius: { 
        type: String
    },
    buttonBorderWidth: { 
        type: String
    },
    buttonShadowX: { 
        type: String
    },
    buttonShadowY: { 
        type: String
    },
    buttonShadowBlur: { 
        type: String
    },
    buttonShadowSpread: { 
        type: String
    },
    buttonShadowColor: { 
        type: Array
    },
    buttonAlignment: { 
        type: String
    },
    buttonFontSize: { 
        type: String
    },
    buttonFontType: { 
        type: String
    },
    ButtonFontWeight: { 
        type: String
    },
    isButtonItalic: { 
        type: Boolean
    },
    isButtonItalic: { 
        type: Boolean
    },
    status:{
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model("bundles",Bundle); 