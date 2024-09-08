const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    rentperday:{
        type:Number,
        require:true,
    }
});

module.exports = mongoose.model("Books",bookSchema)