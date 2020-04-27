const { validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    const users = User.find().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });    
};

exports.validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const emailid = req.body.emailid;
    const password = req.body.password;

    let loadedUser;
    User.findOne({ emailid: emailid }).then(user => {
        if (!user) {
            const error = new Error('User with given Emailid not found.');
            error.statusCode = 403;
            throw error;
        }
        loadedUser = user;
        return bycrypt.compare(password, user.password);
    })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Password doesnot match.');
                error.statusCode = 403;
                throw error;
            }
            if (loadedUser.status != 'Active') {
                const error = new Error('User is not Active. Login denied.');
                error.statusCode = 403;
                throw error;
            }
            const token = jwt.sign({
                emailid: loadedUser.emailid,
                userId: loadedUser._id.toString()
            },
                'secret',
                { expiresIn: '1h' }
            );
            res.status(200).json(
                {
                    user: {                            
                            id: loadedUser._id.toString(),
                            username: loadedUser.username,
                            emailid: loadedUser.emailid,
                            password: '',
                            securityQuestion: loadedUser.securityQuestion,
                            securityAnswer: '',
                            roles: loadedUser.roles,
                            status: loadedUser.status,
                            token: token
                        },
                    expiresAt: moment(new Date()).add(1, 'hour').valueOf()
                }
            );
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.createUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const username = req.body.username;
    const emailid = req.body.emailid;
    const password = req.body.password;
    const securityQuestion = req.body.securityQuestion;
    const securityAnswer = req.body.securityAnswer;
    const roles = req.body.roles;
    const status = req.body.status;
    bycrypt.hash(password, 12)
        .then(passHashed => {
            const user = new User({
                username: username,
                emailid: emailid,
                password: passHashed,
                securityQuestion: securityQuestion,
                securityAnswer: securityAnswer,
                roles: roles,
                status: status
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({ message: 'User Created Successfully', userId: result._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}