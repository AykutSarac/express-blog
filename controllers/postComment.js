const User = require('../models/User');
const Post = require('../models/Post');

module.exports.postComment = (req, res, next) => {
    const content = req.body.commentContent;

    if (!req.user) return res.sendStatus(401, '/'); 

    User.findOne({username: req.user.username}).then(user => {
        if (!user) return res.redirect('/');
        if (user) {
            Post.findOne({_id: req.params.id}).then(doc => {
                const comment = {
                    author: {
                        id: user._id,
                        name: user.username,
                        accessLevel: user.accessLevel
                    },
                    comment: {
                        content: content,
                        date: new Date()
                    }
                }
                doc.comments.push(comment);
                doc.save()
                .then( () => {
                    res.redirect('back');
                });
            });
        }
    }).catch(e => console.error(e));
}