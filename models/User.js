const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accessLevel: {
        type: Number,
        default: 0
    },
    joinDate: {
        type: Date,
        default: new Date()
    }
}, {
    versionKey: false
});

const User = mongoose.model("User", userSchema);

module.exports = User;
