const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/postController');
const Post = require('../models/Post');
const postComment = require('../controllers/postComment');
require('../authentication/passport/local');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/about', (req, res, next) => {
    res.render('pages/about')
});

router.get('/post/:id', (req, res, next) => {
    Post.findOne({_id: req.params.id}).then(post => {
        res.render("pages/blog-single", {post: post});
    });
});

router.get('/blog', (req, res, next) => {
    Post.find({}).sort({'post.date': -1}).then(posts => {
        res.render("pages/blog", {posts: posts});
    });
});

router.get('/login', (req, res, next) => {
    res.render('pages/login');
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/new-post', (req, res, next) => {
    if (require('../controllers/sessionCheck')(req, res) === false) return res.redirect('/login');
    res.render("pages/newpost")
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true
    })(req, res, next);
});

router.post('/new-post', postController.postNewPost);
router.post('/post/:id', postComment.postComment);


module.exports = router;