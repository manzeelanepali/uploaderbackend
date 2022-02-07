const mongoose = require('mongoose');

//create a schema - likea blueprint
var ImageSchema = new mongoose.Schema({
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData:{
        type: String,
        required: true
    }
 });
 var Image= mongoose.model('Image', ImageSchema);

 module.exports = Image;
 