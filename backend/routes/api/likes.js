const express = require('express');
const {check} = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { Post, Like } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


const router = express.Router();


router.post('/new', requireAuth, asyncHandler(async(req,res) => {
    const {userId, postId} = req.body;
    const newLike = {userId, postId};
    const like = await Like.create(newLike);
    res.json({msg: 'like created'})
}))

router.delete('/delete', requireAuth, asyncHandler(async(req,res) => {
    const {likeId} = req.body;
    const like = await Like.findByPK(likeId);
    await like.destroy();
    res.json({msg: 'like removed'});
}))




module.exports = router;
