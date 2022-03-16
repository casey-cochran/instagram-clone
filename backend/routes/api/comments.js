const express = require('express');
const {check} = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { Comment } = require('../../db/models');


const router = express.Router();


//turn this into the posts router?




module.exports = router;
