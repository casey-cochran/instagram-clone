const express = require('express');
const asyncHandler = require('express-async-handler');

const {Follow, User} = require('../../db/models');
const {requireAuth} = require('../../utils/auth');


const router = express.Router();


//TODO add route to load all the people your following
router.get('/:userId', asyncHandler(async(req,res) => {
    const {userId} = req.params;
    const follows = await User.findByPk(userId, {include: [Follow]})
    console.log(follows, 'is there an id here')
    res.json(follows);
}))


router.post('/:userId', asyncHandler(async(req,res) => {
    const {currentUserId, userId} = req.body;
    const follow = {
        followerId: currentUserId,
        followedId: userId
    }
    const newFollow = await Follow.create(follow)
    res.json(newFollow)
}))


router.delete('/delete', asyncHandler(async(req,res) => {
    const {currentUserId, userId} = req.body
    const follow = await Follow.findOne({
        where: {
            followerId:currentUserId, followedId:userId
        }})
    follow.destroy();
    res.json({msg: 'success'})
}))


module.exports = router;
