const express = require('express');
const asyncHandler = require('express-async-handler');

const {Follow} = require('../../db/models');
const {requireAuth} = require('../../utils/auth');


const router = express.Router();


//TODO add route to load all of the people following me




module.exports = router;
