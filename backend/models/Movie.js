const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    image:String
})

module.exports = mongoose.model("Movie",movieSchema)