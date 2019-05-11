const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        firstName : {
            type: String
        },
        surname: {
            type: String
        }
    },
    birthday : {
        type: Date
    },
    social: {
        vk: {
            id: Number,
        },
        ok : {
            id: Number,
        },
        fb: {
            id: Number
        },
        viber : {
            id: Number
        }
    }
});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;