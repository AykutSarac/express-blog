const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        userid: mongoose.Types.ObjectId,
        name: String,
        accessLevel: Number
    },
    post: {
        date: Date,
        title: String,
        content: String,
        image: String
    },
    comments: {
        type: Array,
        default: []
    }
}, {
    versionKey: false
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;