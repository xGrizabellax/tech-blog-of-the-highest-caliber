const router = require('express').Router();
const { Post, User } = require('../models');
const isAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })
        console.log(posts)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        })  
        
        const post = postData.get({plain: true})

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/profile', isAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true })

        res.render('profile', {
            ...user,
            logged_in: true
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login')
})

module.exports = router;