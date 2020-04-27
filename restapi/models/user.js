const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    emailid:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    securityQuestion: {
        type: String,
        required: true
    },
    securityAnswer: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    roles:{
        type: Array,
        required: true
    }
},
{timestamps: true});

module.exports = mongoose.model('User', userSchema);