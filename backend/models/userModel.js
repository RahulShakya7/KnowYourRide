const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        minlength: 3
    },
    uimage: {
        type: String,
        default: null,
    },
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['customer','admin','moderator'],
        default : 'customer'   
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
        returnedDocument.id = document._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__V
    }
})

module.exports = new mongoose.model('customer', userSchema)