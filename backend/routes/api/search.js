const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {Op} = require('sequelize');
const {User} = require('../../db/models');



router.post('', asyncHandler(async(req,res) => {
    const {searchValue} = req.body;
    const value = await User.findAll({
        where: {
            username: {
                [Op.iLike]: '%' + searchValue + '%'
            }
        }
    })
    res.json(value);
}));















module.exports = router;
