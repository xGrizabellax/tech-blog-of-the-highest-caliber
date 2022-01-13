const router = require('express').Router();
const { Post } = require('../../models');
const isAuth = require('../../utils/auth');

router.post('/', isAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
    console.log(err)
    console.log(newPost)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })
  } catch (err) {
    res.status(500).json(postData)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
