const Post = require('../models/Post');
const User = require('../models/User');

module.exports.postNewPost = (req, res, next) => {

    if (require('./sessionCheck')(req, res) === false) return res.redirect('/login');

    const title = req.body.title;
    const content = req.body.blogpost;
    const image = req.body.image;

    User.findOne({username: req.user.username}).then(user => {
        const post = new Post({
            author: {
                userid: user._id,
                name: user.username,
                accessLevel: user.accessLevel
            },
            post: {
                date: new Date(),
                title: title,
                content: content,
                image: image
            }
        });
        post.save()
        .then( () => {
            res.redirect("/blog");
        } );
    }).catch(e => console.error(e));    
}