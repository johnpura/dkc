const mongoose = require('mongoose');
const crypto = require('crypto');

const MemberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 30,
        required: true
    },
    lastName: {
        type: String,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        maxlength: 320,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    passwordSalt: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
});

// hash and salt password for new member registration
MemberSchema.methods.encryptPassword = function(password) {
    this.passwordSalt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.passwordSalt, 10000, 512, 'sha512').toString('hex');
};

// validates member password when they log in
MemberSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

// pre-hook for `createdAt` and `updatedAt` fields
MemberSchema.pre('save', function(next) {
    if(!this.createdAt) {
        this.createdAt = new Date();
        return next();  // make sure the rest of this function doesn't run
    }
    this.updatedAt = new Date(); 
});

module.exports = mongoose.model('Member', MemberSchema);