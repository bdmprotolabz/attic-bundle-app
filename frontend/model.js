const mongoose = require('mongoose')
const { Schema } = mongoose

const MenuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    menu: {
        type: [MenuSchema]
    }
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
module.exports = {
    Restaurant
}