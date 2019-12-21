let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
let Schema = mongoose.Schema;

var User = new Schema({
    name: {
        type: String,
        required : [ true, 'name is required'],
        lowercase : true
    },

    email: {
        type: String,
        required : [ true, 'email is required'],
        unique : true,
        lowercase : true
    },

    password: {
        type: String,
        required : [ true, 'password is required']
    },

    about: {
        type: String,
        default: '',
    },

    role: {
        type: String,
        default: 'USER',
        uppercase: true,                
    },

    confirm: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});

User.methods.userInfo = function() {
    
    return {
        id : this.id,
        email: this.email,
        name: this.name,
        about: this.about,
        role: this.role,
        confirm: this.confirm !== null,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

User.plugin(mongoosePaginate);

module.exports = mongoose.model('User', User);