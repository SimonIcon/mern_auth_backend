const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter username"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true
    },
    country: {
        type: String,
        required: [true, "country required"]
    },
    cellphone: {
        type: String,
        required: [true, "enter tellphone number"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password required"]
    },
    profile: {
        type: String
    }
})

const UserModel = mongoose.model('auth', userSchema)
module.exports = UserModel