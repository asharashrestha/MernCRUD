const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    foodName:{
        type: String,
        require: true,
    },
    daysSinceIAte:{
        type: Number,
        requied: true,
    },

});

const FoodModel = mongoose.model("Food", FoodSchema);
module.exports = FoodModel;