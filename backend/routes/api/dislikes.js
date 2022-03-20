const express = require('express');
const {check} = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { Post, Dislike } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


const router = express.Router();


router.post('/new', requireAuth, asyncHandler(async(req,res) => {
    const {userId, postId} = req.body;
    const newDislike = {userId, postId};
    const dislike = await Dislike.create(newDislike);
    res.json({msg: 'like created'})
}))

router.delete('/delete', requireAuth, asyncHandler(async(req,res) => {
    const {dislikeId} = req.body;
    const dislike = await Like.findByPK(dislikeId);
    await dislike.destroy();
    res.json({msg: 'like removed'});
}))



module.exports = router;
