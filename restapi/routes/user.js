const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');

const userController = require('../controllers/user');
const isAuth = require('../middlewares/is_auth');

const router = express.Router();

router.get('/users',isAuth, userController.getUsers);

router.post('/auth',
    body('emailid')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 5, max: 50 })
        .isEmail()
        .withMessage('Please enter a valid Email ID'),
    body('password')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 8, max: 16 }),
    userController.validateUser);

router.put('/user',
    body('username')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 5, max: 50 }),
    body('emailid')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 5, max: 50 })
        .isEmail()
        .withMessage('Please enter a valid Email ID')
        .custom((value, { req }) => {
            return User.findOne({ emailid: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('User with Email ID already Exists');
                }
            });
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 8, max: 16 }),
    body('securityQuestion')
        .not()
        .isEmpty(),
    body('securityAnswer')
        .trim()
        .not()
        .isEmpty()
        .isLength({ max: 50 }),
    userController.createUser);


module.exports = router;