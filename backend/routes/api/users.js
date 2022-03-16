const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Post } = require("../../db/models");


const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);


router.get("", asyncHandler(async(req,res) => {
  const posts = await Post.findAll()
  res.json(posts);
}));

router.get('/posts/:postId', asyncHandler(async(req,res) => {
  const {postId} = req.params;
  const post = await Post.findByPk(postId);
  res.json(post)
}))

const validatePost = [
  check("image")
    .exists({ checkFalsy: true })
    .withMessage("Must provide an image URL")
    .isURL()
    .withMessage("Must be a valid URL"),
  check('caption')
    .exists({checkFalsy: true})
    .withMessage("Must provide a caption"),
  handleValidationErrors,

]


router.post('/posts/new', validatePost, requireAuth, asyncHandler(async(req,res) => {
    const {userId, image, caption} = req.body
    console.log(userId, image ,caption, 'what is the post')
    const newPost = {userId, image, caption}
    const post = await Post.create(newPost);
    res.json(post);
}));


router.delete('/posts/:postId/delete', requireAuth, asyncHandler(async(req,res) => {
  const {postId} = req.params
  const post = await Post.findByPk(postId)
  await post.destroy();
  res.json({msg: 'delete successful'})
}))


module.exports = router;
