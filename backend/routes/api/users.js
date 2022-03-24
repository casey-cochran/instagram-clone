const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Post, Comment, Like, Dislike } = require("../../db/models");
const { response } = require("express");


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

router.get('/:userId/validate', asyncHandler(async(req,res) => {
  const {userId} = req.params;
  const user = await User.findByPk(userId)
  if(!user) res.json({msg: false})
  res.json(user)
}))


router.get("", asyncHandler(async(req,res) => {
  const posts = await Post.findAll({order:[['createdAt','DESC']],include:[{model:User}, {model:Like}, {model:Dislike}, {model:Comment, include: User}]})
  res.json(posts);
}));

router.get('/:userId', asyncHandler(async(req,res) => {
  const {userId} = req.params;
  const user = await User.findByPk(+userId)
  const userPosts = await Post.findAll({where:{userId}, include: [User]})
  // userPosts.dataValues['User'] = user
  res.json(userPosts)
}))

const validateProfile = [
  check('bio')
    .isLength({ max: 350 })
    .withMessage("Cannot be longer than 350 characters"),
  check('image')
    .if((value, { req }) => req.body.image)
    .isURL()
    .withMessage("Must be a valid URL"),
  handleValidationErrors
]

router.patch('/:userId/edit', validateProfile, requireAuth, asyncHandler(async(req,res) => {
  const {userId, bio, image} = req.body;
  const user = await User.findByPk(userId)
  const updateUser =  await user.update({bio: bio, image:image})
  res.json(updateUser)
}))


router.get('/posts/:postId', asyncHandler(async(req,res) => {
  const {postId} = req.params;
  const post = await Post.findByPk(postId, {include:[{model:Like}, {model:User}, {model:Dislike}, {model:Comment, include: User}]});
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


const validateEdit = [
  check('caption')
    .exists({checkFalsy: true})
    .trim()
    .isLength({min: 1, max: 350})
    .withMessage("Must provide a caption between 1 and 350 characters"),
  handleValidationErrors,
]

router.patch('/posts/:postId/edit', validateEdit, requireAuth, asyncHandler(async(req,res) => {
  const {postId} = req.params
  const {caption} = req.body
  const post = await Post.findByPk(postId,{include:[{model:User}, {model:Like}, {model:Dislike}, {model:Comment, include: User}]})
  const updated = await post.update({caption: caption})
  res.json({updated})
}))




router.post('/posts/:postId/comments/new', requireAuth, asyncHandler(async(req,res) => {
  const {postId, content, userId} = req.body;
  const comment = {content, postId, userId}
  const user = await User.findByPk(userId)
  const newComment = await Comment.create(comment)
  newComment.dataValues['User'] = user
  res.json({newComment})
}))

router.delete('/posts/:postId/comments/delete', requireAuth, asyncHandler(async(req,res) => {
  const {comment} = req.body;

  const com = await Comment.findByPk(comment.id);
  await com.destroy();
  res.json({msg:'success'});
}))

const validateEditcomm = [
  check('content')
    .exists()
    .trim()
    .isLength({min: 1, max: 250 })
    .withMessage('Content must be between 1 and 350 characters'),
  handleValidationErrors
];


router.patch('/posts/:postId/comments/:commentId/edit', validateEditcomm,  requireAuth, asyncHandler(async(req,res) => {
  const {comment} = req.body;
  const comm = await Comment.findByPk(comment.id)
  const updated = await comm.update({content: comment.content})
  res.json(updated)
}))





module.exports = router;
